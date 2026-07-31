---
title: Documentation map and writing model
description: Explain how Jetpack docs are organized by audience and product, sourced, written, and kept useful for people and AI tools.
audience: documentation contributors
document_type: explanation
sidebar_position: 50
---

Jetpack documentation supports two complementary entry points:

- **Audience paths** organize cross-product decisions and workflows by responsibility.
- **Product hubs** gather the operation, integration, contribution, reference, and support paths for one product.

## Public paths

| Path | Primary need |
| --- | --- |
| Site owners | Configure and operate Jetpack without writing code |
| WordPress developers | Integrate a separate plugin, theme, or application with Jetpack |
| Products | Find the owning source, integration, test, reference, and support path for a named product |
| Agencies | Deliver and operate Jetpack across client sites |
| Contributors | Change Jetpack source, tests, documentation, or releases |
| Reference | Share terminology, canonical sources, and cross-audience guidance |

The DocsPress manifest defines the public route and parent for every Markdown source. This keeps established repository file paths stable while the published site presents a coherent hierarchy. The audience routes remain stable; Products is a peer branch. `sidebar_position` orders siblings and `sidebar_collapsed` controls the initial state of branches.

<!-- wp:docspress/file-tree {"root":"docs/","tree":"index.md\nmanifest.json\nproducts/\n  catalog.json\n  index.md\n  [product]/\n    index.md\nsite-owners/\n  index.md\n  get-started.md\n  choose-products.md\n  troubleshoot.md\n  prompt-library.md\ndevelopers/\n  index.md\n  choose-an-integration.md\n  hooks-and-filters.md\n  test-an-integration.md\n  prompt-library.md\nagencies/\n  index.md\n  plan-a-client-site.md\n  launch-a-client-site.md\n  handoff-and-support.md\n  prompt-library.md\ncontributors/\n  index.md\n  getting-started/\n  workflow/\n  quality/\n  testing/\n  monorepo/\n  releases/\n  prompt-library.md\nreference/\n  index.md\n  products-and-features.md\n  support-and-tools.md\n  glossary.md\n  use-docs-with-ai.md\n  documentation-map.md","caption":"Audience directories own cross-product workflows. Product directories own stable product navigation and link to shared or externally maintained sources without copying them."} /-->

## Product-page contract

Every product hub contains these sections:

1. **Use and administer**
2. **Build and integrate**
3. **Contribute and test**
4. **Reference**
5. **Troubleshoot and support**

The machine-readable `products/catalog.json` defines the label, public route, group, ownership model, canonical sources, and relevant repository paths. The manifest, homepage carousel, and product pages must agree with it.

Create a child page only when it contains a substantive maintained procedure. Otherwise, link directly to the canonical support page, API specification, SDK, source repository, or shared Jetpack guide.

<!-- wp:docspress/callout {"tone":"note","title":"One fact, one owning source","content":"<p>Product hubs should orient and connect. They must not copy changing prices, plan limits, service availability, external API contracts, or support procedures that are maintained elsewhere.</p>","collapsible":false} /-->

## Page types

Use one primary page type:

- **Tutorial:** a guided learning experience that reaches a defined result.
- **How-to:** steps for a reader who already has a specific goal.
- **Reference:** precise facts, contracts, options, or commands.
- **Explanation:** context, concepts, and tradeoffs.
- **Checklist:** a verifiable operational sequence.
- **Prompt library:** reusable AI prompts with context and safety boundaries.

Avoid mixing a long conceptual history, complete API reference, troubleshooting tree, and beginner tutorial on one page.

## Required page shape

<!-- wp:docspress/colorful-code {"language":"markdown","filename":"docs/[path].md","code":"---\ntitle: Do a specific task\ndescription: One sentence that states the outcome.\naudience: site owners\ndocument_type: how-to\nsidebar_position: 20\n---\n\nState when to use the page and what the reader will accomplish.\n\n## Before you start\n\nList prerequisites and safety boundaries.\n\n## Complete the task\n\nUse numbered, testable steps.\n\n## Verify the result\n\nDescribe observable success.\n\n## Troubleshoot\n\nCover likely failures or link to the owning support page.","highlightedLines":"1-7,11,15,19,23","showLineNumbers":true,"caption":"Each task page names its audience and outcome, then separates prerequisites, procedure, verification, and troubleshooting."} /-->

## AI-friendly writing rules

- Use one topic and one primary outcome per page.
- Put the answer, decision, or task context before background.
- Use sentence-case headings that describe the content.
- Define acronyms and ambiguous Jetpack terms.
- Use complete code examples only when they are safe to copy.
- Label placeholders and intentionally incomplete examples.
- State version, environment, permission, and connection assumptions.
- Link product details to the canonical Jetpack source.
- Include verification and rollback for operational changes.
- Keep secrets and private data out of examples and prompts.

## Review checklist

Before publishing:

1. Confirm the audience and page type.
2. Test every local link and code sample.
3. Verify Jetpack-specific claims against the owning source.
4. Check the page in its sidebar context.
5. Confirm the active path expands and inactive branches remain understandable.
6. For product content, confirm the catalog, manifest, carousel label, route, and owning source agree.
7. Read the raw `.md` form without site navigation.
8. Ask whether an AI assistant could distinguish facts, instructions, placeholders, and safety boundaries.
