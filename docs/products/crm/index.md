---
title: Jetpack CRM
description: Find Jetpack CRM operation, source, API documentation, examples, contribution, testing, and support.
product: crm
product_group: growth
audience: everyone
document_type: overview
sidebar_position: 50
sidebar_collapsed: true
---

Jetpack CRM manages contacts, customer workflows, and related business records. Its source and developer documentation are maintained outside the Jetpack monorepo, so this hub provides a stable route to the owning repositories and knowledge base.

<!-- wp:docspress/callout {"tone":"warning","title":"CRM data is customer data","content":"<p>Do not place real contacts, invoices, email content, credentials, access tokens, or exports in prompts, screenshots, fixtures, or public issues. Use synthetic records when developing and testing.</p>","collapsible":false} /-->

<!-- wp:docspress/audience-paths {"compact":true,"eyebrow":"Jetpack CRM","title":"Choose your CRM task","description":"Open the owning knowledge base, API docs, source repository, examples, or support path.","paths":[{"title":"Use and administer","description":"Configure and operate CRM workflows using the maintained knowledge base.","url":"https://kb.jetpackcrm.com/","cta":"Open CRM knowledge base","icon":"SET","accent":"blue","newTab":true},{"title":"Build and integrate","description":"Use the owning API documentation and public code examples.","url":"https://github.com/Automattic/jetpack-crm-api-docs","cta":"Open CRM API docs","icon":"DEV","accent":"gold","newTab":true},{"title":"Contribute and test","description":"Work in the Jetpack CRM repository and follow its project-specific workflow.","url":"https://github.com/Automattic/jetpack-crm","cta":"Open CRM source","icon":"CODE","accent":"coral","newTab":true},{"title":"Reference","description":"Compare API documentation with maintained integration examples.","url":"#reference","cta":"Open references","icon":"API","accent":"green","newTab":false},{"title":"Troubleshoot and support","description":"Use the knowledge base and owning product support for site-specific data or configuration.","url":"https://kb.jetpackcrm.com/","cta":"Get CRM help","icon":"FIX","accent":"blue","newTab":true}],"columns":3,"tone":"paper","textAlign":"left","showNumbers":false} /-->

## Use and administer

Use the [Jetpack CRM knowledge base](https://kb.jetpackcrm.com/) for current setup, contacts, companies, quotes, invoices, extensions, email, and operational support.

## Build and integrate

Start with the [Jetpack CRM API documentation](https://github.com/Automattic/jetpack-crm-api-docs), then review the [code examples](https://github.com/Automattic/jetpack-crm-code-examples). Confirm authentication, permissions, record ownership, pagination, and error behavior before integrating.

Do not infer a public API from database tables, admin requests, generated JavaScript, or UI markup.

## Contribute and test

Jetpack CRM does not live in this monorepo:

<!-- wp:docspress/file-tree {"root":"github.com/Automattic/","tree":"jetpack-crm/\n  CRM source and project tests\njetpack-crm-api-docs/\n  API documentation\njetpack-crm-code-examples/\n  Public integration examples\njetpack/\n  Product navigation only","caption":"Submit implementation and API changes to the repository that owns them. This Jetpack page maintains cross-product discovery."} /-->

Follow the owning repository's environment, test, changelog, and release instructions. Use a disposable CRM dataset for integration and migration tests.

## Reference

- [Jetpack CRM source](https://github.com/Automattic/jetpack-crm)
- [Jetpack CRM API documentation](https://github.com/Automattic/jetpack-crm-api-docs)
- [Jetpack CRM code examples](https://github.com/Automattic/jetpack-crm-code-examples)
- [Jetpack CRM knowledge base](https://kb.jetpackcrm.com/)

Use [Jetpack Forms](../forms/index.md) for form submission behavior and [Jetpack Stats](../stats/index.md) for traffic reporting. CRM owns customer records and workflows rather than those product surfaces.

## Troubleshoot and support

Record the CRM version, WordPress version, affected record type, integration, permissions, reproduction steps, and sanitized error response. Never attach a production export or customer record to a public report.

Use the [CRM knowledge base](https://kb.jetpackcrm.com/) for site-specific help and the [CRM issue tracker](https://github.com/Automattic/jetpack-crm/issues) for reproducible public source defects.
