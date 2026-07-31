<?php
/**
 * Plugin Name: Jetpack Developer Docs Site
 * Description: Site-specific presentation blocks for the Jetpack Developer Docs website.
 * Version: 0.1.4
 * Requires at least: 6.6
 * Requires PHP: 7.2
 * Author: Automattic
 * License: GPL-2.0-or-later
 * Text Domain: jetpack-developer-docs-site
 *
 * @package JetpackDeveloperDocsSite
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'JETPACK_DEVELOPER_DOCS_SITE_VERSION', '0.1.4' );
define( 'JETPACK_DEVELOPER_DOCS_SITE_PATH', plugin_dir_path( __FILE__ ) );
define( 'JETPACK_DEVELOPER_DOCS_SITE_URL', plugin_dir_url( __FILE__ ) );

/**
 * Return the product links used when a new carousel is inserted in the editor.
 *
 * The synchronized homepage supplies the same values explicitly. Keeping a
 * default makes the site-specific block useful in an editor preview without
 * introducing a dependency on DocsPress.
 *
 * @return array
 */
function jetpack_developer_docs_site_product_carousel_defaults() {
	return array(
		array(
			'label' => 'Jetpack',
			'url'   => '/developer-docs/products/jetpack/',
		),
		array(
			'label' => 'Akismet Anti-spam',
			'url'   => '/developer-docs/products/akismet/',
		),
		array(
			'label' => 'VaultPress Backup',
			'url'   => '/developer-docs/products/backup/',
		),
		array(
			'label' => 'Jetpack Boost',
			'url'   => '/developer-docs/products/boost/',
		),
		array(
			'label' => 'Jetpack CRM',
			'url'   => '/developer-docs/products/crm/',
		),
		array(
			'label' => 'Jetpack Forms',
			'url'   => '/developer-docs/products/forms/',
		),
		array(
			'label' => 'Jetpack Protect',
			'url'   => '/developer-docs/products/protect/',
		),
		array(
			'label' => 'Jetpack Scan',
			'url'   => '/developer-docs/products/scan/',
		),
		array(
			'label' => 'Jetpack Search',
			'url'   => '/developer-docs/products/search/',
		),
		array(
			'label' => 'Jetpack Social',
			'url'   => '/developer-docs/products/social/',
		),
		array(
			'label' => 'Jetpack Stats',
			'url'   => '/developer-docs/products/stats/',
		),
		array(
			'label' => 'Jetpack VideoPress',
			'url'   => '/developer-docs/products/videopress/',
		),
		array(
			'label' => 'Jetpack AI Assistant',
			'url'   => '/developer-docs/products/ai/',
		),
	);
}

/**
 * Normalize carousel items for safe rendering.
 *
 * @param mixed $items Raw block items.
 * @return array
 */
function jetpack_developer_docs_site_normalize_carousel_items( $items ) {
	if ( ! is_array( $items ) ) {
		return array();
	}

	$normalized = array();

	foreach ( array_slice( $items, 0, 30 ) as $item ) {
		if ( ! is_array( $item ) ) {
			continue;
		}

		$label = isset( $item['label'] ) ? sanitize_text_field( $item['label'] ) : '';
		$url   = isset( $item['url'] ) ? esc_url_raw( $item['url'] ) : '';

		if ( '' === $label || '' === $url ) {
			continue;
		}

		$normalized[] = array(
			'label' => $label,
			'url'   => $url,
		);
	}

	return $normalized;
}

/**
 * Render the product carousel and enqueue its site-only assets.
 *
 * @param array $attributes Block attributes.
 * @return string
 */
function jetpack_developer_docs_site_render_product_carousel( $attributes ) {
	$raw_items = $attributes['items'] ?? jetpack_developer_docs_site_product_carousel_defaults();
	$items     = jetpack_developer_docs_site_normalize_carousel_items( $raw_items );

	if ( empty( $items ) ) {
		return '';
	}

	$aria_label = isset( $attributes['ariaLabel'] )
		? sanitize_text_field( $attributes['ariaLabel'] )
		: '';
	$aria_label = $aria_label
		? $aria_label
		: __( 'Browse product documentation', 'jetpack-developer-docs-site' );

	$speed          = isset( $attributes['speed'] ) ? absint( $attributes['speed'] ) : 34;
	$speed          = min( 90, max( 12, $speed ) );
	$pause_on_hover = ! isset( $attributes['pauseOnHover'] ) || (bool) $attributes['pauseOnHover'];
	$heading_id     = wp_unique_id( 'jetpack-developer-docs-product-carousel-' );

	wp_enqueue_style( 'jetpack-developer-docs-product-carousel' );
	wp_enqueue_script( 'jetpack-developer-docs-product-carousel' );

	ob_start();
	?>
	<section
		<?php
		echo get_block_wrapper_attributes(
			array(
				'class'               => 'jetpack-developer-docs-product-carousel',
				'data-jp-carousel'    => '',
				'data-speed'          => (string) $speed,
				'data-pause-on-hover' => $pause_on_hover ? 'true' : 'false',
				'aria-labelledby'     => $heading_id,
			)
		); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		?>
	>
		<h2
			id="<?php echo esc_attr( $heading_id ); ?>"
			class="screen-reader-text"
		>
			<?php echo esc_html( $aria_label ); ?>
		</h2>
		<div class="jetpack-developer-docs-product-carousel__viewport" data-jp-carousel-viewport>
			<div class="jetpack-developer-docs-product-carousel__track" data-jp-carousel-track>
				<ul class="jetpack-developer-docs-product-carousel__list" data-jp-carousel-list>
					<?php foreach ( $items as $item ) : ?>
						<li class="jetpack-developer-docs-product-carousel__item">
							<a
								class="jetpack-developer-docs-product-carousel__link"
								href="<?php echo esc_url( $item['url'] ); ?>"
							>
								<?php echo esc_html( $item['label'] ); ?>
							</a>
						</li>
					<?php endforeach; ?>
				</ul>
			</div>
		</div>
	</section>
	<?php

	return trim( ob_get_clean() );
}

