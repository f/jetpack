---
title: Test Jetpack
description: Choose beta, automated, regression, or product-area testing for a Jetpack change.
audience: Jetpack contributors and testers
document_type: overview
sidebar_position: 40
sidebar_collapsed: true
---

Choose the smallest test set that proves the change, then expand for risk.

<!-- wp:docspress/audience-paths {"compact":true,"anchor":"choose-a-testing-path","eyebrow":"Choose a testing path","title":"What do you need to prove?","description":"Match the test scope to the change and risk, then record enough environment detail to reproduce the result.","paths":[{"title":"Run repository test suites","description":"Choose targeted automated tests, linters, and project checks for a code change.","url":"/developer-docs/contributors/quality/automated-testing/","cta":"Run automated tests","icon":"AUTO","accent":"blue","newTab":false},{"title":"Test a pre-release build","description":"Install and evaluate a Jetpack Beta build without contributing source code.","url":"/developer-docs/contributors/testing/beta-testing/","cta":"Join the beta program","icon":"BETA","accent":"gold","newTab":false},{"title":"Perform a regression pass","description":"Exercise global behavior and affected features before a release ships.","url":"/developer-docs/contributors/testing/regression/","cta":"Use the regression checklist","icon":"REG","accent":"coral","newTab":false},{"title":"Test a product area","description":"Run focused suites for a block, module, package, or shared integration.","url":"/developer-docs/contributors/testing/test-suites/","cta":"Choose a product suite","icon":"AREA","accent":"green","newTab":false},{"title":"Use Jetpack Beta tools","description":"Switch branches or builds, collect diagnostics, and use testing utilities effectively.","url":"/developer-docs/contributors/testing/beta-tools/","cta":"Open testing tips","icon":"TOOL","accent":"blue","newTab":false}],"compact":true,"columns":3,"tone":"paper","textAlign":"left","showNumbers":false} /-->

Record the build, WordPress version, PHP version, browser, connection state, environment, and exact steps for every manual result.

## Test by product

The [product documentation directory](../../products/index.md) maps each product to its owning plugin or package, build commands, focused tests, regression paths, canonical references, and support boundary. Start there when a product name spans multiple projects or when a historical module name differs from the current product.

<!-- wp:docspress/callout {"tone":"tip","title":"Product scope comes before command selection","content":"<p>Identify whether the change belongs to a standalone plugin, shared package, core Jetpack module, editor extension, or external repository. Then run the owning project's tests and expand coverage for shared dependencies and user-visible risk.</p>","collapsible":false} /-->
