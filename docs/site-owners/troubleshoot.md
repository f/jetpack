---
title: Troubleshoot Jetpack
description: Collect the right evidence, isolate the problem, and choose the correct support path.
audience: site owners
document_type: how-to
sidebar_position: 60
---

Do not start by reinstalling everything. First identify what failed and when.

<!-- wp:docspress/callout {"tone":"warning","title":"Protect production while diagnosing","content":"<p>Use staging for conflict tests, cache changes, connection experiments, and plugin deactivation. Keep a current backup and a written rollback before changing production behavior.</p>","collapsible":false} /-->

## Collect a minimal problem report

Record:

- the site URL, without private admin links or credentials;
- the exact feature and screen;
- the expected result and actual result;
- the full error text;
- when the problem started;
- recent plugin, theme, hosting, DNS, cache, or account changes;
- whether the issue also occurs in a staging environment.

## Isolate the problem safely

1. Confirm WordPress, Jetpack, and related plugins are current.
2. Check the Jetpack connection and service status.
3. Reproduce the issue with a precise sequence of steps.
4. Check browser and server logs relevant to that sequence.
5. Test for a plugin, theme, cache, or network conflict on staging.
6. Restore production behavior before ending the test.

Start at [Jetpack Support](https://jetpack.com/support/). Developers who can reproduce a software defect should use [Create a great bug report](../guides/report-bugs.md).

## Choose the next owner

| Evidence points to… | Continue with… |
| --- | --- |
| One site's account, plan, connection, or configuration | Jetpack Support |
| Hosting, DNS, TLS, firewall, cron, or server errors | The hosting provider, with the relevant redacted logs |
| A reproducible Jetpack software defect across clean sites | The Jetpack bug-report workflow |
| A third-party plugin or theme conflict | That product's maintainer, with the minimal conflicting pair |
| A suspected vulnerability | The private security-reporting process, never a public issue |

## Never include secrets

Remove passwords, access tokens, private keys, personal customer data, and unredacted server configuration from screenshots, AI prompts, and public issues.

<!-- wp:docspress/result {"status":"neutral","title":"A useful diagnosis narrows ownership","content":"<p>You can state the smallest reproduction, the last known-good state, what each test ruled in or out, and the correct team to contact without exposing sensitive data.</p>","meta":"reproduce → isolate → restore → escalate"} /-->
