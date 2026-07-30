( function ( wp, defaults ) {
	'use strict';

	const { registerBlockType } = wp.blocks;
	const { InspectorControls, useBlockProps } = wp.blockEditor;
	const { Button, PanelBody, RangeControl, TextControl, ToggleControl } = wp.components;
	const { createElement: el, Fragment } = wp.element;
	const { __ } = wp.i18n;

	function updateItem( items, index, key, value ) {
		return items.map( function ( item, itemIndex ) {
			if ( itemIndex !== index ) {
				return item;
			}

			return {
				...item,
				[ key ]: value
			};
		} );
	}

	function moveItem( items, index, offset ) {
		const nextIndex = index + offset;

		if ( nextIndex < 0 || nextIndex >= items.length ) {
			return items;
		}

		const nextItems = [ ...items ];
		const movedItem = nextItems.splice( index, 1 )[ 0 ];
		nextItems.splice( nextIndex, 0, movedItem );
		return nextItems;
	}

	function ProductItemControls( { index, item, items, setAttributes } ) {
		return el(
			'div',
			{ className: 'jetpack-developer-docs-product-carousel-editor__item' },
			el( TextControl, {
				label: __( 'Product name', 'jetpack-developer-docs-site' ),
				value: item.label || '',
				onChange: function ( value ) {
					setAttributes( { items: updateItem( items, index, 'label', value ) } );
				}
			} ),
			el( TextControl, {
				label: __( 'Documentation path', 'jetpack-developer-docs-site' ),
				value: item.url || '',
				onChange: function ( value ) {
					setAttributes( { items: updateItem( items, index, 'url', value ) } );
				}
			} ),
			el(
				'div',
				{ className: 'jetpack-developer-docs-product-carousel-editor__actions' },
				el( Button, {
					disabled: index === 0,
					icon: 'arrow-up-alt2',
					label: __( 'Move product up', 'jetpack-developer-docs-site' ),
					onClick: function () {
						setAttributes( { items: moveItem( items, index, -1 ) } );
					}
				} ),
				el( Button, {
					disabled: index === items.length - 1,
					icon: 'arrow-down-alt2',
					label: __( 'Move product down', 'jetpack-developer-docs-site' ),
					onClick: function () {
						setAttributes( { items: moveItem( items, index, 1 ) } );
					}
				} ),
				el( Button, {
					isDestructive: true,
					variant: 'tertiary',
					onClick: function () {
						setAttributes( {
							items: items.filter( function ( unusedItem, itemIndex ) {
								return itemIndex !== index;
							} )
						} );
					}
				}, __( 'Remove', 'jetpack-developer-docs-site' ) )
			)
		);
	}

	registerBlockType( 'jetpack-developer-docs/product-carousel', {
		apiVersion: 3,
		title: __( 'Product carousel', 'jetpack-developer-docs-site' ),
		description: __( 'A site-only strip linking to the Jetpack product documentation hubs.', 'jetpack-developer-docs-site' ),
		category: 'design',
		icon: 'slides',
		attributes: {
			items: {
				type: 'array',
				default: defaults
			},
			ariaLabel: {
				type: 'string',
				default: 'Browse product documentation'
			},
			speed: {
				type: 'number',
				default: 34
			},
			pauseOnHover: {
				type: 'boolean',
				default: true
			}
		},
		supports: {
			align: [ 'wide', 'full' ],
			html: false
		},
		edit: function ( { attributes, setAttributes } ) {
			const items = Array.isArray( attributes.items ) ? attributes.items : [];
			const blockProps = useBlockProps( {
				className: 'jetpack-developer-docs-product-carousel'
			} );

			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{
							title: __( 'Carousel settings', 'jetpack-developer-docs-site' ),
							initialOpen: true
						},
						el( TextControl, {
							label: __( 'Accessible section name', 'jetpack-developer-docs-site' ),
							value: attributes.ariaLabel,
							onChange: function ( ariaLabel ) {
								setAttributes( { ariaLabel } );
							}
						} ),
						el( RangeControl, {
							label: __( 'Autoplay speed', 'jetpack-developer-docs-site' ),
							help: __( 'Pixels moved per second.', 'jetpack-developer-docs-site' ),
							min: 12,
							max: 90,
							value: attributes.speed,
							onChange: function ( speed ) {
								setAttributes( { speed } );
							}
						} ),
						el( ToggleControl, {
							label: __( 'Pause on pointer hover', 'jetpack-developer-docs-site' ),
							checked: attributes.pauseOnHover,
							onChange: function ( pauseOnHover ) {
								setAttributes( { pauseOnHover } );
							}
						} )
					),
					el(
						PanelBody,
						{
							title: __( 'Products', 'jetpack-developer-docs-site' ),
							initialOpen: false
						},
						items.map( function ( item, index ) {
							return el( ProductItemControls, {
								index,
								item,
								items,
								key: `${ item.label || 'product' }-${ index }`,
								setAttributes
							} );
						} ),
						el( Button, {
							variant: 'secondary',
							onClick: function () {
								setAttributes( {
									items: [ ...items, { label: '', url: '' } ]
								} );
							}
						}, __( 'Add product', 'jetpack-developer-docs-site' ) )
					)
				),
				el(
					'section',
					blockProps,
					el(
						'div',
						{ className: 'jetpack-developer-docs-product-carousel__viewport' },
						el(
							'ul',
							{ className: 'jetpack-developer-docs-product-carousel__list' },
							items.map( function ( item, index ) {
								return el(
									'li',
									{
										className: 'jetpack-developer-docs-product-carousel__item',
										key: `${ item.label || 'product' }-${ index }`
									},
									el(
										'span',
										{ className: 'jetpack-developer-docs-product-carousel__link' },
										item.label || __( 'Untitled product', 'jetpack-developer-docs-site' )
									)
								);
							} )
						)
					)
				)
			);
		},
		save: function () {
			return null;
		}
	} );
}( window.wp, window.jetpackDeveloperDocsProductCarouselDefaults || [] ) );
