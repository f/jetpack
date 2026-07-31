---
title: Jetpack Developer Docs
description: Hooks, customization guides, contribution docs, and developer resources for the Jetpack plugin suite.
audience: everyone
document_type: overview
sidebar_position: 0
sidebar_collapsed: false
---

<!-- wp:docspress/hero {"eyebrow":"Source-aware Jetpack documentation","title":"Build with Jetpack. Ship with confidence.","description":"Choose a role, move straight to the task, and keep every decision grounded in the code that ships.","primaryLabel":"Choose your path","primaryUrl":"#start","primaryNewTab":false,"secondaryLabel":"Start contributing","secondaryUrl":"/developer-docs/contributors/getting-started/quick-start/","secondaryNewTab":false,"mediaUrl":"https://raw.githubusercontent.com/f/jetpack/3d5d563aa4efe0e6a84051747f95c1d24271ad9b/docs/assets/jetpack-developer-blueprint-light.png","mediaAlt":"Jetpack logo reconstructed as a technical blueprint with construction lines, angles, and dimensions.","mediaWidth":46,"imageScale":100} /-->

<!-- wp:jetpack-developer-docs/product-carousel {"align":"full","ariaLabel":"Browse product documentation","speed":34,"pauseOnHover":true,"items":[{"label":"Jetpack","url":"/developer-docs/products/jetpack/"},{"label":"Akismet Anti-spam","url":"/developer-docs/products/akismet/"},{"label":"VaultPress Backup","url":"/developer-docs/products/backup/"},{"label":"Jetpack Boost","url":"/developer-docs/products/boost/"},{"label":"Jetpack CRM","url":"/developer-docs/products/crm/"},{"label":"Jetpack Forms","url":"/developer-docs/products/forms/"},{"label":"Jetpack Protect","url":"/developer-docs/products/protect/"},{"label":"Jetpack Scan","url":"/developer-docs/products/scan/"},{"label":"Jetpack Search","url":"/developer-docs/products/search/"},{"label":"Jetpack Social","url":"/developer-docs/products/social/"},{"label":"Jetpack Stats","url":"/developer-docs/products/stats/"},{"label":"Jetpack VideoPress","url":"/developer-docs/products/videopress/"},{"label":"Jetpack AI Assistant","url":"/developer-docs/products/ai/"}]} /-->

