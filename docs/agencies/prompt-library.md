---
title: Prompt library for agencies
description: Copyable prompts for client discovery, architecture review, launch, and handoff.
audience: agencies
document_type: prompt-library
sidebar_position: 60
---

Use these prompts with [Use Jetpack documentation with AI](../reference/use-docs-with-ai.md). Remove client names, private URLs, customer data, credentials, tokens, license information, and internal incident details.

## Create a Jetpack coverage map

<!-- wp:docspress/prompt {"prompt":"Create a Jetpack coverage map for a WordPress client project.\n\nSite type: [type]\nBusiness goals: [goals]\nHost-provided services: [services]\nCurrent plugins: [relevant plugins]\nRecovery requirements: [RTO and RPO]\nPerformance target: [target]\nPrivacy or compliance constraints: [constraints]\nTeam and ownership model: [model]\n\nMap each requirement to the host, WordPress core, Jetpack, another plugin, or an\noperational process. Flag overlap, account-ownership risk, missing acceptance\ntests, and ongoing maintenance. Use current official Jetpack documentation and\ncite every product or plan claim.","model":"AI assistant","mode":"plan","thinking":true,"context":"agencies/plan-a-client-site.md, reference/products-and-features.md","caption":"Map every requirement to one accountable system."} /-->

## Review a launch checklist

<!-- wp:docspress/prompt {"prompt":"Review this WordPress and Jetpack launch checklist:\n\n[checklist]\n\nSite type: [type]\nStaging workflow: [workflow]\nCritical user journeys: [journeys]\nActive Jetpack capabilities: [capabilities]\n\nFind missing checks for connection identity, backups and restore, alerts,\npermissions, cache/CDN overlap, publishing, forms, subscriptions, analytics,\nrollback, client access, and post-launch monitoring. Return only actionable\nchanges, grouped by before launch, launch day, and after launch.","model":"AI assistant","mode":"plan","thinking":true,"context":"agencies/launch-a-client-site.md, agencies/staging-and-deployment.md","caption":"Find missing checks before client launch."} /-->

## Draft a client handoff

<!-- wp:docspress/prompt {"prompt":"Turn these technical notes into a client-facing Jetpack handoff:\n\n[redacted notes]\n\nUse plain language. Include what is enabled, why it matters, who owns each\naccount and renewal, what alerts mean, how restores and support work, and what\nthe client should not change without review. Add a short acceptance checklist.\nDo not include credentials or private implementation details.","model":"AI assistant","mode":"chat","thinking":false,"context":"agencies/handoff-and-support.md, agencies/manage-client-sites.md","caption":"Turn redacted technical notes into a client-ready handoff."} /-->
