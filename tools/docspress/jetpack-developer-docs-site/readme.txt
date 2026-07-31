=== Jetpack Developer Docs Site ===
Contributors: automattic
Requires at least: 6.6
Requires PHP: 7.2
Stable tag: 0.1.6
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

It also progressively enhances the mapped homepage hero with an interactive
technical drawing. The published image remains available as a no-JavaScript,
WebGL, and network-error fallback.

== Installation ==

1. Run `./package.sh` from this directory.
2. Install the generated ZIP only on the Jetpack Developer Docs site.
3. Activate the plugin before synchronizing content containing the block.

== Changelog ==

= 0.1.6 =
* Remove the theme overlay that drew lines across the homepage hero.
* Preserve the intended aspect ratio of technical annotation labels.

= 0.1.5 =
* Remove the separator below the interactive homepage hero.

= 0.1.4 =
* Add a light-compatible interactive homepage blueprint with elastic points.

= 0.1.3 =
* Format the adapter scripts for the Jetpack monorepo JavaScript checks.

= 0.1.2 =
* Keep the adapter compatible with the monorepo static-analysis checks.

= 0.1.1 =
* Make the carousel span the viewport from a constrained homepage layout.

= 0.1.0 =
* Add the site-only product documentation carousel.