<!-- wp:group {"align":"wide","anchor":"start","className":"jp-home-section jp-home-start","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide jp-home-section jp-home-start" id="start"><!-- wp:docspress/audience-paths {"align":"wide","eyebrow":"Start here","title":"Choose your way into Jetpack","description":"Go straight to the reference, development setup, or workflow that matches the work in front of you.","paths":[{"title":"Actions & filters","description":"Find supported hooks and copy practical PHP examples for forms, Search, Related Posts, and more.","url":"/developer-docs/wordpress-developers/hooks-and-filters/","cta":"Browse hooks","icon":"{ }","accent":"green","newTab":false},{"title":"Build an integration","description":"Choose the right extension point across blocks, REST endpoints, connection data, plugins, and themes.","url":"/developer-docs/wordpress-developers/choose-an-integration/","cta":"Choose an integration","icon":"DEV","accent":"blue","newTab":false},{"title":"Developer environment","description":"Clone the monorepo, install dependencies, start WordPress locally, and verify your first build.","url":"/developer-docs/contributors/getting-started/development-environment/","cta":"Set up locally","icon":"CLI","accent":"gold","newTab":false}],"columns":3,"tone":"paper","textAlign":"left","showNumbers":false} /--></div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","anchor":"hooks","className":"jp-home-band jp-home-hooks","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull jp-home-band jp-home-hooks" id="hooks"><!-- wp:columns {"align":"wide","className":"jp-home-hooks__grid","verticalAlignment":"center"} -->
<div class="wp-block-columns alignwide are-vertically-aligned-center jp-home-hooks__grid"><!-- wp:column {"verticalAlignment":"center","width":"48%"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:48%"><!-- wp:paragraph {"className":"jp-home-eyebrow"} -->
<p class="jp-home-eyebrow">Hooks reference</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Customize Jetpack without fighting the product.</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Use documented actions and filters to change behavior while keeping updates, compatibility, and future contributors in mind.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"className":"jp-hook-chips"} -->
<div class="wp-block-buttons jp-hook-chips"><!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="/developer-docs/products/forms/">Forms</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="/developer-docs/products/search/">Search</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="/developer-docs/wordpress-developers/hooks-and-filters/">Related Posts</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="/developer-docs/wordpress-developers/hooks-and-filters/">All hooks</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center","width":"52%"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:52%"><!-- wp:docspress/colorful-code {"language":"php","filename":"functions.php","code":"// Change the Related Posts headline.\nadd_filter(\n    'jetpack_relatedposts_filter_headline',\n    fn() => '\u003ch3\u003eMore to read\u003c/h3\u003e'\n);","highlightedLines":"2-5","showLineNumbers":true,"caption":"A focused change through a documented Jetpack filter."} /--></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"wide","anchor":"guides","className":"jp-home-section jp-home-guides","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide jp-home-section jp-home-guides" id="guides"><!-- wp:docspress/audience-paths {"align":"wide","compact":true,"eyebrow":"Customization guides","title":"Build the integration you actually need","description":"Focused paths for extending Jetpack from a plugin, theme, block, REST client, or connected application.","paths":[{"title":"Hooks & filters","description":"Change documented behavior with practical PHP examples.","url":"/developer-docs/wordpress-developers/hooks-and-filters/","cta":"Open guide","icon":"PHP","accent":"green","newTab":false},{"title":"Blocks & editor","description":"Extend Jetpack blocks and editor behavior safely.","url":"/developer-docs/wordpress-developers/blocks-and-editor/","cta":"Open guide","icon":"WP","accent":"blue","newTab":false},{"title":"REST API","description":"Work with WordPress.com and Jetpack REST endpoints.","url":"/developer-docs/wordpress-developers/rest-api/","cta":"Open guide","icon":"API","accent":"gold","newTab":false},{"title":"Connection & data","description":"Understand the connection layer and data flow.","url":"/developer-docs/wordpress-developers/connection-and-data/","cta":"Open guide","icon":"SYNC","accent":"coral","newTab":false},{"title":"Choose an integration","description":"Match the outcome to the supported extension point.","url":"/developer-docs/wordpress-developers/choose-an-integration/","cta":"Choose a path","icon":"DEV","accent":"green","newTab":false},{"title":"Test an integration","description":"Verify compatibility before shipping to production.","url":"/developer-docs/wordpress-developers/test-an-integration/","cta":"Plan tests","icon":"QA","accent":"blue","newTab":false}],"columns":2,"tone":"paper","textAlign":"left","showNumbers":false} /--></div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","anchor":"contribute","className":"jp-home-band jp-home-contribute","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull jp-home-band jp-home-contribute" id="contribute"><!-- wp:group {"align":"wide","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide"><!-- wp:docspress/audience-paths {"align":"wide","compact":true,"eyebrow":"Contribute to Jetpack","title":"From local setup to a shipped change","description":"The monorepo workflow, source conventions, quality checks, and release paths used by Jetpack contributors.","paths":[{"title":"Developer environment","description":"Install dependencies and run Jetpack locally.","url":"/developer-docs/contributors/getting-started/development-environment/","cta":"Set up","icon":"01","accent":"green","newTab":false},{"title":"Monorepo overview","description":"Understand projects, packages, tools, and ownership.","url":"/developer-docs/contributors/monorepo/","cta":"Tour the repo","icon":"02","accent":"green","newTab":false},{"title":"Testing","description":"Choose the right PHP, JavaScript, beta, or regression test.","url":"/developer-docs/contributors/testing/","cta":"Choose tests","icon":"03","accent":"green","newTab":false},{"title":"Contribution workflow","description":"Make a focused change and prepare a reviewable pull request.","url":"/developer-docs/contributors/workflow/","cta":"Follow the workflow","icon":"04","accent":"green","newTab":false}],"columns":2,"tone":"paper","textAlign":"left","showNumbers":false} /--></div>
<!-- /wp:group --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"wide","anchor":"tools","className":"jp-home-section jp-home-tools","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide jp-home-section jp-home-tools" id="tools"><!-- wp:docspress/audience-paths {"align":"wide","compact":true,"eyebrow":"Developer tools","title":"Inspect, test, and troubleshoot Jetpack","description":"Use the same supporting tools the project relies on for UI development, beta testing, debugging, and API exploration.","paths":[{"title":"Jetpack Storybook","description":"Explore UI components and interaction states in isolation.","url":"https://automattic.github.io/jetpack-storybook/","cta":"Open Storybook","icon":"UI","accent":"coral","newTab":true},{"title":"Jetpack Beta Tester","description":"Install development builds and test changes on a WordPress site.","url":"https://jetpack.com/support/beta/","cta":"Get the tester","icon":"β","accent":"green","newTab":true},{"title":"Debug Helper","description":"Inspect Jetpack state and disable modules while troubleshooting.","url":"https://github.com/Automattic/jetpack-debug-helper","cta":"View on GitHub","icon":"FIX","accent":"gold","newTab":true},{"title":"Support & tools","description":"Find diagnostics, status pages, repositories, and escalation paths.","url":"/developer-docs/reference/support-and-tools/","cta":"Open the toolbox","icon":"→","accent":"blue","newTab":false}],"columns":2,"tone":"paper","textAlign":"left","showNumbers":false} /--></div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","anchor":"wordpress","className":"jp-home-band jp-home-wordpress","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull jp-home-band jp-home-wordpress" id="wordpress"><!-- wp:group {"align":"wide","className":"jp-home-resource-links","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide jp-home-resource-links"><!-- wp:paragraph {"className":"jp-home-eyebrow"} -->
<p class="jp-home-eyebrow">WordPress developer resources</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Keep the platform source of truth close.</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Jetpack builds on WordPress. These handbooks and repositories explain the APIs, standards, editor concepts, and platform behavior underneath every integration.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"className":"jp-resource-columns"} -->
<div class="wp-block-columns jp-resource-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:list -->
<ul class="wp-block-list"><li><a href="https://developer.wordpress.org/block-editor/" target="_blank" rel="noreferrer noopener">Block Editor Handbook ↗</a></li><li><a href="https://developer.wordpress.org/plugins/" target="_blank" rel="noreferrer noopener">Plugin Handbook ↗</a></li><li><a href="https://developer.wordpress.org/themes/" target="_blank" rel="noreferrer noopener">Theme Handbook ↗</a></li><li><a href="https://developer.wordpress.org/rest-api/" target="_blank" rel="noreferrer noopener">REST API Handbook ↗</a></li></ul>
<!-- /wp:list --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:list -->
<ul class="wp-block-list"><li><a href="https://developer.wordpress.org/coding-standards/" target="_blank" rel="noreferrer noopener">Coding Standards Handbook ↗</a></li><li><a href="https://developer.wordpress.org/apis/" target="_blank" rel="noreferrer noopener">Common APIs Handbook ↗</a></li><li><a href="https://github.com/WordPress/wordpress-develop" target="_blank" rel="noreferrer noopener">WordPress on GitHub ↗</a></li><li><a href="https://github.com/WordPress/gutenberg" target="_blank" rel="noreferrer noopener">Gutenberg on GitHub ↗</a></li></ul>
<!-- /wp:list --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"wide","anchor":"blog","className":"jp-home-section jp-home-blog","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide jp-home-section jp-home-blog" id="blog"><!-- wp:group {"className":"jp-home-section-heading","layout":{"type":"flex","flexWrap":"wrap","justifyContent":"space-between","verticalAlignment":"bottom"}} -->
<div class="wp-block-group jp-home-section-heading"><!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:paragraph {"className":"jp-home-eyebrow"} -->
<p class="jp-home-eyebrow">From Jetpack.com</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Latest developer posts</h2>
<!-- /wp:heading --></div>
<!-- /wp:group -->