/**
 * Register the site-specific carousel block and its assets.
 */
function jetpack_developer_docs_site_register_product_carousel() {
	$block_url = JETPACK_DEVELOPER_DOCS_SITE_URL . 'blocks/product-carousel/';
	$defaults  = 'window.jetpackDeveloperDocsProductCarouselDefaults = '
		. wp_json_encode(
			jetpack_developer_docs_site_product_carousel_defaults(),
			JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP
		)
		. ';';

	wp_register_script(
		'jetpack-developer-docs-product-carousel-utils',
		$block_url . 'utils.js',
		array(),
		JETPACK_DEVELOPER_DOCS_SITE_VERSION,
		true
	);
	wp_register_script(
		'jetpack-developer-docs-product-carousel',
		$block_url . 'view.js',
		array( 'jetpack-developer-docs-product-carousel-utils' ),
		JETPACK_DEVELOPER_DOCS_SITE_VERSION,
		true
	);
	wp_register_script(
		'jetpack-developer-docs-product-carousel-editor',
		$block_url . 'editor.js',
		array( 'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n' ),
		JETPACK_DEVELOPER_DOCS_SITE_VERSION,
		true
	);
	wp_add_inline_script(
		'jetpack-developer-docs-product-carousel-editor',
		$defaults,
		'before'
	);
	wp_register_style(
		'jetpack-developer-docs-product-carousel',
		$block_url . 'style.css',
		array(),
		JETPACK_DEVELOPER_DOCS_SITE_VERSION
	);
	wp_register_style(
		'jetpack-developer-docs-product-carousel-editor',
		$block_url . 'editor.css',
		array( 'jetpack-developer-docs-product-carousel' ),
		JETPACK_DEVELOPER_DOCS_SITE_VERSION
	);

	register_block_type(
		'jetpack-developer-docs/product-carousel',
		array(
			'api_version'     => 3,
			'editor_script'   => 'jetpack-developer-docs-product-carousel-editor',
			'editor_style'    => 'jetpack-developer-docs-product-carousel-editor',
			'render_callback' => 'jetpack_developer_docs_site_render_product_carousel',
			'attributes'      => array(
				'items'        => array(
					'type'    => 'array',
					'default' => jetpack_developer_docs_site_product_carousel_defaults(),
				),
				'ariaLabel'    => array(
					'type'    => 'string',
					'default' => 'Browse product documentation',
				),
				'speed'        => array(
					'type'    => 'number',
					'default' => 34,
				),
				'pauseOnHover' => array(
					'type'    => 'boolean',
					'default' => true,
				),
			),
			'supports'        => array(
				'align' => array( 'wide', 'full' ),
				'html'  => false,
			),
		)
	);
}
add_action( 'init', 'jetpack_developer_docs_site_register_product_carousel' );

/**
 * Register the site-specific interactive hero assets.
 */
function jetpack_developer_docs_site_register_interactive_hero() {
	$block_url = JETPACK_DEVELOPER_DOCS_SITE_URL . 'blocks/interactive-hero/';

	wp_register_style(
		'jetpack-developer-docs-interactive-hero',
		$block_url . 'style.css',
		array(),
		JETPACK_DEVELOPER_DOCS_SITE_VERSION
	);

	wp_register_script_module(
		'jetpack-developer-docs-interactive-hero',
		$block_url . 'view.js',
		array(),
		JETPACK_DEVELOPER_DOCS_SITE_VERSION
	);
}
add_action( 'init', 'jetpack_developer_docs_site_register_interactive_hero' );

/**
 * Replace the homepage hero image with an interactive light-compatible canvas.
 *
 * The original image remains in the markup as an accessible, no-JavaScript,
 * WebGL, and network-error fallback.
 *
 * @param string $block_content Rendered DocsPress hero markup.
 * @param array  $block         Parsed block data.
 * @return string
 */
function jetpack_developer_docs_site_render_interactive_hero( $block_content, $block ) {
	$attributes = isset( $block['attrs'] ) && is_array( $block['attrs'] ) ? $block['attrs'] : array();
	$title      = isset( $attributes['title'] ) ? sanitize_text_field( $attributes['title'] ) : '';

	if ( 'Build with Jetpack. Ship with confidence.' !== $title ) {
		return $block_content;
	}

	$figure = '<figure class="docspress-hero__media">';
	if ( false === strpos( $block_content, $figure ) ) {
		return $block_content;
	}

	$interactive_figure = '<figure class="docspress-hero__media jetpack-developer-docs-hero__visual" data-jp-docs-hero data-state="fallback">'
		. '<div class="jetpack-developer-docs-hero__canvas" data-jp-docs-hero-canvas aria-hidden="true"></div>'
		. '<span class="jetpack-developer-docs-hero__hint" aria-hidden="true">'
		. esc_html__( 'Drag a point', 'jetpack-developer-docs-site' )
		. '</span>';

	$block_content = str_replace( $figure, $interactive_figure, $block_content );
	$block_content = str_replace(
		'wp-block-docspress-hero',
		'wp-block-docspress-hero jetpack-developer-docs-hero',
		$block_content
	);

	wp_enqueue_style( 'jetpack-developer-docs-interactive-hero' );
	wp_enqueue_script_module( 'jetpack-developer-docs-interactive-hero' );

	return $block_content;
}
add_filter( 'render_block_docspress/hero', 'jetpack_developer_docs_site_render_interactive_hero', 10, 2 );
