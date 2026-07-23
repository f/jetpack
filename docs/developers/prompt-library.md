---
title: Prompt library for WordPress developers
description: Copyable prompts for planning and reviewing Jetpack integrations.
audience: WordPress developers
document_type: prompt-library
sidebar_position: 60
---

Use these prompts with [Use Jetpack documentation with AI](../reference/use-docs-with-ai.md). Never include tokens, nonces, private keys, customer data, or production credentials.

## Choose an extension point

<!-- wp:docspress/prompt {"prompt":"I am building a WordPress [plugin or theme] that needs to [goal].\n\nSupported WordPress versions: [versions]\nSupported Jetpack versions: [versions]\nConnected-site requirement: [yes, no, unknown]\nData involved: [data]\nCurrent approach: [approach or none]\n\nUsing current Jetpack Developer Resources, Jetpack source documentation, and\nWordPress developer documentation, compare settings, documented hooks, blocks,\nREST endpoints, public packages, and an upstream contribution. Recommend the\nnarrowest supported option. Cite the exact contract and identify anything that\nwould depend on private implementation details.","model":"Coding agent","mode":"plan","thinking":true,"context":"developers/choose-an-integration.md, developers/hooks-and-filters.md, rest-api.md","caption":"Choose the narrowest documented integration contract."} /-->

## Review a hook implementation

<!-- wp:docspress/prompt {"prompt":"Review this Jetpack hook implementation:\n\n<code>\n\nHook documentation URL: [url]\nExpected behavior: [behavior]\nSupported versions: [versions]\n\nCheck the callback signature, priority, accepted arguments, return type,\ncapability and nonce handling, escaping, failure states, performance, and\nunregistration or rollback behavior. Do not assume undocumented guarantees.\nReturn a corrected example and a focused test matrix.","model":"Coding agent","mode":"code","thinking":true,"context":"developers/hooks-and-filters.md, coding-guidelines.md","caption":"Review a hook implementation against its public contract."} /-->

## Plan compatibility tests

<!-- wp:docspress/prompt {"prompt":"Create a Jetpack compatibility test plan for:\n\nIntegration: [description]\nWordPress range: [range]\nJetpack range: [range]\nPHP range: [range]\nConnection states: [states]\nCritical user flows: [flows]\n\nGroup tests into activation order, permissions, connected/disconnected behavior,\neditor/frontend behavior, REST failures, upgrades, deactivation, and rollback.\nLink every Jetpack-specific assumption to current documentation.","model":"Coding agent","mode":"plan","thinking":true,"context":"developers/test-an-integration.md, automated-testing.md","caption":"Turn compatibility assumptions into a focused test matrix."} /-->
