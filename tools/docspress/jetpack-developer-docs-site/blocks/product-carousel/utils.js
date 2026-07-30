( function ( root, factory ) {
	'use strict';

	const api = factory();

	if ( typeof module === 'object' && module.exports ) {
		module.exports = api;
	}

	root.jetpackDeveloperDocsCarouselUtils = api;
}( typeof globalThis !== 'undefined' ? globalThis : window, function () {
	'use strict';

	const DRAG_THRESHOLD = 7;

	function normalizeLoopPosition( scrollLeft, loopWidth ) {
		const width = Number( loopWidth );

		if ( ! Number.isFinite( width ) || width <= 0 ) {
			return Math.max( 0, Number( scrollLeft ) || 0 );
		}

		const position = Number( scrollLeft ) || 0;
		return ( ( position % width ) + width ) % width;
	}

	function movedBeyondThreshold( startX, currentX, threshold = DRAG_THRESHOLD ) {
		return Math.abs( Number( currentX ) - Number( startX ) ) >= Number( threshold );
	}

	function revealScrollDelta( viewportStart, viewportEnd, itemStart, itemEnd, padding = 24 ) {
		if ( itemStart < viewportStart + padding ) {
			return itemStart - viewportStart - padding;
		}

		if ( itemEnd > viewportEnd - padding ) {
			return itemEnd - viewportEnd + padding;
		}

		return 0;
	}

	function shouldAutoplay( state ) {
		return Boolean(
			state &&
			state.visible &&
			! state.documentHidden &&
			! state.reducedMotion &&
			! state.hovered &&
			! state.focused &&
			! state.dragging &&
			! state.manuallyPaused
		);
	}

	return {
		DRAG_THRESHOLD,
		movedBeyondThreshold,
		normalizeLoopPosition,
		revealScrollDelta,
		shouldAutoplay
	};
} ) );
