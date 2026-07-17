import { __, sprintf } from '@wordpress/i18n';

export type PromoteLocalDeps = {
	/**
	 * Fires the promote mutation. Must be a promise that always settles
	 * (mutateAsync) — TanStack detaches the observer from an in-flight
	 * mutation when the same hook instance starts another one, silently
	 * dropping that call's mutate-level callbacks (see useDeleteVideo), so
	 * concurrent promotes can only be sequenced reliably via promises.
	 */
	promote: ( id: string ) => Promise< unknown >;
	createSuccessNotice: ( content: string ) => void;
	createErrorNotice: ( content: string ) => void;
	/** Receives a fresh snapshot of the in-flight id set whenever it changes. */
	onPromotingChange: ( ids: Set< string > ) => void;
};

/**
 * Build the library's promote-local handler. The factory owns the in-flight
 * id set (the snapshots pushed through `onPromotingChange` drive the row
 * overlays) so a re-entrant call for an id already being promoted is a
 * no-op — the promote endpoints aren't idempotent under concurrency, and
 * without the guard a second same-id promote's `.finally()` would also tear
 * the shared overlay down while the first is still in flight.
 *
 * Extracted from the library stage (mirroring `upload-drop.ts`) so the
 * notice/overlay sequencing is unit-testable without rendering the stage.
 *
 * @param deps - The mutation trigger, notice creators, and overlay sink.
 * @return The `promoteLocal( id )` handler handed to actions and thumbnails.
 */
export function createPromoteLocal( deps: PromoteLocalDeps ): ( id: string ) => void {
	const inFlight = new Set< string >();
	const publish = () => deps.onPromotingChange( new Set( inFlight ) );

	return ( id: string ) => {
		if ( inFlight.has( id ) ) {
			return;
		}
		inFlight.add( id );
		publish();

		deps
			.promote( id )
			.then( () => {
				deps.createSuccessNotice( __( 'Video uploaded to VideoPress.', 'jetpack-videopress-pkg' ) );
			} )
			.catch( ( error: Error ) => {
				const reason = error?.message?.trim();
				deps.createErrorNotice(
					reason
						? sprintf(
								/* translators: %s: reason returned by the upload endpoint, e.g. "403: Invalid Mime". */
								__( 'Failed to upload video to VideoPress: %s', 'jetpack-videopress-pkg' ),
								reason
						  )
						: __( 'Failed to upload video to VideoPress.', 'jetpack-videopress-pkg' )
				);
			} )
			.finally( () => {
				inFlight.delete( id );
				publish();
			} );
	};
}
