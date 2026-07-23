---
title: "Take a pull request from draft to merge"
description: "Prepare, submit, review, and complete a Jetpack pull request."
audience: "Jetpack contributors"
document_type: how-to
sidebar_position: 20
---
A good Jetpack pull request has one clear outcome, enough context to evaluate the approach, and evidence that the change works.

## Before opening the pull request

1. Follow the [Git workflow](git-workflow.md).
2. Split unrelated or independently useful work into separate branches.
3. Read the nearest project `AGENTS.md`, `README.md`, `package.json`, and `composer.json`.
4. Add or update tests for the changed behavior.
5. Add a [changelog entry](writing-a-good-changelog-entry.md) for each affected project that requires one.
6. Run the narrowest relevant formatting, lint, build, and test commands.
7. Review the entire diff and run `git diff --check`.

## Open a draft

Open a draft pull request early when the approach would benefit from feedback. The title should identify the product area and outcome, for example:

<!-- wp:docspress/colorful-code {"language":"plaintext","filename":"Pull-request title","code":"Stats: explain an empty reporting period","highlightedLines":"","showLineNumbers":false,"caption":"Lead with the affected product area and the user-visible outcome."} /-->

The description should include:

- the problem and user impact;
- the chosen approach;
- important alternatives or constraints;
- exact test commands and manual steps;
- screenshots or recordings for visual changes;
- risks, compatibility concerns, and follow-up work;
- related issues or pull requests.

Remove credentials, customer data, private URLs, and unreleased security details.

## Make it ready for review

Before requesting review, confirm:

- required checks are passing;
- the branch contains no accidental or unrelated changes;
- the pull request includes current testing evidence;
- visual changes include useful before-and-after evidence;
- user-facing behavior has documentation or an explicit documentation plan;
- the branch applies cleanly to current `trunk`.

Maintainers can use `[Status] In Progress` for active work and `[Status] Needs Review` when the pull request is ready.

## Respond to review

- Answer questions with evidence or update the code.
- Mark a conversation resolved only after the concern is addressed.
- Summarize substantial revisions for reviewers.
- Re-run affected checks after every meaningful change.
- Ask for review from another owning team when the change crosses project boundaries.

Reviewers may apply `[Status] Needs Author Reply` while they are waiting for the author. See [Review Jetpack code](code-reviews.md) for both roles.

## Finish the pull request

A maintainer may move the pull request through `[Status] Needs Testing` and `[Status] Ready to Merge` after code review and manual verification. `[Pri] BLOCKER` is reserved for work without which an agreed release cannot ship.

Before merge:

1. Confirm approvals and required checks are current.
2. Confirm test evidence covers the final commit.
3. Confirm changelog and documentation changes are present.
4. Confirm follow-up work has an owner and link.

After merge, delete the feature branch when it is no longer needed and verify any expected deployment or release automation.
