---
title: Jetpack Forms
description: Build, extend, test, and troubleshoot Jetpack forms, submissions, fields, and feedback data.
product: forms
product_group: platform
audience: everyone
document_type: overview
sidebar_position: 60
sidebar_collapsed: true
---

Jetpack Forms covers form blocks, fields, submission handling, feedback records, notifications, integrations, and dashboard experiences. Forms can also use Akismet protection, but Forms owns submission behavior while Akismet owns spam classification.

<!-- wp:docspress/callout {"tone":"warning","title":"Form submissions can contain sensitive data","content":"<p>Use synthetic submissions in development. Do not place real names, email addresses, messages, uploaded files, credentials, or webhook secrets in prompts, fixtures, screenshots, or public issues.</p>","collapsible":false} /-->

<!-- wp:docspress/audience-paths {"compact":true,"eyebrow":"Jetpack Forms","title":"Choose your Forms task","description":"Open the operational, integration, contribution, reference, or diagnostic path.","paths":[{"title":"Use and administer","description":"Create forms, manage responses, and follow current product guidance.","url":"https://jetpack.com/support/jetpack-blocks/contact-form/","cta":"Open Forms Support","icon":"SET","accent":"blue","newTab":true},{"title":"Build and integrate","description":"Work with blocks, fields, submission behavior, feedback data, hooks, and integrations.","url":"#build-and-integrate","cta":"Open developer path","icon":"DEV","accent":"gold","newTab":false},{"title":"Contribute and test","description":"Build the package and exercise block, submission, validation, and dashboard paths.","url":"#contribute-and-test","cta":"Open contributor path","icon":"CODE","accent":"coral","newTab":false},{"title":"Reference","description":"Inspect Forms package docs, source, hooks, and regression coverage.","url":"#reference","cta":"Open references","icon":"API","accent":"green","newTab":false},{"title":"Troubleshoot and support","description":"Separate editor, validation, submission, email, spam, integration, and storage problems.","url":"#troubleshoot-and-support","cta":"Troubleshoot Forms","icon":"FIX","accent":"blue","newTab":false}],"columns":3,"tone":"paper","textAlign":"left","showNumbers":false} /-->

## Use and administer

Use [Jetpack Form documentation](https://jetpack.com/support/jetpack-blocks/contact-form/) for current block setup, fields, notifications, responses, integrations, and support procedures.

## Build and integrate

<!-- wp:docspress/file-tree {"root":"jetpack/","tree":"projects/\n  packages/\n    forms/\n      docs/\n      src/\n        blocks/\n        contact-form/\n        dashboard/\n        store/\n  plugins/\n    jetpack/\n      extensions/\n        blocks/\n          contact-form/","caption":"The Forms package owns shared form behavior; the core plugin keeps integration and compatibility surfaces."} /-->

Use documented hooks, block attributes, and package APIs. Treat feedback database details, private service routes, generated bundles, and dashboard DOM structure as implementation details.

## Contribute and test

<!-- wp:docspress/terminal-session {"title":"Build and test Jetpack Forms","shell":"bash","prompt":"$","command":"jp build packages/forms --deps\njp test php packages/forms\njp test js packages/forms\njp phan packages/forms","output":""} /-->

Use the [Contact Form regression suite](../../testing/regression-checklist/test-suites/extensions/blocks/contact-form.md). Cover editor creation, required-field validation, submission success and failure, spam state, notification behavior, response storage, integrations, accessibility, and responsive layouts affected by the change.

## Reference

- [Forms package source](https://github.com/Automattic/jetpack/tree/trunk/projects/packages/forms)
- [Forms package documentation](https://github.com/Automattic/jetpack/tree/trunk/projects/packages/forms/docs)
- [Contact Form regression checklist](../../testing/regression-checklist/test-suites/extensions/blocks/contact-form.md)
- [Hooks and filters](../../developers/hooks-and-filters.md)
- [Akismet Anti-spam](../akismet/index.md)

## Troubleshoot and support

Record the WordPress and Jetpack versions, form block and fields, validation state, submission time, expected result, actual result, notification destination in private support only, integrations, spam state, and sanitized evidence.

Use [Forms Support](https://jetpack.com/support/jetpack-blocks/contact-form/) for site-specific submissions or notifications. Use the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) for a reproducible source defect.
