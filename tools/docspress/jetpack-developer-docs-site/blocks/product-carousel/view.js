( function () {
	'use strict';

	const utils = window.jetpackDeveloperDocsCarouselUtils;

	if ( ! utils ) {
		return;
	}

	function initializeCarousel( carousel ) {
		const viewport = carousel.querySelector( '[data-jp-carousel-viewport]' );
		const track = carousel.querySelector( '[data-jp-carousel-track]' );
		const list = carousel.querySelector( '[data-jp-carousel-list]' );

		if ( ! viewport || ! track || ! list || carousel.dataset.jpCarouselReady === 'true' ) {
			return;
		}

		carousel.dataset.jpCarouselReady = 'true';

		const reducedMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' );
		const pauseOnHover = carousel.dataset.pauseOnHover !== 'false';
		const speed = Math.min( 90, Math.max( 12, Number( carousel.dataset.speed ) || 34 ) );
		const state = {
			visible: typeof window.IntersectionObserver !== 'function',
			documentHidden: document.hidden,
			reducedMotion: reducedMotion.matches,
			hovered: false,
			focused: false,
			dragging: false,
			manuallyPaused: false
		};
		let clone = null;
		let loopWidth = 0;
		let animationFrame = null;
		let lastFrameTime = 0;
		let resumeTimer = null;
		let pointerStartX = 0;
		let pointerStartScrollLeft = 0;
		let pointerMoved = false;
		let suppressClickUntil = 0;

		function measureLoop() {
			loopWidth = list.getBoundingClientRect().width;
		}

		function removeClone() {
			if ( clone ) {
				clone.remove();
				clone = null;
			}
		}

		function createClone() {
			if ( clone || state.reducedMotion ) {
				return;
			}

			clone = list.cloneNode( true );
			clone.removeAttribute( 'data-jp-carousel-list' );
			clone.setAttribute( 'aria-hidden', 'true' );
			clone.classList.add( 'jetpack-developer-docs-product-carousel__list--clone' );
			clone.querySelectorAll( 'a' ).forEach( function ( link ) {
				link.setAttribute( 'tabindex', '-1' );
			} );
			track.appendChild( clone );
			measureLoop();
		}

		function stopAnimation() {
			if ( animationFrame !== null ) {
				window.cancelAnimationFrame( animationFrame );
				animationFrame = null;
			}
			lastFrameTime = 0;
		}

		function animate( timestamp ) {
			animationFrame = null;

			if ( ! utils.shouldAutoplay( state ) ) {
				lastFrameTime = 0;
				return;
			}

			if ( lastFrameTime > 0 && loopWidth > 0 ) {
				const elapsedSeconds = Math.min( 0.1, ( timestamp - lastFrameTime ) / 1000 );
				viewport.scrollLeft = utils.normalizeLoopPosition(
					viewport.scrollLeft + speed * elapsedSeconds,
					loopWidth
				);
			}

			lastFrameTime = timestamp;
			animationFrame = window.requestAnimationFrame( animate );
		}

		function syncAnimation() {
			if ( utils.shouldAutoplay( state ) ) {
				createClone();
				if ( animationFrame === null ) {
					animationFrame = window.requestAnimationFrame( animate );
				}
				return;
			}

			stopAnimation();
		}

		function pauseTemporarily() {
			state.manuallyPaused = true;
			window.clearTimeout( resumeTimer );
			stopAnimation();
			resumeTimer = window.setTimeout( function () {
				state.manuallyPaused = false;
				syncAnimation();
			}, 1100 );
		}

		function revealLink( link ) {
			const viewportRect = viewport.getBoundingClientRect();
			const linkRect = link.getBoundingClientRect();
			viewport.scrollLeft += utils.revealScrollDelta(
				viewportRect.left,
				viewportRect.right,
				linkRect.left,
				linkRect.right
			);
		}

		function handleReducedMotionChange( event ) {
			state.reducedMotion = event.matches;
			viewport.scrollLeft = 0;

			if ( state.reducedMotion ) {
				removeClone();
				carousel.classList.add( 'is-reduced-motion' );
			} else {
				carousel.classList.remove( 'is-reduced-motion' );
				createClone();
			}

			syncAnimation();
		}

		carousel.addEventListener( 'mouseenter', function () {
			if ( pauseOnHover ) {
				state.hovered = true;
				syncAnimation();
			}
		} );

		carousel.addEventListener( 'mouseleave', function () {
			state.hovered = false;
			syncAnimation();
		} );

		carousel.addEventListener( 'focusin', function ( event ) {
			state.focused = true;
			syncAnimation();

			if ( event.target.matches( '.jetpack-developer-docs-product-carousel__link' ) ) {
				revealLink( event.target );
			}
		} );

		carousel.addEventListener( 'focusout', function ( event ) {
			if ( ! carousel.contains( event.relatedTarget ) ) {
				state.focused = false;
				syncAnimation();
			}
		} );

		viewport.addEventListener( 'pointerdown', function ( event ) {
			if ( event.button !== 0 ) {
				return;
			}

			pointerStartX = event.clientX;
			pointerStartScrollLeft = viewport.scrollLeft;
			pointerMoved = false;
			state.dragging = true;
			viewport.classList.add( 'is-dragging' );
			viewport.setPointerCapture( event.pointerId );
			syncAnimation();
		} );

		viewport.addEventListener( 'pointermove', function ( event ) {
			if ( ! state.dragging ) {
				return;
			}

			const delta = event.clientX - pointerStartX;
			pointerMoved = pointerMoved || utils.movedBeyondThreshold( pointerStartX, event.clientX );

			if ( pointerMoved ) {
				event.preventDefault();
			}

			viewport.scrollLeft = pointerStartScrollLeft - delta;
		} );

		function finishPointerInteraction( event ) {
			if ( ! state.dragging ) {
				return;
			}

			if ( viewport.hasPointerCapture( event.pointerId ) ) {
				viewport.releasePointerCapture( event.pointerId );
			}

			state.dragging = false;
			viewport.classList.remove( 'is-dragging' );

			if ( pointerMoved ) {
				suppressClickUntil = Date.now() + 350;
			}

			pauseTemporarily();
		}

		viewport.addEventListener( 'pointerup', finishPointerInteraction );
		viewport.addEventListener( 'pointercancel', finishPointerInteraction );

		viewport.addEventListener( 'click', function ( event ) {
			if ( Date.now() < suppressClickUntil ) {
				event.preventDefault();
				event.stopPropagation();
			}
		}, true );

		viewport.addEventListener( 'scroll', function () {
			if ( ! state.dragging && ! utils.shouldAutoplay( state ) ) {
				pauseTemporarily();
			}
		}, { passive: true } );

		viewport.addEventListener( 'wheel', function () {
			pauseTemporarily();
		}, { passive: true } );

		document.addEventListener( 'visibilitychange', function () {
			state.documentHidden = document.hidden;
			syncAnimation();
		} );

		if ( typeof reducedMotion.addEventListener === 'function' ) {
			reducedMotion.addEventListener( 'change', handleReducedMotionChange );
		} else {
			reducedMotion.addListener( handleReducedMotionChange );
		}

		if ( typeof window.IntersectionObserver === 'function' ) {
			const intersectionObserver = new window.IntersectionObserver( function ( entries ) {
				state.visible = entries.some( function ( entry ) {
					return entry.isIntersecting;
				} );
				syncAnimation();
			}, { threshold: 0.05 } );
			intersectionObserver.observe( carousel );
		}

		if ( typeof window.ResizeObserver === 'function' ) {
			const resizeObserver = new window.ResizeObserver( measureLoop );
			resizeObserver.observe( list );
		} else {
			window.addEventListener( 'resize', measureLoop );
		}

		if ( state.reducedMotion ) {
			carousel.classList.add( 'is-reduced-motion' );
		} else {
			createClone();
		}

		measureLoop();
		syncAnimation();
	}

	function initializeAllCarousels() {
		document.querySelectorAll( '[data-jp-carousel]' ).forEach( initializeCarousel );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initializeAllCarousels );
	} else {
		initializeAllCarousels();
	}
} )();
