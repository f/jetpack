---
title: "Manage a Jetpack release"
description: "Keep release scope, issue state, testing evidence, and ownership clear."
audience: "Jetpack maintainers"
document_type: how-to
sidebar_position: 20
---
Use this guide to coordinate repository work that is already assigned to a Jetpack release. Release tools and labels can change, so confirm the current owning-team process before changing milestones, branches, tags, or published artifacts.

## Define the release record

Use the release milestone or owning issue as the shared record. It should state:

- release or project scope;
- responsible maintainers;
- target and blocker work;
- links to implementation pull requests;
- current testing evidence;
- risks, decisions, and unresolved questions;
- the date and author of the latest update.

Do not duplicate decisions across several issues. Link supporting tasks and keep the shared record current.

## Keep scope explicit

- Add an issue or pull request to a milestone only when the owning team intends to ship it there.
- Use **Primary Issue** for a larger body of work when one issue needs to summarize several implementation tasks.
- Use the repository's current `[Type]`, `[Pri]`, and `[Status]` labels. Check the live label list instead of copying labels from an old release.
- Reserve `[Pri] BLOCKER` for work without which the release cannot ship.
- When work moves out of a release, record why and move it to an explicitly agreed destination. Do not mass-move unresolved work to the next milestone.

## Move work through review

A typical pull request progresses through:

1. `[Status] In Progress`
2. `[Status] Needs Review`
3. `[Status] Needs Author Reply` when the author must respond
4. `[Status] Needs Testing` when manual verification remains
5. `[Status] Ready to Merge`

The exact route can differ by project. Design, copy, privacy, Tracks, or product review labels can add required review without replacing the main engineering state.

## Require evidence

Before a release item is considered complete, link:

- automated checks and relevant test commands;
- the manual test environment and steps;
- screenshots or recordings for user-interface changes;
- a changelog entry when the affected project requires one;
- follow-up work that is intentionally outside the release.

Use the [regression checklist](testing/regression-checklist/README.md) for a release-wide manual pass.

## Finish safely

Before changing a release branch, tag, package version, or public artifact:

1. Confirm you are the current owner or have explicit approval.
2. Read the relevant project release instructions and CLI help.
3. Verify the source commit and intended version.
4. Run a dry run when the release tool supports one.
5. Record the result and recovery path in the release record.

Never include credentials, private customer data, or unreleased security details in public release issues.
