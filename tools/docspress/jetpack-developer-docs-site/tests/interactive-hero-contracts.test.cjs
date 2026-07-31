/* global __dirname */

const assert = require( 'node:assert/strict' );
const { readFileSync } = require( 'node:fs' );
const { join } = require( 'node:path' );
const test = require( 'node:test' );

const blockDirectory = join( __dirname, '..', 'blocks', 'interactive-hero' );
const viewSource = readFileSync( join( blockDirectory, 'view.js' ), 'utf8' );
const styleSource = readFileSync( join( blockDirectory, 'style.css' ), 'utf8' );

test( 'the Three.js dependency is immutable and failure keeps the image fallback', () => {
	assert.match( viewSource, /three@0\.180\.0\/build\/three\.module\.min\.js/ );
	assert.match( viewSource, /visual\.dataset\.state = 'fallback'/ );
	assert.match( styleSource, /data-state="ready"[\s\S]*docspress-hero__image/ );
	assert.doesNotMatch(
		styleSource,
		/data-state="fallback"[\s\S]*docspress-hero__image\s*\{[^}]*display:\s*none/
	);
} );

test( 'light mode removes the grid and keeps construction lines visible', () => {
	assert.match( styleSource, /--jp-docs-hero-construction:\s*#7b8287/ );
	assert.match( styleSource, /--jp-docs-hero-point-fill:\s*#fff/ );
	assert.match( styleSource, /background-image:\s*none/ );
	assert.match(
		styleSource,
		/wp-block-docspress-hero\.jetpack-developer-docs-hero\s*\{[\s\S]*border:\s*0/
	);
	assert.match(
		styleSource,
		/jetpack-developer-docs-hero[\s\S]*\+\s*\.jetpack-developer-docs-product-carousel\s*\{[\s\S]*border-block-start:\s*0/
	);
	assert.match( styleSource, /html\[data-theme="dark"\]/ );
	assert.match( viewSource, /attributeFilter:\s*\[ 'data-theme' \]/ );
} );

test( 'dragged nodes deform connected strokes and spring home', () => {
	assert.match( viewSource, /const updateDynamicLines/ );
	assert.match( viewSource, /updateClosedStroke\( leftMarkStroke, leftMarkPoints \)/ );
	assert.match( viewSource, /updateClosedStroke\( rightMarkStroke, rightMarkPoints \)/ );
	assert.match( viewSource, /updateClosedStroke\( ringStroke, ringPoints \)/ );
	assert.match( viewSource, /velocity\.addScaledVector/ );
	assert.match( viewSource, /home[^\n]*sub\( point\.position \)/ );
	assert.match( viewSource, /window\.addEventListener\( 'pointerup', releasePointDrag \)/ );
} );

test( 'reduced motion and responsive rendering remain supported', () => {
	assert.match( viewSource, /prefers-reduced-motion: reduce/ );
	assert.match( viewSource, /ResizeObserver/ );
	assert.match(
		viewSource,
		/renderer\.setPixelRatio\( Math\.min\( window\.devicePixelRatio, 2 \) \)/
	);
	assert.match( styleSource, /@media\s*\(\s*max-width:\s*600px\s*\)/ );
} );
