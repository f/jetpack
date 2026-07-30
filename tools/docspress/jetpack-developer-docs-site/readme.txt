=== Jetpack Developer Docs Site ===
Contributors: automattic
Requires at least: 6.6
Requires PHP: 7.2
Stable tag: 0.1.1
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Site-specific presentation blocks for the Jetpack Developer Docs website.

== Description ==

This adapter is intentionally scoped to the mapped Jetpack Developer Docs
WordPress site. It is not a Jetpack product and must not be distributed as a
general DocsPress feature.

The plugin registers the dynamic
`jetpack-developer-docs/product-carousel` block. Its front-end assets are
enqueued only when that block renders.

== Installation ==

1. Run `./package.sh` from this directory.
2. Install the generated ZIP only on the Jetpack Developer Docs site.
3. Activate the plugin before synchronizing content containing the block.

== Changelog ==

= 0.1.1 =
* Make the carousel span the viewport from a constrained homepage layout.

= 0.1.0 =
* Add the site-only product documentation carousel.
