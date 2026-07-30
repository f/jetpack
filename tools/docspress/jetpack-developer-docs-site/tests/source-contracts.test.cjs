const assert = require( 'node:assert/strict' );
const fs = require( 'node:fs' );
const path = require( 'node:path' );
const test = require( 'node:test' );

const pluginRoot = path.resolve( __dirname, '..' );
const viewSource = fs.readFileSync( path.join( pluginRoot, 'blocks/product-carousel/view.js' ), 'utf8' );
const styleSource = fs.readFileSync( path.join( pluginRoot, 'blocks/product-carousel/style.css' ), 'utf8' );
const editorSource = fs.readFileSync( path.join( pluginRoot, 'blocks/product-carousel/editor.js' ), 'utf8' );

test( 'front-end behavior includes every pause, input, and visibility contract', () => {
	for ( const contract of [
		'IntersectionObserver',
		'visibilitychange',
		'prefers-reduced-motion: reduce',
		'mouseenter',
		'focusin',
		'pointerdown',
		'pointermove',
		'pointerup',
		'wheel',
		'suppressClickUntil',
		'revealScrollDelta'
	] ) {
		assert.match( viewSource, new RegExp( contract.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' ) ) );
	}
} );

test( 'visual clones stay out of assistive technology and keyboard navigation', () => {
	assert.match( viewSource, /setAttribute\( 'aria-hidden', 'true' \)/ );
	assert.match( viewSource, /setAttribute\( 'tabindex', '-1' \)/ );
	assert.match( viewSource, /cloneNode\( true \)/ );
} );

test( 'CSS preserves a responsive, theme-aware, horizontal fallback', () => {
	for ( const contract of [
		'overflow-x: auto',
		'width: 100vw',
		'margin-inline: calc(50% - 50vw)',
		'overflow-x: clip',
		'touch-action: pan-x pan-y pinch-zoom',
		'var(--dp-paper',
		'var(--dp-ink',
		'var(--dp-line',
		'focus-visible',
		'@media (prefers-reduced-motion: reduce)',
		'@media (max-width: 600px)',
		'@media (forced-colors: active)'
	] ) {
		assert.ok( styleSource.includes( contract ), contract );
	}
} );

test( 'the editor owns the site-specific dynamic block and its product controls', () => {
	assert.match( editorSource, /registerBlockType\( 'jetpack-developer-docs\/product-carousel'/ );
	assert.match( editorSource, /InspectorControls/ );
	assert.match( editorSource, /Add product/ );
	assert.match( editorSource, /save: function \(\) \{\s*return null;/ );
} );