<!-- wp:paragraph {"className":"jp-home-section-link"} -->
<p class="jp-home-section-link"><a href="https://jetpack.com/resources/category/developers/" target="_blank" rel="noreferrer noopener">View all developer resources ↗</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:query {"queryId":42,"query":{"perPage":4,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false,"taxQuery":{"category":[1359]},"parents":[],"format":[]},"displayLayout":{"type":"flex","columns":4},"align":"wide","className":"jp-home-posts-query"} -->
<div class="wp-block-query alignwide jp-home-posts-query"><!-- wp:post-template {"layout":{"type":"grid","columnCount":4}} -->
<!-- wp:post-featured-image {"isLink":true,"aspectRatio":"16/10","className":"jp-post-card__image"} /-->

<!-- wp:post-date {"format":"M j, Y","className":"jp-post-card__date"} /-->

<!-- wp:post-title {"isLink":true,"level":3,"className":"jp-post-card__title"} /-->

<!-- wp:post-excerpt {"moreText":"","excerptLength":18,"className":"jp-post-card__excerpt"} /-->
<!-- /wp:post-template -->

<!-- wp:query-no-results -->
<!-- wp:paragraph -->
<p>Developer resources are being prepared. Check back soon.</p>
<!-- /wp:paragraph -->
<!-- /wp:query-no-results --></div>
<!-- /wp:query --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","anchor":"agents","className":"jp-home-band jp-home-agents","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull jp-home-band jp-home-agents" id="agents"><!-- wp:columns {"align":"wide","className":"jp-home-agents__grid","verticalAlignment":"center"} -->
<div class="wp-block-columns alignwide are-vertically-aligned-center jp-home-agents__grid"><!-- wp:column {"verticalAlignment":"center","width":"48%"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:48%"><!-- wp:paragraph {"className":"jp-home-eyebrow"} -->
<p class="jp-home-eyebrow">Agent-friendly by design</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Built to be read by machines, too.</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The same source-aware docs that help people navigate Jetpack are published in a compact format for coding agents.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button {"className":"jp-button-agent"} -->
<div class="wp-block-button jp-button-agent"><a class="wp-block-button__link wp-element-button" href="/llms.txt">Open llms.txt</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center","width":"52%"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:52%"><!-- wp:docspress/prompt {"prompt":"Read https://developer.jetpack.com/llms.txt before answering. Then cite the Jetpack documentation and source files you use.","model":"Any coding agent","mode":"agent","thinking":true,"context":"llms.txt, Jetpack monorepo","caption":"A reliable first instruction for Jetpack development work."} /-->

<!-- wp:list {"className":"jp-agent-checklist"} -->
<ul class="wp-block-list jp-agent-checklist"><li>Read <code>llms.txt</code> before answering Jetpack development questions.</li><li>Treat the monorepo as the source of truth for behavior that may have changed.</li><li>Cite the documentation pages and source files used.</li><li>Prefer documented hooks and extension points over brittle overrides.</li><li>Ask before making changes to a production site.</li></ul>
<!-- /wp:list --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->
