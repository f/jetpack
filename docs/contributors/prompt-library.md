---
title: Prompt library for Jetpack contributors
description: Copyable prompts for planning, implementing, testing, and reviewing focused Jetpack changes.
audience: Jetpack contributors
document_type: prompt-library
sidebar_position: 70
---

Use these prompts with [Use Jetpack documentation with AI](../reference/use-docs-with-ai.md). Do not paste credentials, private issue context, customer data, or unreleased security details.

## Plan a focused change

<!-- wp:docspress/prompt {"prompt":"Help me plan a focused change in the Jetpack monorepo.\n\nGoal: [goal]\nIssue or requirement: [public link or redacted summary]\nLikely project path: [path]\nUser-visible behavior: [behavior]\nCompatibility constraints: [constraints]\n\nFirst inspect the nearest AGENTS.md, README, package metadata, tests, and existing\nimplementation. Identify the source of truth, affected consumers, relevant\ncommands, changelog requirements, and a minimal verification plan. Separate\nfacts found in the repository from your inferences. Do not edit files yet.","model":"Coding agent","mode":"plan","thinking":true,"context":"@repository, AGENTS.md, contributors/getting-started/index.md","caption":"Research the repository before proposing edits."} /-->

## Implement with repository evidence

<!-- wp:docspress/prompt {"prompt":"Implement this Jetpack change:\n\n[requirement]\n\nScope: [paths]\nOut of scope: [paths or behavior]\nAcceptance criteria: [criteria]\n\nFollow the repository instructions closest to the files. Reuse existing patterns\nand public contracts. Keep unrelated working-tree changes intact. Add or update\ntests that prove the acceptance criteria, run the relevant focused checks, and\nreport any broader validation that remains.","model":"Coding agent","mode":"code","thinking":true,"context":"@repository, AGENTS.md, coding-guidelines.md, automated-testing.md","caption":"Implement a bounded change using repository evidence."} /-->

## Review a change before a pull request

<!-- wp:docspress/prompt {"prompt":"Review the current Jetpack diff as if it were a pull request.\n\nIntended outcome: [outcome]\nRisk areas: [areas]\nTest evidence: [commands and results]\n\nCheck correctness, regressions, compatibility, security boundaries,\naccessibility, performance, translations, changelog requirements, documentation,\nand generated artifacts. Trace each concern to exact code and explain a\nreproduction. Do not report style preferences as defects.","model":"Coding agent","mode":"code","thinking":true,"context":"@repository, AGENTS.md, code-reviews.md, pull-request.md","caption":"Review the current diff for actionable defects."} /-->

## Build a test matrix

<!-- wp:docspress/prompt {"prompt":"Create a proportional test matrix for this Jetpack change:\n\nChanged paths: [paths]\nBehavior: [behavior]\nConsumers: [plugins, packages, blocks, or services]\nSupported versions: [versions]\n\nUse repository scripts and existing tests as evidence. Group the matrix into\nstatic checks, unit tests, integration tests, end-to-end tests, manual\nverification, compatibility states, and rollback. Mark required versus optional\nchecks and explain what each result proves.","model":"Coding agent","mode":"plan","thinking":true,"context":"@repository, automated-testing.md, contributors/testing/index.md","caption":"Build a proportional verification matrix."} /-->
