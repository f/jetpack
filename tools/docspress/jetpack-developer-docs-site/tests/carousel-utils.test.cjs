const assert = require( 'node:assert/strict' );
const test = require( 'node:test' );
const utils = require( '../blocks/product-carousel/utils.js' );

test( 'normalizes a continuously scrolling loop in either direction', () => {
	assert.equal( utils.normalizeLoopPosition( 120, 100 ), 20 );
	assert.equal( utils.normalizeLoopPosition( -20, 100 ), 80 );
	assert.equal( utils.normalizeLoopPosition( 100, 100 ), 0 );
	assert.equal( utils.normalizeLoopPosition( 45, 0 ), 45 );
} );

test( 'uses a movement threshold to distinguish a click from a drag', () => {
	assert.equal( utils.DRAG_THRESHOLD, 7 );
	assert.equal( utils.movedBeyondThreshold( 100, 106 ), false );
	assert.equal( utils.movedBeyondThreshold( 100, 107 ), true );
	assert.equal( utils.movedBeyondThreshold( 100, 92 ), true );
} );

test( 'reveals a keyboard-focused product only when it is clipped', () => {
	assert.equal( utils.revealScrollDelta( 100, 500, 130, 300 ), 0 );
	assert.equal( utils.revealScrollDelta( 100, 500, 80, 200 ), -44 );
	assert.equal( utils.revealScrollDelta( 100, 500, 400, 540 ), 64 );
} );

test( 'autoplay runs only while every motion precondition is satisfied', () => {
	const activeState = {
		visible: true,
		documentHidden: false,
		reducedMotion: false,
		hovered: false,
		focused: false,
		dragging: false,
		manuallyPaused: false
	};

	assert.equal( utils.shouldAutoplay( activeState ), true );
	for ( const pausedState of [
		'visible',
		'documentHidden',
		'reducedMotion',
		'hovered',
		'focused',
		'dragging',
		'manuallyPaused'
	] ) {
		const state = { ...activeState };
		state[ pausedState ] = pausedState === 'visible' ? false : true;
		assert.equal( utils.shouldAutoplay( state ), false, pausedState );
	}
} );
