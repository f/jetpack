#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

/* eslint-disable jsdoc/require-jsdoc, no-console, n/no-process-exit */

const scriptDirectory = path.dirname( fileURLToPath( import.meta.url ) );
const repositoryRoot = path.resolve( scriptDirectory, '..', '..' );
const docsRoot = path.join( repositoryRoot, 'docs' );
const pluginRoot = path.join( scriptDirectory, 'jetpack-developer-docs-site' );
const errors = [];

function readJson( filename ) {
	return JSON.parse( fs.readFileSync( filename, 'utf8' ) );
}

function check( condition, message ) {
	if ( ! condition ) {
		errors.push( message );
	}
}

function relative( filename ) {
	return path.relative( repositoryRoot, filename );
}

function parseFrontMatter( content, filename ) {
	const match = content.match( /^---\r?\n([\s\S]*?)\r?\n---\r?\n/ );
	check( Boolean( match ), `${ relative( filename ) }: missing front matter` );

	if ( ! match ) {
		return {};
	}

	const values = {};
	for ( const line of match[ 1 ].split( /\r?\n/ ) ) {
		const separator = line.indexOf( ':' );
		if ( separator === -1 ) {
			continue;
		}
		const key = line.slice( 0, separator ).trim();
		const rawValue = line.slice( separator + 1 ).trim();
		if ( rawValue === 'true' || rawValue === 'false' ) {
			values[ key ] = rawValue === 'true';
		} else if ( /^-?\d+$/.test( rawValue ) ) {
			values[ key ] = Number( rawValue );
		} else {
			values[ key ] = rawValue.replace( /^["']|["']$/g, '' );
		}
	}
	return values;
}

function headingAnchors( content ) {
	const anchors = new Set();
	for ( const match of content.matchAll( /^#{1,6}\s+(.+)$/gm ) ) {
		const anchor = match[ 1 ]
			.toLowerCase()
			.replace( /[`*_~[\]()]/g, '' )
			.replace( /[^\p{Letter}\p{Number}\s-]/gu, '' )
			.trim()
			.replace( /\s+/g, '-' );
		anchors.add( anchor );
	}
	for ( const match of content.matchAll( /\b(?:id|anchor)=?["':\s]+([a-zA-Z0-9_-]+)/g ) ) {
		anchors.add( match[ 1 ] );
	}
	return anchors;
}

function splitTarget( target ) {
	const hashIndex = target.indexOf( '#' );
	return {
		path: ( hashIndex === -1 ? target : target.slice( 0, hashIndex ) ).split( '?' )[ 0 ],
		anchor: hashIndex === -1 ? '' : target.slice( hashIndex + 1 ),
	};
}

function resolveMarkdownTarget( sourceFile, targetPath ) {
	const decoded = decodeURIComponent( targetPath );
	const resolved = path.resolve( path.dirname( sourceFile ), decoded );
	const candidates = [
		resolved,
		`${ resolved }.md`,
		path.join( resolved, 'index.md' ),
		path.join( resolved, 'README.md' ),
	];
	return candidates.find(
		candidate => fs.existsSync( candidate ) && fs.statSync( candidate ).isFile()
	);
}

const manifest = readJson( path.join( docsRoot, 'manifest.json' ) );
const baseline = readJson( path.join( scriptDirectory, 'baselines', 'developer-docs-pilot.json' ) );
const catalog = readJson( path.join( docsRoot, 'products', 'catalog.json' ) );
const pages = manifest.pages || [];
const pagesById = new Map();
const routeToPage = new Map();

for ( const page of pages ) {
	check( page && typeof page.id === 'string' && page.id, 'manifest: every page needs an ID' );
	check( ! pagesById.has( page.id ), `manifest: duplicate ID ${ page.id }` );
	pagesById.set( page.id, page );
	check(
		typeof page.markdown_source === 'string' &&
			fs.existsSync( path.join( docsRoot, page.markdown_source ) ),
		`manifest: source does not exist for ${ page.id }: ${ page.markdown_source }`
	);
}

check(
	pages.filter( page => page.id === 'root' ).length === 1,
	'manifest: exactly one root page is required'
);

function routeForPage( page, stack = new Set() ) {
	if ( page.id === 'root' ) {
		return '/developer-docs/';
	}
	if ( stack.has( page.id ) ) {
		errors.push( `manifest: parent cycle at ${ page.id }` );
		return '/developer-docs/__cycle__/';
	}
	const parent = pagesById.get( page.parent );
	if ( ! parent ) {
		errors.push( `manifest: missing parent ${ page.parent } for ${ page.id }` );
		return `/developer-docs/__missing__/${ page.slug }/`;
	}
	const nextStack = new Set( stack );
	nextStack.add( page.id );
	return `${ routeForPage( parent, nextStack ) }${ page.slug }/`;
}

for ( const page of pages ) {
	const route = routeForPage( page );
	check( ! routeToPage.has( route ), `manifest: duplicate route ${ route }` );
	routeToPage.set( route, page );
}

for ( const page of pages ) {
	const siblings = pages.filter(
		candidate => candidate.parent === page.parent && candidate.id !== page.id
	);
	check(
		! siblings.some( candidate => candidate.slug === page.slug ),
		`manifest: duplicate sibling slug ${ page.slug }`
	);
}

check(
	baseline.page_count === baseline.pages.length,
	'baseline: page count does not match recorded pages'
);
check(
	baseline.dry_run.desired_pages === baseline.page_count,
	'baseline: dry-run page count does not match manifest count'
);
check( baseline.dry_run.reported_conflicts === 0, 'baseline: conflicts must be zero' );
check( baseline.dry_run.reported_deletions === 0, 'baseline: deletions must be zero' );
for ( const baselinePage of baseline.pages ) {
	const currentPage = pagesById.get( baselinePage.id );
	check( Boolean( currentPage ), `baseline: removed manifest ID ${ baselinePage.id }` );
	if ( currentPage ) {
		check(
			routeForPage( currentPage ) === baselinePage.route,
			`baseline: route changed for ${ baselinePage.id } (${ baselinePage.route } -> ${ routeForPage(
				currentPage
			) })`
		);
	}
}

const expectedProductOrder = [
	'jetpack',
	'akismet',
	'backup',
	'boost',
	'crm',
	'forms',
	'protect',
	'scan',
	'search',
	'social',
	'stats',
	'videopress',
	'ai',
];
const allowedGroups = new Set( [ 'platform', 'growth', 'performance', 'security' ] );
const allowedOwnership = new Set( [ 'jetpack-monorepo', 'external' ] );
const products = catalog.products || [];
const productIds = new Set();
const productRoutes = new Set();
const sidebarPositions = new Set();

check( catalog.version === 1, 'catalog: version must be 1' );
check( products.length === 13, `catalog: expected 13 products, found ${ products.length }` );
check(
	JSON.stringify( products.map( product => product.id ) ) ===
		JSON.stringify( expectedProductOrder ),
	'catalog: product sequence does not match the approved carousel order'
);

for ( const product of products ) {
	check( ! productIds.has( product.id ), `catalog: duplicate product ID ${ product.id }` );
	productIds.add( product.id );
	check(
		! productRoutes.has( product.route ),
		`catalog: duplicate product route ${ product.route }`
	);
	productRoutes.add( product.route );
	check( allowedGroups.has( product.group ), `catalog: invalid group for ${ product.id }` );
	check(
		allowedOwnership.has( product.ownership ),
		`catalog: invalid ownership for ${ product.id }`
	);
	check(
		product.route === `/developer-docs/products/${ product.id }/`,
		`catalog: route must use the concise product ID for ${ product.id }`
	);
	check(
		Array.isArray( product.canonical_sources ) && product.canonical_sources.length > 0,
		`catalog: canonical sources are required for ${ product.id }`
	);
	for ( const source of product.canonical_sources || [] ) {
		check(
			typeof source.label === 'string' && source.label,
			`catalog: source label missing for ${ product.id }`
		);
		check(
			[ 'support', 'source', 'developer' ].includes( source.type ),
			`catalog: invalid source type for ${ product.id }`
		);
		check(
			/^https:\/\//.test( source.url ),
			`catalog: canonical source must use HTTPS for ${ product.id }`
		);
	}
	check(
		Array.isArray( product.repository_paths ),
		`catalog: repository paths must be an array for ${ product.id }`
	);
	if ( product.ownership === 'external' ) {
		check(
			product.repository_paths.length === 0,
			`catalog: externally owned ${ product.id } must not claim local paths`
		);
	} else {
		check(
			product.repository_paths.length > 0,
			`catalog: local paths are required for ${ product.id }`
		);
		for ( const repositoryPath of product.repository_paths ) {
			check(
				fs.existsSync( path.join( repositoryRoot, repositoryPath ) ),
				`catalog: repository path does not exist for ${ product.id }: ${ repositoryPath }`
			);
		}
	}

	const manifestPage = pagesById.get( `products-${ product.id }` );
	check( Boolean( manifestPage ), `manifest: product page missing for ${ product.id }` );
	if ( manifestPage ) {
		check(
			manifestPage.parent === 'products',
			`manifest: ${ product.id } must be a direct child of Products`
		);
		check( manifestPage.slug === product.id, `manifest: slug mismatch for ${ product.id }` );
		check( manifestPage.title === product.label, `manifest: title mismatch for ${ product.id }` );
		check(
			routeForPage( manifestPage ) === product.route,
			`manifest: route mismatch for ${ product.id }`
		);
	}

	const hubFile = path.join( docsRoot, 'products', product.id, 'index.md' );
	check( fs.existsSync( hubFile ), `product hub missing: ${ relative( hubFile ) }` );
	if ( fs.existsSync( hubFile ) ) {
		const content = fs.readFileSync( hubFile, 'utf8' );
		const frontMatter = parseFrontMatter( content, hubFile );
		check(
			frontMatter.product === product.id,
			`${ relative( hubFile ) }: product front matter mismatch`
		);
		check(
			frontMatter.product_group === product.group,
			`${ relative( hubFile ) }: product group mismatch`
		);
		check(
			frontMatter.audience === 'everyone',
			`${ relative( hubFile ) }: audience must be everyone`
		);
		check(
			frontMatter.document_type === 'overview',
			`${ relative( hubFile ) }: document_type must be overview`
		);
		check(
			Number.isInteger( frontMatter.sidebar_position ),
			`${ relative( hubFile ) }: sidebar_position must be an integer`
		);
		check(
			! sidebarPositions.has( frontMatter.sidebar_position ),
			`${ relative( hubFile ) }: duplicate sidebar_position`
		);
		sidebarPositions.add( frontMatter.sidebar_position );
		check(
			frontMatter.sidebar_collapsed === true,
			`${ relative( hubFile ) }: sidebar_collapsed must be true`
		);
		for ( const heading of [
			'Use and administer',
			'Build and integrate',
			'Contribute and test',
			'Reference',
			'Troubleshoot and support',
		] ) {
			check(
				content.includes( `## ${ heading }` ),
				`${ relative( hubFile ) }: missing "${ heading }"`
			);
		}
	}
}

const productsManifestPage = pagesById.get( 'products' );
check( Boolean( productsManifestPage ), 'manifest: Products root is missing' );
if ( productsManifestPage ) {
	check( productsManifestPage.parent === 'root', 'manifest: Products must be a top-level branch' );
	check(
		productsManifestPage.slug === 'products',
		'manifest: Products must use the products slug'
	);
	check(
		productsManifestPage.title === 'Products',
		'manifest: Products must use the Products title'
	);
}

const productsLandingFile = path.join( docsRoot, 'products', 'index.md' );
const productsLanding = fs.readFileSync( productsLandingFile, 'utf8' );
const productsFrontMatter = parseFrontMatter( productsLanding, productsLandingFile );
check( productsFrontMatter.title === 'Products', 'products landing: title must be Products' );
check(
	productsFrontMatter.sidebar_position === 25,
	'products landing: sidebar_position must be 25'
);
check(
	productsFrontMatter.sidebar_collapsed === true,
	'products landing: sidebar_collapsed must be true'
);
for ( const groupHeading of [
	'Jetpack platform',
	'Growth',
	'Performance and media',
	'Security',
] ) {
	check(
		productsLanding.includes( `## ${ groupHeading }` ),
		`products landing: missing ${ groupHeading } group`
	);
}
for ( const product of products ) {
	check(
		productsLanding.includes( product.route ),
		`products landing: missing route for ${ product.label }`
	);
}

const homepageFile = path.join( docsRoot, 'index.md' );
const homepage = fs.readFileSync( homepageFile, 'utf8' );
const carouselPattern = /<!-- wp:jetpack-developer-docs\/product-carousel (\{.*\}) \/-->/g;
const carouselMatches = [ ...homepage.matchAll( carouselPattern ) ];
check(
	carouselMatches.length === 1,
	`homepage: expected one product carousel block, found ${ carouselMatches.length }`
);
if ( carouselMatches.length === 1 ) {
	let attributes = {};
	try {
		attributes = JSON.parse( carouselMatches[ 0 ][ 1 ] );
	} catch ( error ) {
		errors.push( `homepage: invalid carousel JSON (${ error.message })` );
	}
	const expectedItems = products.map( product => ( { label: product.label, url: product.route } ) );
	check( attributes.align === 'full', 'homepage: carousel must use alignfull' );
	check(
		attributes.ariaLabel === 'Browse product documentation',
		'homepage: carousel section label is incorrect'
	);
	check( attributes.pauseOnHover === true, 'homepage: carousel must pause on hover' );
	check(
		JSON.stringify( attributes.items ) === JSON.stringify( expectedItems ),
		'homepage: carousel labels, routes, or order differ from the product catalog'
	);
	const carouselIndex = carouselMatches[ 0 ].index;
	const startIndex = homepage.indexOf( '<!-- wp:group {"align":"wide","anchor":"start"' );
	check(
		carouselIndex > homepage.indexOf( 'className":"jp-home-hero"' ),
		'homepage: carousel must follow the hero'
	);
	check( carouselIndex < startIndex, 'homepage: carousel must precede the #start section' );
	check(
		homepage.slice( 0, carouselIndex ).trimEnd().endsWith( '<!-- /wp:group -->' ),
		'homepage: carousel must be immediately adjacent to the complete hero group'
	);
	check(
		! homepage
			.slice( carouselIndex + carouselMatches[ 0 ][ 0 ].length, startIndex )
			.includes( '<!-- wp:' ),
		'homepage: another block appears between the carousel and #start'
	);
}

const pluginPhpFile = path.join( pluginRoot, 'jetpack-developer-docs-site.php' );
const pluginPhp = fs.readFileSync( pluginPhpFile, 'utf8' );
const defaultsStart = pluginPhp.indexOf(
	'function jetpack_developer_docs_site_product_carousel_defaults'
);
const defaultsEnd = pluginPhp.indexOf(
	'function jetpack_developer_docs_site_normalize_carousel_items'
);
const defaultItems = [
	...pluginPhp
		.slice( defaultsStart, defaultsEnd )
		.matchAll( /array\(\s*'label'\s*=>\s*'([^']+)',\s*'url'\s*=>\s*'([^']+)'/g ),
].map( match => ( { label: match[ 1 ], url: match[ 2 ] } ) );
check(
	JSON.stringify( defaultItems ) ===
		JSON.stringify( products.map( product => ( { label: product.label, url: product.route } ) ) ),
	'plugin: default carousel items differ from the product catalog'
);

const linkedFiles = [
	homepageFile,
	productsLandingFile,
	...products.map( product => path.join( docsRoot, 'products', product.id, 'index.md' ) ),
	path.join( docsRoot, 'site-owners', 'choose-products.md' ),
	path.join( docsRoot, 'developers', 'choose-an-integration.md' ),
	path.join( docsRoot, 'developers', 'index.md' ),
	path.join( docsRoot, 'contributors', 'testing', 'index.md' ),
	path.join( docsRoot, 'contributors', 'testing', 'test-suites', 'blocks', 'index.md' ),
	path.join( docsRoot, 'contributors', 'testing', 'test-suites', 'modules', 'index.md' ),
	path.join( docsRoot, 'contributors', 'testing', 'test-suites', 'packages', 'index.md' ),
	path.join( docsRoot, 'reference', 'documentation-map.md' ),
	path.join( docsRoot, 'reference', 'glossary.md' ),
	path.join( docsRoot, 'reference', 'index.md' ),
	path.join( docsRoot, 'reference', 'products-and-features.md' ),
];
const routeTargets = new Set( [ ...routeToPage.keys(), '/llms.txt' ] );
const routeSourceFiles = new Map(
	pages.map( page => [ routeForPage( page ), path.join( docsRoot, page.markdown_source ) ] )
);

function validateTarget( sourceFile, target ) {
	if ( ! target || /^(?:https?:|mailto:|tel:|javascript:)/i.test( target ) ) {
		return;
	}
	if ( target.startsWith( '#' ) ) {
		const anchor = target.slice( 1 );
		check(
			headingAnchors( fs.readFileSync( sourceFile, 'utf8' ) ).has( anchor ),
			`${ relative( sourceFile ) }: missing local anchor #${ anchor }`
		);
		return;
	}
	const parts = splitTarget( target );
	if ( parts.path.startsWith( '/developer-docs/' ) ) {
		const normalizedRoute = parts.path.endsWith( '/' ) ? parts.path : `${ parts.path }/`;
		check(
			routeTargets.has( normalizedRoute ),
			`${ relative( sourceFile ) }: unknown internal route ${ parts.path }`
		);
		if ( parts.anchor && routeSourceFiles.has( normalizedRoute ) ) {
			check(
				headingAnchors( fs.readFileSync( routeSourceFiles.get( normalizedRoute ), 'utf8' ) ).has(
					parts.anchor
				),
				`${ relative( sourceFile ) }: missing anchor #${ parts.anchor } on ${ normalizedRoute }`
			);
		}
		return;
	}
	if ( parts.path.startsWith( '/' ) ) {
		check(
			routeTargets.has( parts.path ),
			`${ relative( sourceFile ) }: unknown root-relative target ${ parts.path }`
		);
		return;
	}
	const targetFile = resolveMarkdownTarget( sourceFile, parts.path );
	check(
		Boolean( targetFile ),
		`${ relative( sourceFile ) }: missing Markdown target ${ parts.path }`
	);
	if ( targetFile && parts.anchor ) {
		check(
			headingAnchors( fs.readFileSync( targetFile, 'utf8' ) ).has( parts.anchor ),
			`${ relative( sourceFile ) }: missing anchor #${ parts.anchor } in ${ relative(
				targetFile
			) }`
		);
	}
}

for ( const filename of linkedFiles ) {
	const content = fs.readFileSync( filename, 'utf8' );
	const targets = new Set();
	for ( const match of content.matchAll( /\[[^\]]*]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g ) ) {
		targets.add( match[ 1 ] );
	}
	for ( const match of content.matchAll( /"(?:url|href)":"([^"]+)"/g ) ) {
		targets.add( match[ 1 ] );
	}
	for ( const match of content.matchAll( /\bhref="([^"]+)"/g ) ) {
		targets.add( match[ 1 ] );
	}
	for ( const target of targets ) {
		validateTarget( filename, target );
	}

	const privateWordPressUrls = [
		...content.matchAll( /https?:\/\/([a-z0-9.-]+\.wordpress\.com)(?:\/|["')\s])/gi ),
	];
	for ( const match of privateWordPressUrls ) {
		const publicHosts = new Set( [ 'developer.wordpress.com', 'translate.wordpress.com' ] );
		check(
			publicHosts.has( match[ 1 ].toLowerCase() ),
			`${ relative( filename ) }: private WordPress.com URL is not allowed`
		);
	}
	check(
		! /(?:api[_-]?key|password|secret|token)\s*[:=]\s*["'][A-Za-z0-9_-]{8,}/i.test( content ),
		`${ relative( filename ) }: possible credential assignment`
	);
	check(
		! /(?:[$€£]\s?\d+(?:[.,]\d+)?|\b\d+(?:[.,]\d+)?\s*(?:USD|EUR|GBP)\b)/i.test( content ),
		`${ relative( filename ) }: copied pricing claim detected`
	);
}

if ( errors.length > 0 ) {
	console.error( `Developer docs validation failed with ${ errors.length } error(s):` );
	for ( const error of errors ) {
		console.error( `- ${ error }` );
	}
	process.exit( 1 );
}

console.log(
	`Developer docs validation passed: ${ pages.length } manifest pages, ` +
		`${ baseline.pages.length } preserved baseline routes, ${ products.length } product hubs, and one catalog-backed carousel.`
);
