---
title: Jetpack AI Assistant
description: Navigate Jetpack AI Assistant usage, editor integration, client source, testing, safety, and support.
product: ai
product_group: platform
audience: everyone
document_type: overview
sidebar_position: 130
sidebar_collapsed: true
---

Jetpack AI Assistant provides AI-powered editing experiences through the core plugin and a shared JavaScript client. Product behavior spans editor UI, request handling, account state, service availability, and generated content review.

<!-- wp:docspress/callout {"tone":"warning","title":"Remove sensitive context before sending a prompt","content":"<p>Do not submit credentials, private customer data, unpublished confidential material, medical or financial records, or production logs containing identifiers. Review generated text and code before publishing or executing it.</p>","collapsible":false} /-->

<!-- wp:docspress/audience-paths {"compact":true,"eyebrow":"Jetpack AI Assistant","title":"Choose your AI Assistant task","description":"Open the operational, integration, contribution, reference, or diagnostic path.","paths":[{"title":"Use and administer","description":"Use AI Assistant and follow current product behavior and support guidance.","url":"https://jetpack.com/support/jetpack-ai/","cta":"Open AI Support","icon":"SET","accent":"blue","newTab":true},{"title":"Build and integrate","description":"Understand the AI client, editor plugin, request, state, and content boundaries.","url":"#build-and-integrate","cta":"Open developer path","icon":"DEV","accent":"gold","newTab":false},{"title":"Contribute and test","description":"Build the affected JavaScript projects and test safe editor workflows.","url":"#contribute-and-test","cta":"Open contributor path","icon":"CODE","accent":"coral","newTab":false},{"title":"Reference","description":"Inspect the AI client and core-plugin editor integration source.","url":"#reference","cta":"Open references","icon":"API","accent":"green","newTab":false},{"title":"Troubleshoot and support","description":"Separate editor, account, request, service, browser, and content problems.","url":"#troubleshoot-and-support","cta":"Troubleshoot AI","icon":"FIX","accent":"blue","newTab":false}],"columns":3,"tone":"paper","textAlign":"left","showNumbers":false} /-->

## Use and administer

Use [Jetpack AI documentation](https://jetpack.com/support/jetpack-ai/) for current availability, editor workflows, account behavior, usage guidance, and support.

Generated content is a draft, not an authority. Verify facts, links, code, tone, attribution, permissions, and safety before publishing.

## Build and integrate

<!-- wp:docspress/file-tree {"root":"jetpack/","tree":"projects/\n  js-packages/\n    ai-client/\n      src/\n  plugins/\n    jetpack/\n      extensions/\n        plugins/\n          ai-assistant-plugin/","caption":"The shared AI client owns reusable request and interface behavior; the Jetpack editor plugin owns its product integration."} /-->

Do not depend on private service endpoints, request tokens, undocumented model identifiers, experimental flags, or editor DOM structure as public contracts.

## Contribute and test

<!-- wp:docspress/terminal-session {"title":"Run AI client and editor checks","shell":"bash","prompt":"$","command":"jp test js js-packages/ai-client\njp build plugins/jetpack --deps\njp test js plugins/jetpack","output":""} /-->

Use non-sensitive prompts and deterministic mocks where possible. Test loading, success, empty, cancellation, retry, unavailable-service, account, permission, and editor recovery states affected by the change.

## Reference

- [AI client source](https://github.com/Automattic/jetpack/tree/trunk/projects/js-packages/ai-client)
- [AI Assistant editor integration](https://github.com/Automattic/jetpack/tree/trunk/projects/plugins/jetpack/extensions/plugins/ai-assistant-plugin)
- [Blocks and editor integrations](../../developers/blocks-and-editor.md)
- [Use Jetpack documentation with AI](../../reference/use-docs-with-ai.md)

## Troubleshoot and support

Record the WordPress, Jetpack, and browser versions; editor; account and connection state; action; sanitized prompt shape; expected result; actual result; and sanitized console/network evidence. Never include complete private prompts or generated confidential content in a public report.

Use [AI Support](https://jetpack.com/support/jetpack-ai/) for account, availability, and site-specific issues. Use the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) for reproducible client or editor defects.
