---
title: "Test a Jetpack beta"
description: "Install a pre-release Jetpack build, exercise it safely, and report useful results."
audience: "site owners and Jetpack testers"
document_type: how-to
sidebar_position: 10
---
Our Beta program is designed to make it simple for you to test and tell us what we’re doing wrong (and right) in the next version of Jetpack. Your mission as a Beta tester is to help us test the next version of Jetpack and let us know about your experience. Is the UI confusing? Is a feature not working properly? Is there something missing? We need to know!

Beta testers give updates, fixes, and new modules a test run before they’re publicly released, so they’re an important part of the development process.

Only test beta software on a disposable test or staging site. Do not use a production site or a site that contains data you cannot restore.

## Prepare the test site

1. Create a backup or use a fresh test site.
2. Record the WordPress, PHP, Jetpack, theme, and relevant plugin versions.
3. Confirm that you can restore or recreate the site.
4. [Download and install the Jetpack Beta plugin](https://jetpack.com/beta/).
5. In WP Admin, open **Jetpack > Beta** and select the build you need to test.

## Run a focused test

Start with one user goal and record:

- the build or branch tested;
- the exact steps you followed;
- what you expected;
- what happened;
- relevant screenshots, browser console errors, network errors, and `debug.log` entries.

Use the [Jetpack Beta testing tips](testing-tips.md) to configure a useful test environment. Run the [regression checklist](regression-checklist/README.md) when you are validating a release rather than one focused change.

## Report the result

- For beta feedback or a product question, use the [Jetpack beta contact form](https://jetpack.com/contact-support/beta-group/).
- For a reproducible software defect, [create a Jetpack bug report](../guides/report-bugs.md).
- For a suspected security issue, follow the repository [security policy](https://github.com/Automattic/jetpack/blob/trunk/SECURITY.md). Never publish vulnerability details in a GitHub issue.

Remove passwords, access tokens, private URLs, customer data, and other secrets from every report.
