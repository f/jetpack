---
title: "Create a useful bug report"
description: "Reproduce a Jetpack problem and report the evidence maintainers need to act."
audience: "site owners, developers, and contributors"
document_type: how-to
sidebar_position: 30
---

Use GitHub for a reproducible Jetpack software defect. Use [Jetpack Support](https://jetpack.com/support/) when the problem is specific to one site or you still need help isolating it.

## Do not report security issues publicly

Follow the repository [security policy](https://github.com/Automattic/jetpack/blob/trunk/SECURITY.md). Report suspected vulnerabilities through the [Automattic HackerOne program](https://hackerone.com/automattic), not a public issue.

## Before you open an issue

1. Update WordPress, Jetpack, and the affected Jetpack product.
2. Reproduce the problem with a precise sequence of actions.
3. Check [existing Jetpack issues](https://github.com/Automattic/jetpack/issues).
4. Test a plugin or theme conflict on a staging site or with a safe troubleshooting workflow.
5. Confirm whether the problem depends on the browser, device, user role, connection state, or environment.

Do not disable security, caching, payment, or business-critical plugins directly on production to create a reproduction.

## Collect the evidence

Include:

- a concise title that names the feature and failure;
- WordPress, Jetpack, PHP, and browser versions;
- the affected Jetpack product, module, block, package, or endpoint;
- local, staging, or production environment;
- connected or disconnected state when relevant;
- exact steps to reproduce;
- expected and actual results;
- complete error text and the smallest relevant log excerpt;
- screenshots or a short recording for visual behavior;
- the earliest known affected version and a known-good version, if available;
- a minimal reproduction repository or test when the problem involves code.

Remove access tokens, nonces, cookies, passwords, private URLs, customer data, and unrelated logs.

## Write reproducible steps

Use this format:

<!-- wp:docspress/colorful-code {"language":"markdown","filename":"Bug report","code":"### Environment\n\nWordPress: [version]\nJetpack: [version]\nPHP: [version]\nBrowser: [browser and version]\nConnection: [connected, disconnected, or not applicable]\n\n### Steps\n\n1. Start from [state].\n2. Open [screen].\n3. Change [setting].\n4. Perform [action].\n\n### Expected\n\n[observable result]\n\n### Actual\n\n[observable result and exact error]","highlightedLines":"1,9,16,20","showLineNumbers":false,"caption":"A compact reproduction separates environment, actions, and observable results."} /-->

## Submit and follow up

Open the appropriate [Jetpack issue template](https://github.com/Automattic/jetpack/issues/new/choose). Answer maintainer questions, test proposed fixes in a safe environment, and add new evidence to the original issue instead of opening duplicates.
