---
title: Choose Jetpack products and features
description: Match a site goal to the smallest useful Jetpack setup.
audience: site owners
document_type: explanation
sidebar_position: 20
---

Start with the problem you want to solve. Do not enable every feature by default.

## Match goals to product areas

| Goal | Start with | Confirm before enabling |
| --- | --- | --- |
| Recover from mistakes or outages | [VaultPress Backup](../products/backup/index.md) | Storage, retention, restore workflow, and plan limits |
| Block unwanted comments or form submissions | [Akismet Anti-spam](../products/akismet/index.md) | Data handling, key ownership, integrations, and review workflow |
| Detect malware or risky files | [Jetpack Scan](../products/scan/index.md) and [Jetpack Protect](../products/protect/index.md) | Existing security tools, host protections, and alert recipients |
| Improve page speed and Core Web Vitals | [Jetpack Boost](../products/boost/index.md) | Current caching/CDN stack and a before/after performance baseline |
| Help visitors find content | [Jetpack Search](../products/search/index.md) | Content volume, filters, indexing expectations, and current search tools |
| Host and present video | [Jetpack VideoPress](../products/videopress/index.md) | Storage, upload workflow, privacy, processing, and playback needs |
| Understand traffic | [Jetpack Stats](../products/stats/index.md) | Data needs, team access, and applicable plan limits |
| Publish to social channels | [Jetpack Social](../products/social/index.md) | Connected accounts, publishing permissions, and editorial approval |
| Collect visitor responses | [Jetpack Forms](../products/forms/index.md) | Notification ownership, data handling, spam, and integration needs |
| Add AI-assisted editing | [Jetpack AI Assistant](../products/ai/index.md) | Content review, privacy, permissions, and editorial policy |
| Manage customer relationships | [Jetpack CRM](../products/crm/index.md) | Data ownership, workflow, access, integrations, and migration needs |
| Build a newsletter or subscriptions | Newsletter and Subscriptions | Sender identity, subscriber expectations, and privacy requirements |
| Manage several sites | Jetpack Manage | Site ownership, team roles, update policy, and client visibility |

The [Jetpack feature reference](https://jetpack.com/support/features/) is the source of truth for current availability. Product and plan details can change, so verify the support page before making a purchasing or client recommendation.

Browse the [complete product documentation map](../products/index.md) when you need developer, contributor, reference, or troubleshooting sources for a product.

## Use a minimal-first rollout

1. Write down the site goal and success measure.
2. Record plugins, host services, and CDN/security tools that already cover the same goal.
3. Enable one Jetpack capability at a time.
4. Test on staging when the capability changes caching, authentication, publishing, or data flow.
5. Document who owns alerts, renewals, and ongoing review.

## Avoid common mistakes

- Do not run overlapping backup, cache, image CDN, or security systems without understanding precedence.
- Do not connect a client site to a personal account without an ownership and handoff plan.
- Do not treat a feature as successful only because it is enabled; verify the outcome.
- Do not use outdated screenshots or plan comparisons as the source of truth.
