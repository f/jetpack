---
title: Prompt library for site owners
description: Copyable prompts for planning, troubleshooting, and reviewing a Jetpack site.
audience: site owners
document_type: prompt-library
sidebar_position: 70
---

Use these prompts with the [AI safety and verification workflow](../reference/use-docs-with-ai.md). Replace every placeholder and remove secrets.

## Choose the smallest useful setup

<!-- wp:docspress/prompt {"prompt":"You are helping me plan a WordPress site that may use Jetpack.\n\nSite type: [publication, store, portfolio, membership site, other]\nPrimary goal: [goal]\nCurrent host features: [backup, CDN, security, staging, analytics]\nCurrent plugins: [relevant plugins only]\nConstraints: [budget, privacy, performance, team access]\n\nUsing current Jetpack documentation, propose the smallest useful setup.\nSeparate free and paid capabilities, identify overlapping tools, link to the\nsource page for every recommendation, and list what I should verify on staging.\nDo not invent plan details that are not in the cited documentation.","model":"AI assistant","mode":"chat","thinking":true,"context":"site-owners/choose-products.md, reference/products-and-features.md","caption":"Compare coverage before enabling overlapping products."} /-->

## Diagnose a connection problem

<!-- wp:docspress/prompt {"prompt":"Help me diagnose a Jetpack connection problem without exposing credentials.\n\nWordPress version: [version]\nJetpack version: [version]\nHosting environment: [host or local/staging/production]\nExpected result: [expected]\nActual result: [actual]\nExact error: [redacted error]\nRecent changes: [changes]\nTests already completed: [tests]\n\nGive me a reversible troubleshooting sequence. For each step, explain what the\nresult would prove. Use current Jetpack support documentation and stop before\nany destructive, production, billing, or account-ownership action.","model":"AI assistant","mode":"chat","thinking":true,"context":"site-owners/troubleshoot.md, reference/support-and-tools.md","caption":"Build a reversible connection troubleshooting sequence."} /-->

## Review a production change

<!-- wp:docspress/prompt {"prompt":"Review this planned Jetpack configuration change for a production WordPress site.\n\nChange: [change]\nReason: [reason]\nExisting cache/security/backup/CDN tools: [tools]\nRollback method: [rollback]\nSuccess measure: [measure]\n\nReturn: prerequisites, conflicts to check, staging test cases, rollout steps,\nrollback triggers, and post-launch verification. Cite the Jetpack pages used.","model":"AI assistant","mode":"plan","thinking":true,"context":"site-owners/choose-products.md, agencies/staging-and-deployment.md","caption":"Review a production change before touching the live site."} /-->
