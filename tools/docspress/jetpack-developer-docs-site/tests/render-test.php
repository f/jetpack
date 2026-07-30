<?php
/**
 * Minimal server-side rendering tests without bootstrapping WordPress.
 *
 * @phan-file-suppress PhanRedefineFunction
 *
 * @package JetpackDeveloperDocsSite
 */

// phpcs:disable -- Standalone WordPress stubs intentionally use Core function names.

define( 'ABSPATH', __DIR__ );

$registered_scripts = array();
$registered_styles  = array();
$registered_blocks  = array();
$enqueued_scripts   = array();
$enqueued_styles    = array();
$inline_scripts     = array();
$actions            = array();
$unique_id          = 0;

function plugin_dir_path( $file ) {
	return trailingslashit( dirname( $file ) );
}

function plugin_dir_url( $file ) {
	return 'https://example.test/wp-content/plugins/' . basename( dirname( $file ) ) . '/';
}

function trailingslashit( $value ) {
	return rtrim( $value, '/\\' ) . '/';
}

function sanitize_text_field( $value ) {
	return trim( strip_tags( (string) $value ) );
}

function esc_url_raw( $value ) {
	$value = trim( (string) $value );
	if ( preg_match( '/^(?:https?:\\/\\/|\\/)/', $value ) ) {
		return $value;
	}
	return '';
}

function esc_url( $value ) {
	return htmlspecialchars( esc_url_raw( $value ), ENT_QUOTES, 'UTF-8' );
}

function esc_attr( $value ) {
	return htmlspecialchars( (string) $value, ENT_QUOTES, 'UTF-8' );
}

function esc_html( $value ) {
	return htmlspecialchars( (string) $value, ENT_QUOTES, 'UTF-8' );
}

function absint( $value ) {
	return abs( (int) $value );
}

function __( $value ) {
	return $value;
}

function wp_unique_id( $prefix = '' ) {
	global $unique_id;
	++$unique_id;
	return $prefix . $unique_id;
}

function wp_json_encode( $value, $flags = 0 ) {
	return json_encode( $value, $flags );
}

function add_action( $hook, $callback ) {
	global $actions;
	$actions[ $hook ][] = $callback;
}

function wp_register_script( $handle, $source, $dependencies, $version, $in_footer ) {
	global $registered_scripts;
	$registered_scripts[ $handle ] = compact( 'source', 'dependencies', 'version', 'in_footer' );
}

function wp_register_style( $handle, $source, $dependencies, $version ) {
	global $registered_styles;
	$registered_styles[ $handle ] = compact( 'source', 'dependencies', 'version' );
}

function wp_add_inline_script( $handle, $data, $position ) {
	global $inline_scripts;
	$inline_scripts[ $handle ] = compact( 'data', 'position' );
}

function register_block_type( $name, $arguments ) {
	global $registered_blocks;
	$registered_blocks[ $name ] = $arguments;
}

function wp_enqueue_script( $handle ) {
	global $enqueued_scripts;
	$enqueued_scripts[] = $handle;
}

function wp_enqueue_style( $handle ) {
	global $enqueued_styles;
	$enqueued_styles[] = $handle;
}

function get_block_wrapper_attributes( $attributes ) {
	$classes = 'wp-block-jetpack-developer-docs-product-carousel alignfull';
	if ( isset( $attributes['class'] ) ) {
		$classes .= ' ' . $attributes['class'];
		unset( $attributes['class'] );
	}
	$output = array( 'class="' . esc_attr( $classes ) . '"' );
	foreach ( $attributes as $key => $value ) {
		$output[] = esc_attr( $key ) . '="' . esc_attr( $value ) . '"';
	}
	return implode( ' ', $output );
}

function assert_true( $condition, $message ) {
	if ( ! $condition ) {
		fwrite( STDERR, "FAIL: {$message}\n" );
		exit( 1 );
	}
}

require dirname( __DIR__ ) . '/jetpack-developer-docs-site.php';

