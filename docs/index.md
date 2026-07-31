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
