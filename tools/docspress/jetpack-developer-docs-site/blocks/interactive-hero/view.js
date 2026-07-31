// eslint-disable-next-line import/no-unresolved -- Pinned browser module with an image fallback.
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.min.js';

const GREEN = 0x00a32a;
const SCALE = 0.0128;

const svgPoint = ( x, y, z = 0 ) =>
	new THREE.Vector3( ( x - 360 ) * SCALE, ( 360 - y ) * SCALE, z );
const easeOutCubic = value => 1 - Math.pow( 1 - value, 3 );

const initializeHero = visual => {
	const canvasHost = visual.querySelector( '[data-jp-docs-hero-canvas]' );
	if ( ! canvasHost ) {
		return;
	}

	const reducedMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
	const renderer = new THREE.WebGLRenderer( {
		alpha: true,
		antialias: true,
		powerPreference: 'high-performance',
	} );
	renderer.setClearColor( 0xffffff, 0 );
	renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	canvasHost.appendChild( renderer.domElement );

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 27, 1, 0.1, 100 );
	camera.position.set( 0, 0, 24 );

	const root = new THREE.Group();
	root.rotation.x = -0.03;
	scene.add( root );

	const animatedParts = [];
	const constructionMaterials = [];
	const pointFillMaterials = [];
	const addAnimatedPart = ( object, materials, layer, fixedScale = false ) => {
		object.userData.materials = materials;
		object.userData.layer = layer;
		object.userData.fixedScale = fixedScale;
		animatedParts.push( object );
	};

	const createLineMaterial = ( dashed = false ) => {
		const options = {
			color: 0x7b8287,
			transparent: true,
			opacity: 0,
			depthTest: false,
		};
		const material = dashed
			? new THREE.LineDashedMaterial( { ...options, dashSize: 0.055, gapSize: 0.085 } )
			: new THREE.LineBasicMaterial( options );
		constructionMaterials.push( material );
		return material;
	};

	const addConstructionLine = ( points, dashed = false, closed = false ) => {
		const material = createLineMaterial( dashed );
		const geometry = new THREE.BufferGeometry().setFromPoints( points );
		const line = closed
			? new THREE.LineLoop( geometry, material )
			: new THREE.Line( geometry, material );
		line.position.z = -0.24;
		line.renderOrder = 0;
		if ( dashed ) {
			line.computeLineDistances();
		}
		root.add( line );
		addAnimatedPart( line, [ material ], 'construction', true );
		return line;
	};

	const addConstructionSegments = segments => {
		const material = createLineMaterial();
		const points = segments.flatMap( segment => segment );
		const geometry = new THREE.BufferGeometry().setFromPoints( points );
		const lines = new THREE.LineSegments( geometry, material );
		lines.position.z = -0.24;
		lines.renderOrder = 0;
		root.add( lines );
		addAnimatedPart( lines, [ material ], 'construction', true );
	};

	const circlePoints = ( radius, count = 128 ) =>
		Array.from( { length: count }, ( unused, index ) => {
			const angle = ( index / count ) * Math.PI * 2;
			return new THREE.Vector3(
				Math.cos( angle ) * radius * SCALE,
				Math.sin( angle ) * radius * SCALE,
				0
			);
		} );

	addConstructionLine( circlePoints( 225 ), true, true );
	addConstructionLine( [ svgPoint( 74, 360 ), svgPoint( 646, 360 ) ], true );
	addConstructionLine( [ svgPoint( 360, 74 ), svgPoint( 360, 646 ) ], true );
	addConstructionLine( [ svgPoint( 158, 158 ), svgPoint( 562, 562 ) ], true );
	addConstructionLine( [ svgPoint( 562, 158 ), svgPoint( 158, 562 ) ], true );
	addConstructionSegments( [
		[ svgPoint( 185, 112 ), svgPoint( 185, 40 ) ],
		[ svgPoint( 535, 112 ), svgPoint( 535, 40 ) ],
		[ svgPoint( 185, 62 ), svgPoint( 535, 62 ) ],
		[ svgPoint( 185, 62 ), svgPoint( 202, 52 ) ],
		[ svgPoint( 185, 62 ), svgPoint( 202, 72 ) ],
		[ svgPoint( 535, 62 ), svgPoint( 518, 52 ) ],
		[ svgPoint( 535, 62 ), svgPoint( 518, 72 ) ],
		[ svgPoint( 608, 185 ), svgPoint( 680, 185 ) ],
		[ svgPoint( 608, 535 ), svgPoint( 680, 535 ) ],
		[ svgPoint( 658, 185 ), svgPoint( 658, 535 ) ],
		[ svgPoint( 658, 185 ), svgPoint( 648, 202 ) ],
		[ svgPoint( 658, 185 ), svgPoint( 668, 202 ) ],
		[ svgPoint( 658, 535 ), svgPoint( 648, 518 ) ],
		[ svgPoint( 658, 535 ), svgPoint( 668, 518 ) ],
	] );

	const addLabel = ( text, x, y, color, width = 0.74 ) => {
		const labelCanvas = document.createElement( 'canvas' );
		labelCanvas.width = 256;
		labelCanvas.height = 96;
		const context = labelCanvas.getContext( '2d' );
		context.clearRect( 0, 0, labelCanvas.width, labelCanvas.height );
		context.fillStyle = color;
		context.font = '700 48px Arial, sans-serif';
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillText( text, labelCanvas.width / 2, labelCanvas.height / 2 );

		const texture = new THREE.CanvasTexture( labelCanvas );
		texture.colorSpace = THREE.SRGBColorSpace;
		const material = new THREE.SpriteMaterial( {
			map: texture,
			transparent: true,
			opacity: 0,
			depthTest: false,
		} );
		const sprite = new THREE.Sprite( material );
		sprite.position.copy( svgPoint( x, y, 0.36 ) );
		sprite.scale.set( width, width * 0.375, 1 );
		sprite.renderOrder = 3;
		root.add( sprite );
		addAnimatedPart( sprite, [ material ], 'label', true );
	};

	addLabel( '45°', 223, 203, '#00a32a', 0.82 );
	addLabel( 'R', 478, 220, '#00a32a', 0.52 );
	addLabel( '90°', 506, 546, '#00a32a', 0.9 );
	addLabel( '572', 360, 46, '#747b80', 0.7 );
	addLabel( '572', 680, 360, '#747b80', 0.7 );

	const draggablePoints = [];
	const draggableHitTargets = [];
	const pointDefinitions = [
		[ 360, 74 ],
		[ 360, 646 ],
		[ 74, 360 ],
		[ 646, 360 ],
		[ 360, 135 ],
		[ 360, 312 ],
		[ 360, 360 ],
		[ 360, 408 ],
		[ 192, 408 ],
		[ 378, 312 ],
		[ 550, 312 ],
		[ 378, 585 ],
	];

	pointDefinitions.forEach( ( [ x, y ] ) => {
		const point = new THREE.Group();
		point.position.copy( svgPoint( x, y, 0.48 ) );
		point.userData.home = point.position.clone();
		point.userData.velocity = new THREE.Vector3();
		point.userData.targetHandleScale = 1;

		const handle = new THREE.Group();
		point.userData.handle = handle;
		point.add( handle );

		const fillMaterial = new THREE.MeshBasicMaterial( {
			color: 0xffffff,
			transparent: true,
			opacity: 0,
			depthTest: false,
		} );
		pointFillMaterials.push( fillMaterial );
		const ringMaterial = new THREE.MeshBasicMaterial( {
			color: GREEN,
			transparent: true,
			opacity: 0,
			side: THREE.DoubleSide,
			depthTest: false,
		} );
		const fill = new THREE.Mesh( new THREE.CircleGeometry( 0.105, 32 ), fillMaterial );
		const ring = new THREE.Mesh( new THREE.RingGeometry( 0.073, 0.13, 32 ), ringMaterial );
		fill.renderOrder = 4;
		ring.renderOrder = 5;
		ring.position.z = 0.01;
		handle.add( fill, ring );

		const hitTarget = new THREE.Mesh(
			new THREE.CircleGeometry( 0.27, 24 ),
			new THREE.MeshBasicMaterial( {
				transparent: true,
				opacity: 0,
				depthTest: false,
				depthWrite: false,
			} )
		);
		hitTarget.position.z = 0.03;
		hitTarget.userData.point = point;
		handle.add( hitTarget );

		root.add( point );
		draggablePoints.push( point );
		draggableHitTargets.push( hitTarget );
		addAnimatedPart( point, [ fillMaterial, ringMaterial ], 'nodes', true );
	} );

	const createClosedStroke = ( pointCount, width, z, layer, renderOrder ) => {
		const positions = new Float32Array( pointCount * 12 );
		const indices = new Uint16Array( pointCount * 6 );
		for ( let index = 0; index < pointCount; index += 1 ) {
			const vertex = index * 4;
			indices.set(
				[ vertex, vertex + 1, vertex + 2, vertex + 2, vertex + 1, vertex + 3 ],
				index * 6
			);
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
		geometry.setIndex( new THREE.BufferAttribute( indices, 1 ) );
		const material = new THREE.MeshBasicMaterial( {
			color: GREEN,
			transparent: true,
			opacity: 0,
			side: THREE.DoubleSide,
			depthTest: false,
		} );
		const mesh = new THREE.Mesh( geometry, material );
		mesh.position.z = z;
		mesh.renderOrder = renderOrder;
		mesh.frustumCulled = false;
		root.add( mesh );
		addAnimatedPart( mesh, [ material ], layer, true );
		return { geometry, positions, width };
	};

	const updateClosedStroke = ( stroke, points ) => {
		const halfWidth = stroke.width / 2;
		for ( let index = 0; index < points.length; index += 1 ) {
			const point = points[ index ];
			const next = points[ ( index + 1 ) % points.length ];
			const tangentX = next.x - point.x;
			const tangentY = next.y - point.y;
			const tangentLength = Math.hypot( tangentX, tangentY ) || 1;
			const normalX = ( -tangentY / tangentLength ) * halfWidth;
			const normalY = ( tangentX / tangentLength ) * halfWidth;
			stroke.positions.set(
				[
					point.x + normalX,
					point.y + normalY,
					0,
					point.x - normalX,
					point.y - normalY,
					0,
					next.x + normalX,
					next.y + normalY,
					0,
					next.x - normalX,
					next.y - normalY,
					0,
				],
				index * 12
			);
		}
		stroke.geometry.attributes.position.needsUpdate = true;
	};

	const ringCardinals = [
		draggablePoints[ 0 ].position,
		draggablePoints[ 3 ].position,
		draggablePoints[ 1 ].position,
		draggablePoints[ 2 ].position,
	];
	const ringCenter = new THREE.Vector3();
	const radial = new THREE.Vector3();
	const nextRadial = new THREE.Vector3();
	const tangent = new THREE.Vector3();
	const nextTangent = new THREE.Vector3();
	const ringCurves = Array.from(
		{ length: 4 },
		() =>
			new THREE.CubicBezierCurve3(
				new THREE.Vector3(),
				new THREE.Vector3(),
				new THREE.Vector3(),
				new THREE.Vector3()
			)
	);
	const ringPoints = Array.from( { length: 96 }, () => new THREE.Vector3() );
	const ringStroke = createClosedStroke( ringPoints.length, 0.09, 0.08, 'ring', 1 );
	const leftMarkPoints = [ 4, 5, 6, 7, 8 ].map( index => draggablePoints[ index ].position );
	const rightMarkPoints = [ 9, 10, 11 ].map( index => draggablePoints[ index ].position );
	const leftMarkStroke = createClosedStroke( leftMarkPoints.length, 0.14, 0.2, 'mark', 2 );
	const rightMarkStroke = createClosedStroke( rightMarkPoints.length, 0.14, 0.2, 'mark', 2 );

	const updateDynamicLines = () => {
		ringCenter.set( 0, 0, 0 );
		ringCardinals.forEach( point => ringCenter.add( point ) );
		ringCenter.multiplyScalar( 0.25 );

		for ( let quadrant = 0; quadrant < ringCardinals.length; quadrant += 1 ) {
			const current = ringCardinals[ quadrant ];
			const next = ringCardinals[ ( quadrant + 1 ) % ringCardinals.length ];
			radial.copy( current ).sub( ringCenter );
			nextRadial.copy( next ).sub( ringCenter );
			tangent.set( radial.y, -radial.x, 0 ).normalize();
			nextTangent.set( nextRadial.y, -nextRadial.x, 0 ).normalize();

			const curve = ringCurves[ quadrant ];
			curve.v0.copy( current );
			curve.v1.copy( current ).addScaledVector( tangent, radial.length() * 0.5522848 );
			curve.v2.copy( next ).addScaledVector( nextTangent, -nextRadial.length() * 0.5522848 );
			curve.v3.copy( next );

			for ( let step = 0; step < 24; step += 1 ) {
				curve.getPoint( step / 24, ringPoints[ quadrant * 24 + step ] );
			}
		}

		updateClosedStroke( ringStroke, ringPoints );
		updateClosedStroke( leftMarkStroke, leftMarkPoints );
		updateClosedStroke( rightMarkStroke, rightMarkPoints );
	};
	updateDynamicLines();

	const pointer = new THREE.Vector2();
	const targetPointer = new THREE.Vector2();
	const dragPointer = new THREE.Vector2();
	const raycaster = new THREE.Raycaster();
	const dragPlane = new THREE.Plane();
	const dragPlaneNormal = new THREE.Vector3();
	const dragPlanePoint = new THREE.Vector3();
	const dragWorldPoint = new THREE.Vector3();
	const dragLocalPoint = new THREE.Vector3();
	const dragOffset = new THREE.Vector3();
	const dragDelta = new THREE.Vector3();
	const rootQuaternion = new THREE.Quaternion();
	const clock = new THREE.Clock();
	const introStart = performance.now();
	let animationFrame;
	let activePoint = null;
	let activePointerId = null;
	let hoveredPoint = null;

	const setPartOpacity = ( part, opacity ) => {
		part.userData.materials.forEach( material => {
			material.opacity = opacity;
		} );
	};
	const layerDelay = layer =>
		( {
			construction: 0,
			ring: 0.18,
			mark: 0.34,
			nodes: 0.52,
			label: 0.6,
		} )[ layer ] ?? 0.25;
	const layerOpacity = layer => ( layer === 'construction' ? 0.64 : 1 );

	const updateThemeColors = () => {
		const styles = getComputedStyle( visual );
		const construction =
			styles.getPropertyValue( '--jp-docs-hero-construction' ).trim() || '#7b8287';
		const pointFill = styles.getPropertyValue( '--jp-docs-hero-point-fill' ).trim() || '#fff';
		constructionMaterials.forEach( material => material.color.setStyle( construction ) );
		pointFillMaterials.forEach( material => material.color.setStyle( pointFill ) );
	};
	updateThemeColors();
	const themeObserver = new MutationObserver( updateThemeColors );
	themeObserver.observe( document.documentElement, {
		attributes: true,
		attributeFilter: [ 'data-theme' ],
	} );

	const render = now => {
		const delta = Math.min( 2, clock.getDelta() * 60 );
		const elapsed = clock.elapsedTime;
		const follow = reducedMotion ? 1 : 1 - Math.pow( 0.925, delta );
		pointer.lerp( targetPointer, follow );

		if ( ! reducedMotion && ! activePoint ) {
			const rootFollow = 1 - Math.pow( 0.93, delta );
			root.rotation.y += ( pointer.x * 0.2 - root.rotation.y ) * rootFollow;
			root.rotation.x += ( -pointer.y * 0.15 - 0.03 - root.rotation.x ) * rootFollow;
			root.position.x += ( pointer.x * 0.16 - root.position.x ) * rootFollow;
			root.position.y +=
				( pointer.y * 0.12 + Math.sin( elapsed * 0.65 ) * 0.055 - root.position.y ) * rootFollow;
		}

		draggablePoints.forEach( point => {
			const home = point.userData.home;
			const velocity = point.userData.velocity;
			if ( point !== activePoint ) {
				if ( reducedMotion ) {
					point.position.copy( home );
					velocity.set( 0, 0, 0 );
				} else {
					velocity.addScaledVector( dragDelta.copy( home ).sub( point.position ), 0.08 * delta );
					velocity.multiplyScalar( Math.pow( 0.78, delta ) );
					point.position.addScaledVector( velocity, delta );
					if (
						point.position.distanceToSquared( home ) < 0.00001 &&
						velocity.lengthSq() < 0.00001
					) {
						point.position.copy( home );
						velocity.set( 0, 0, 0 );
					}
				}
			}
			point.userData.handle.scale.lerp(
				dragDelta.setScalar( point.userData.targetHandleScale ),
				0.16 * delta
			);
		} );
		updateDynamicLines();

		animatedParts.forEach( ( part, index ) => {
			if ( reducedMotion ) {
				setPartOpacity( part, layerOpacity( part.userData.layer ) );
				if ( ! part.userData.fixedScale ) {
					part.scale.setScalar( 1 );
				}
				return;
			}
			const start = layerDelay( part.userData.layer ) + ( index % 8 ) * 0.018;
			const progress = THREE.MathUtils.clamp(
				( ( now - introStart ) / 1000 - start ) / 0.62,
				0,
				1
			);
			const eased = easeOutCubic( progress );
			setPartOpacity( part, eased * layerOpacity( part.userData.layer ) );
			if ( ! part.userData.fixedScale ) {
				part.scale.setScalar( 0.96 + eased * 0.04 );
			}
		} );

		renderer.render( scene, camera );
		animationFrame = requestAnimationFrame( render );
	};

	const resize = () => {
		const { width, height } = canvasHost.getBoundingClientRect();
		if ( ! width || ! height ) {
			return;
		}
		renderer.setSize( width, height, false );
		camera.aspect = width / height;
		const fov = THREE.MathUtils.degToRad( camera.fov );
		const distanceForHeight = 9.9 / ( 2 * Math.tan( fov / 2 ) );
		const distanceForWidth = 9.9 / ( 2 * Math.tan( fov / 2 ) * camera.aspect );
		camera.position.z = Math.max( distanceForHeight, distanceForWidth );
		camera.updateProjectionMatrix();
	};
	const resizeObserver = new ResizeObserver( resize );
	resizeObserver.observe( canvasHost );

	const updateParallaxPointer = event => {
		if ( reducedMotion ) {
			return;
		}
		const bounds = visual.getBoundingClientRect();
		targetPointer.set(
			THREE.MathUtils.clamp( ( ( event.clientX - bounds.left ) / bounds.width ) * 2 - 1, -1, 1 ),
			THREE.MathUtils.clamp(
				-( ( ( event.clientY - bounds.top ) / bounds.height ) * 2 - 1 ),
				-1,
				1
			)
		);
		visual.dataset.interacted = 'true';
	};
	const updateDragPointer = event => {
		const bounds = renderer.domElement.getBoundingClientRect();
		dragPointer.set(
			( ( event.clientX - bounds.left ) / bounds.width ) * 2 - 1,
			-( ( ( event.clientY - bounds.top ) / bounds.height ) * 2 - 1 )
		);
		raycaster.setFromCamera( dragPointer, camera );
	};
	const updateHoveredPoint = event => {
		if ( activePoint ) {
			return;
		}
		updateDragPointer( event );
		const hit = raycaster.intersectObjects( draggableHitTargets, false )[ 0 ];
		const nextHoveredPoint = hit?.object?.userData?.point || null;
		if ( hoveredPoint && hoveredPoint !== nextHoveredPoint ) {
			hoveredPoint.userData.targetHandleScale = 1;
		}
		hoveredPoint = nextHoveredPoint;
		if ( hoveredPoint ) {
			hoveredPoint.userData.targetHandleScale = 1.18;
		}
		visual.dataset.hovering = String( Boolean( hoveredPoint ) );
	};
	const beginPointDrag = event => {
		updateDragPointer( event );
		const hit = raycaster.intersectObjects( draggableHitTargets, false )[ 0 ];
		if ( ! hit ) {
			return;
		}
		activePoint = hit.object.userData.point;
		activePointerId = event.pointerId;
		activePoint.userData.velocity.set( 0, 0, 0 );
		activePoint.userData.targetHandleScale = 1.24;
		visual.dataset.dragging = 'true';
		visual.dataset.interacted = 'true';

		root.updateWorldMatrix( true, true );
		root.getWorldQuaternion( rootQuaternion );
		dragPlaneNormal.set( 0, 0, 1 ).applyQuaternion( rootQuaternion ).normalize();
		dragPlanePoint.set( 0, 0, activePoint.userData.home.z );
		root.localToWorld( dragPlanePoint );
		dragPlane.setFromNormalAndCoplanarPoint( dragPlaneNormal, dragPlanePoint );
		if ( raycaster.ray.intersectPlane( dragPlane, dragWorldPoint ) ) {
			dragLocalPoint.copy( dragWorldPoint );
			root.worldToLocal( dragLocalPoint );
			dragOffset.copy( activePoint.position ).sub( dragLocalPoint );
		}
		renderer.domElement.setPointerCapture( event.pointerId );
		event.preventDefault();
	};
	const movePointDrag = event => {
		if ( ! activePoint || event.pointerId !== activePointerId ) {
			updateParallaxPointer( event );
			updateHoveredPoint( event );
			return;
		}
		updateDragPointer( event );
		if ( raycaster.ray.intersectPlane( dragPlane, dragWorldPoint ) ) {
			dragLocalPoint.copy( dragWorldPoint );
			root.worldToLocal( dragLocalPoint );
			dragLocalPoint.add( dragOffset );
			dragDelta.copy( dragLocalPoint ).sub( activePoint.userData.home );
			if ( dragDelta.length() > 1.65 ) {
				dragDelta.setLength( 1.65 );
			}
			activePoint.position.copy( activePoint.userData.home ).add( dragDelta );
			activePoint.position.z = activePoint.userData.home.z;
		}
		event.preventDefault();
	};
	const releasePointDrag = event => {
		if ( ! activePoint || ( event?.pointerId != null && event.pointerId !== activePointerId ) ) {
			return;
		}
		const releasedPoint = activePoint;
		activePoint = null;
		activePointerId = null;
		releasedPoint.userData.targetHandleScale = 1;
		visual.dataset.dragging = 'false';
		visual.dataset.hovering = 'false';
		if ( event?.pointerId != null && renderer.domElement.hasPointerCapture( event.pointerId ) ) {
			renderer.domElement.releasePointerCapture( event.pointerId );
		}
	};

	renderer.domElement.addEventListener( 'pointerdown', beginPointDrag );
	renderer.domElement.addEventListener( 'pointermove', movePointDrag, { passive: false } );
	renderer.domElement.addEventListener( 'pointerup', releasePointDrag );
	renderer.domElement.addEventListener( 'pointercancel', releasePointDrag );
	renderer.domElement.addEventListener( 'lostpointercapture', releasePointDrag );
	renderer.domElement.addEventListener( 'pointerleave', () => {
		if ( ! activePoint ) {
			targetPointer.set( 0, 0 );
			if ( hoveredPoint ) {
				hoveredPoint.userData.targetHandleScale = 1;
			}
			hoveredPoint = null;
			visual.dataset.hovering = 'false';
		}
	} );
	window.addEventListener( 'pointerup', releasePointDrag );
	window.addEventListener( 'pointercancel', releasePointDrag );
	window.addEventListener( 'blur', releasePointDrag );

	resize();
	visual.dataset.state = 'ready';
	animationFrame = requestAnimationFrame( render );

	window.addEventListener(
		'pagehide',
		() => {
			cancelAnimationFrame( animationFrame );
			resizeObserver.disconnect();
			themeObserver.disconnect();
		},
		{ once: true }
	);
};

document.querySelectorAll( '[data-jp-docs-hero]' ).forEach( visual => {
	try {
		visual.dataset.state = 'loading';
		initializeHero( visual );
	} catch {
		visual.dataset.state = 'fallback';
	}
} );