if ( 'cli-server' === PHP_SAPI ) {
	jetpack_developer_docs_site_register_product_carousel();
	$preview_carousel = jetpack_developer_docs_site_render_product_carousel( array() );
	?>
	<!doctype html>
	<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Jetpack Developer Docs carousel preview</title>
		<link rel="stylesheet" href="../blocks/product-carousel/style.css">
		<style>
			:root {
				--dp-green: #069e08;
				--dp-ink: #171a22;
				--dp-copy: #3d4348;
				--dp-line: #d8e5ee;
				--dp-paper: #fff;
				--dp-canvas: #f5faff;
				--wp--preset--font-family--heading: "EB Garamond", Georgia, serif;
			}

			* {
				box-sizing: border-box;
			}

			body {
				margin: 0;
				background: var(--dp-paper);
				color: var(--dp-ink);
				font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
			}

			.screen-reader-text {
				position: absolute;
				width: 1px;
				height: 1px;
				overflow: hidden;
				clip: rect(0, 0, 0, 0);
			}

			.preview-hero {
				display: grid;
				min-height: min(72vh, 690px);
				padding: clamp(3rem, 8vw, 7rem) max(5vw, 1.5rem);
				place-content: center start;
				background:
					linear-gradient(var(--dp-line) 1px, transparent 1px),
					linear-gradient(90deg, var(--dp-line) 1px, transparent 1px),
					var(--dp-paper);
				background-size: 42px 42px;
			}

			.preview-eyebrow {
				margin: 0 0 1rem;
				color: var(--dp-green);
				font-size: 0.78rem;
				font-weight: 700;
				letter-spacing: 0.16em;
				text-transform: uppercase;
			}

			h1 {
				max-width: 12ch;
				margin: 0;
				font-family: var(--wp--preset--font-family--heading);
				font-size: clamp(4rem, 11vw, 9rem);
				letter-spacing: -0.065em;
				line-height: 0.82;
			}

			.preview-intro {
				max-width: 42rem;
				margin: 1.75rem 0 0;
				color: var(--dp-copy);
				font-size: clamp(1rem, 2vw, 1.3rem);
				line-height: 1.55;
			}

			.preview-after {
				min-height: 100rem;
				padding: clamp(3rem, 7vw, 6rem) max(5vw, 1.5rem);
				background: var(--dp-canvas);
			}

			.preview-after h2 {
				max-width: 20ch;
				margin: 0;
				font-family: var(--wp--preset--font-family--heading);
				font-size: clamp(2.5rem, 5vw, 4.5rem);
				line-height: 0.95;
			}

			@media (prefers-color-scheme: dark) {
				:root {
					--dp-green: #8be28d;
					--dp-ink: #fefefe;
					--dp-copy: #dce6ed;
					--dp-line: #293842;
					--dp-paper: #15191d;
					--dp-canvas: #0c1217;
					color-scheme: dark;
				}
			}
		</style>
	</head>
	<body>
		<main>
			<section class="preview-hero">
				<p class="preview-eyebrow">Jetpack Developer Docs</p>
				<h1>Build with Jetpack.</h1>
				<p class="preview-intro">Hooks, customization guides, and contribution docs for the Jetpack plugin suite.</p>
			</section>
			<?php echo $preview_carousel; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			<section class="preview-after">
				<p class="preview-eyebrow">Start here</p>
				<h2>Choose your way into Jetpack.</h2>
			</section>
		</main>
		<?php if ( isset( $_GET['reduced'] ) ) : ?>
			<script>
				window.matchMedia = function () {
					return {
						matches: true,
						addEventListener: function () {},
						addListener: function () {}
					};
				};
			</script>
		<?php endif; ?>
		<?php if ( ! isset( $_GET['nojs'] ) ) : ?>
			<script src="../blocks/product-carousel/utils.js"></script>
			<script src="../blocks/product-carousel/view.js"></script>
		<?php endif; ?>
	</body>
	</html>
	<?php
	exit;
}

assert_true( isset( $actions['init'] ), 'The block registration callback must be attached to init.' );
jetpack_developer_docs_site_register_product_carousel();

$block_name = 'jetpack-developer-docs/product-carousel';
assert_true( isset( $registered_blocks[ $block_name ] ), 'The site-specific product carousel must be registered.' );
assert_true( count( jetpack_developer_docs_site_product_carousel_defaults() ) === 13, 'There must be 13 default products.' );
assert_true( empty( $enqueued_scripts ) && empty( $enqueued_styles ), 'Registration must not enqueue front-end assets.' );

$empty_render = jetpack_developer_docs_site_render_product_carousel( array( 'items' => array() ) );
assert_true( $empty_render === '', 'An empty carousel must not render.' );
assert_true( empty( $enqueued_scripts ) && empty( $enqueued_styles ), 'An empty carousel must not enqueue assets.' );

$rendered = jetpack_developer_docs_site_render_product_carousel(
	array(
		'items'        => array(
			array(
				'label' => 'Fish & <b>Chips</b>',
				'url'   => '/developer-docs/products/jetpack/?q="safe"',
			),
			array(
				'label' => '<script>Unsafe</script>',
				'url'   => 'javascript:alert(1)',
			),
		),
		'ariaLabel'    => '<b>Browse safely</b>',
		'speed'        => 200,
		'pauseOnHover' => false,
	)
);

assert_true( strpos( $rendered, 'Fish &amp; Chips' ) !== false, 'Product labels must be escaped.' );
assert_true( strpos( $rendered, 'q=&quot;safe&quot;' ) !== false, 'Product URLs must be escaped.' );
assert_true( strpos( $rendered, '<script>' ) === false, 'Unsafe markup must not render.' );
assert_true( strpos( $rendered, 'javascript:' ) === false, 'Unsafe URLs must not render.' );
assert_true( strpos( $rendered, 'data-speed="90"' ) !== false, 'Speed must be clamped.' );
assert_true( strpos( $rendered, 'data-pause-on-hover="false"' ) !== false, 'Pause preference must render.' );
assert_true( strpos( $rendered, 'Browse safely' ) !== false, 'The accessible section name must be present.' );
assert_true(
	in_array( 'jetpack-developer-docs-product-carousel', $enqueued_scripts, true ) &&
	in_array( 'jetpack-developer-docs-product-carousel', $enqueued_styles, true ),
	'Front-end assets must enqueue when the block renders.'
);

$default_render = jetpack_developer_docs_site_render_product_carousel( array() );
assert_true(
	substr_count( $default_render, 'class="jetpack-developer-docs-product-carousel__link"' ) === 13,
	'The no-JavaScript fallback must include all 13 links.'
);
assert_true(
	strpos( $default_render, '/developer-docs/products/akismet/' ) !== false,
	'The default render must include product destinations.'
);

echo "Server-side carousel rendering tests passed.\n";
