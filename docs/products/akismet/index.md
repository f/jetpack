---
title: Akismet Anti-spam
description: Find the official Akismet API, SDK, plugin, integration, contribution, testing, and support sources.
product: akismet
product_group: security
audience: everyone
document_type: overview
sidebar_position: 20
sidebar_collapsed: true
---

Akismet Anti-spam detects unwanted submissions through an externally maintained service, plugin, API specification, and SDK. The Jetpack monorepo does not own Akismet's implementation, so this page provides a curated, source-aware route without copying external documentation.

<!-- wp:docspress/callout {"tone":"warning","title":"Akismet is externally owned","content":"<p>Do not send keys, site URLs, visitor data, comments, form submissions, or API payloads to an untrusted tool or example endpoint. Use the official Akismet documentation and repositories for current contracts.</p>","collapsible":false} /-->

<!-- wp:docspress/audience-paths {"compact":true,"eyebrow":"Akismet Anti-spam","title":"Choose your Akismet task","description":"Go directly to the source that owns setup, API behavior, SDK usage, contributions, or support.","paths":[{"title":"Use and administer","description":"Install, configure, monitor, and troubleshoot the WordPress plugin.","url":"https://akismet.com/support/","cta":"Open Akismet Support","icon":"SET","accent":"blue","newTab":true},{"title":"Build and integrate","description":"Use the official developer guide and API contract for non-WordPress or custom integrations.","url":"https://akismet.com/developers/","cta":"Open developer docs","icon":"DEV","accent":"gold","newTab":true},{"title":"Contribute and test","description":"Work in the owning API specification or SDK repository instead of this monorepo.","url":"#contribute-and-test","cta":"Review source paths","icon":"CODE","accent":"coral","newTab":false},{"title":"Reference","description":"Inspect the OpenAPI specification and supported PHP SDK.","url":"#reference","cta":"Open references","icon":"API","accent":"green","newTab":false},{"title":"Troubleshoot and support","description":"Use the official support path for keys, false positives, missed spam, and account questions.","url":"https://akismet.com/support/","cta":"Get Akismet help","icon":"FIX","accent":"blue","newTab":true}],"columns":3,"tone":"paper","textAlign":"left","showNumbers":false} /-->

## Use and administer

Use [Akismet Support](https://akismet.com/support/) for current WordPress plugin installation, API key connection, comment review, privacy, and troubleshooting procedures.

Before changing a production anti-spam configuration, record the current plugin version, key owner, expected traffic, integration points, and a rollback. Test custom integrations with non-sensitive fixtures.

## Build and integrate

Start with the [Akismet developer documentation](https://akismet.com/developers/). Treat the service contract as authoritative for:

- authentication and request endpoints;
- required site and submission context;
- comment or submission checking;
- reporting missed spam and false positives;
- response handling and retry behavior.

Avoid writing an integration from remembered parameter names. Confirm the current API specification, and never log full payloads containing visitor or submission data.

## Contribute and test

Akismet source does not live in this Jetpack checkout. Choose the owning repository:

<!-- wp:docspress/file-tree {"root":"github.com/Automattic/","tree":"akismet-api/\n  OpenAPI specification\nakismet-sdk-php/\n  PHP SDK source and tests\njetpack/\n  Jetpack product navigation only","caption":"API and SDK changes belong in their owning Akismet repositories. This Jetpack page maintains navigation and cross-product context."} /-->

For API changes, validate examples against the specification and use sanitized fixtures. For SDK changes, follow that repository's runtime matrix and test commands. A Jetpack changelog entry is not a substitute for the owning repository's release process.

## Reference

- [Akismet developer documentation](https://akismet.com/developers/)
- [Akismet API specification](https://github.com/Automattic/akismet-api)
- [Official Akismet PHP SDK](https://github.com/Automattic/akismet-sdk-php)
- [Akismet plugin on WordPress.org](https://wordpress.org/plugins/akismet/)

Forms that use Akismet protection remain documented under [Jetpack Forms](../forms/index.md). The form implementation owns submission behavior; Akismet owns the spam-classification contract.

## Troubleshoot and support

Classify the failure before changing code:

- Key or account problem: use Akismet Support.
- WordPress plugin configuration problem: record the plugin and WordPress versions and reproduce with a default theme and minimal plugins on staging.
- API integration problem: capture the endpoint, HTTP status, sanitized request shape, and response without keys or personal data.
- SDK defect: reproduce against the supported SDK version and report it in the owning repository.

Do not publish real spam samples, customer content, email addresses, IP addresses, or API keys in an issue.
