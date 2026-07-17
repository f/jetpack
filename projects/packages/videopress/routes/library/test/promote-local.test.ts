import { createPromoteLocal, type PromoteLocalDeps } from '../promote-local';

jest.mock( '@wordpress/i18n', () => ( {
	__: ( text: string ) => text,
	sprintf: ( format: string, value: string ) => format.replace( '%s', value ),
} ) );

type Deferred = {
	promise: Promise< unknown >;
	resolve: ( value?: unknown ) => void;
	reject: ( reason?: unknown ) => void;
};

const makeDeferred = (): Deferred => {
	let resolve!: Deferred[ 'resolve' ];
	let reject!: Deferred[ 'reject' ];
	const promise = new Promise( ( res, rej ) => {
		resolve = res;
		reject = rej;
	} );
	return { promise, resolve, reject };
};

const flush = () => new Promise( resolve => setTimeout( resolve, 0 ) );

const makeDeps = ( promote: PromoteLocalDeps[ 'promote' ] ) => {
	const snapshots: string[][] = [];
	const deps = {
		promote: jest.fn( promote ),
		createSuccessNotice: jest.fn(),
		createErrorNotice: jest.fn(),
		onPromotingChange: jest.fn( ( ids: Set< string > ) => {
			snapshots.push( [ ...ids ].sort() );
		} ),
	};
	return { deps, snapshots };
};

describe( 'createPromoteLocal', () => {
	it( 'promotes, notices success, and tears the overlay down', async () => {
		const { deps, snapshots } = makeDeps( () => Promise.resolve() );
		const promoteLocal = createPromoteLocal( deps );

		promoteLocal( '9' );
		await flush();

		expect( deps.promote ).toHaveBeenCalledWith( '9' );
		expect( deps.createSuccessNotice ).toHaveBeenCalledWith( 'Video uploaded to VideoPress.' );
		expect( deps.createErrorNotice ).not.toHaveBeenCalled();
		expect( snapshots ).toEqual( [ [ '9' ], [] ] );
	} );

	it( 'formats the error notice with the rejection message', async () => {
		const { deps } = makeDeps( () => Promise.reject( new Error( ' 403: Invalid Mime ' ) ) );
		createPromoteLocal( deps )( '9' );
		await flush();

		expect( deps.createErrorNotice ).toHaveBeenCalledWith(
			'Failed to upload video to VideoPress: 403: Invalid Mime'
		);
	} );

	it( 'falls back to the generic error notice when the rejection has no message', async () => {
		const { deps, snapshots } = makeDeps( () => Promise.reject( new Error( '' ) ) );
		createPromoteLocal( deps )( '9' );
		await flush();

		expect( deps.createErrorNotice ).toHaveBeenCalledWith(
			'Failed to upload video to VideoPress.'
		);
		// The overlay still tears down on failure.
		expect( snapshots ).toEqual( [ [ '9' ], [] ] );
	} );

	it( 'ignores a re-entrant call for an id already in flight', async () => {
		const gate = makeDeferred();
		const { deps, snapshots } = makeDeps( () => gate.promise );
		const promoteLocal = createPromoteLocal( deps );

		promoteLocal( '9' );
		promoteLocal( '9' ); // double-click while in flight — must be a no-op
		gate.resolve();
		await flush();

		expect( deps.promote ).toHaveBeenCalledTimes( 1 );
		expect( deps.createSuccessNotice ).toHaveBeenCalledTimes( 1 );
		// One add, one teardown — the second click never touched the overlay.
		expect( snapshots ).toEqual( [ [ '9' ], [] ] );

		// After settling, the same id may be promoted again.
		promoteLocal( '9' );
		expect( deps.promote ).toHaveBeenCalledTimes( 2 );
	} );

	it( 'keeps concurrent promotes of different ids independent', async () => {
		const gates: Record< string, Deferred > = { a: makeDeferred(), b: makeDeferred() };
		const { deps, snapshots } = makeDeps( ( id: string ) => gates[ id ].promise );
		const promoteLocal = createPromoteLocal( deps );

		promoteLocal( 'a' );
		promoteLocal( 'b' );
		gates.a.reject( new Error( 'nope' ) );
		await flush();

		// a settled (error notice), b still overlaid.
		expect( deps.createErrorNotice ).toHaveBeenCalledTimes( 1 );
		expect( snapshots ).toEqual( [ [ 'a' ], [ 'a', 'b' ], [ 'b' ] ] );

		gates.b.resolve();
		await flush();

		expect( deps.createSuccessNotice ).toHaveBeenCalledTimes( 1 );
		expect( snapshots[ snapshots.length - 1 ] ).toEqual( [] );
	} );
} );
