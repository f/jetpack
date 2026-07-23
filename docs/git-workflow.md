---
title: "Use the Jetpack Git workflow"
description: "Create a focused branch, keep it current, and push safe commits for a Jetpack change."
audience: "Jetpack contributors"
document_type: how-to
sidebar_position: 10
---
Create each change on a branch from the latest `trunk`. Keep the branch focused enough that a reviewer can understand, test, and merge it independently.

## Name the branch

Use a short goal after one of these prefixes:

| Change | Prefix | Example |
| --- | --- | --- |
| New behavior | `add/` | `add/social-preview-setting` |
| Improvement | `update/` | `update/connection-error-copy` |
| Defect fix | `fix/` | `fix/stats-empty-state` |
| Experiment | `try/` | `try/form-layout` |

Release and long-running project branches use maintainer-owned naming conventions. Do not create or repurpose one without coordinating with the owning team.

## Create the branch

If you cloned your fork as `origin`, add the public Jetpack repository once:

<!-- wp:docspress/terminal-session {"title":"Add the public Jetpack remote","shell":"bash","prompt":"$","command":"git remote add upstream https://github.com/Automattic/jetpack.git\ngit remote --verbose","output":""} /-->

Then create a branch from the latest public `trunk`:

<!-- wp:docspress/terminal-session {"title":"Create a focused branch from upstream trunk","shell":"bash","prompt":"$","command":"git fetch upstream\ngit switch --create fix/stats-empty-state upstream/trunk","output":""} /-->

Use `git checkout -b` if your Git version does not support `git switch`.

## Make reviewable commits

- Keep generated files with the source change that produced them.
- Use a concise subject that explains the outcome.
- Do not mix unrelated cleanup into the change.
- Run the narrowest relevant formatter, linter, build, and test before pushing.
- Check `git diff --check` and review the complete diff.

Push the branch to your fork:

<!-- wp:docspress/terminal-session {"title":"Publish the branch to your fork","shell":"bash","prompt":"$","command":"git push --set-upstream origin fix/stats-empty-state","output":""} /-->

## Update the branch

Before opening a pull request, rebase an unpublished or single-author branch. After a pull request has active collaboration, prefer merging `upstream/trunk` unless the collaborators agree to a rebase:

<!-- wp:docspress/code-tabs {"tabs":[{"label":"Single-author branch","language":"bash","filename":"Terminal","code":"git fetch upstream\ngit rebase upstream/trunk"},{"label":"Shared branch","language":"bash","filename":"Terminal","code":"git fetch upstream\ngit merge upstream/trunk"}],"showLineNumbers":false,"caption":"Choose the update strategy from branch ownership, not personal preference."} /-->

After rebasing a branch you alone own, update it with:

<!-- wp:docspress/terminal-session {"title":"Update a rebased branch you alone own","shell":"bash","prompt":"$","command":"git push --force-with-lease","output":""} /-->

Never use plain `--force` on a shared branch. Coordinate before rewriting any branch another person may have checked out.

<!-- wp:docspress/callout {"tone":"danger","title":"Do not rewrite another contributor's branch","content":"<p><code>--force-with-lease</code> protects against overwriting an unexpected remote update, but it does not make history rewriting appropriate on a shared branch. Confirm ownership and coordination first.</p>","collapsible":false} /-->

## Resolve generated-file conflicts

Regenerate lockfiles instead of hand-editing a large conflict:

- for a project `composer.lock`, restore the intended base and run the repository Composer update command for that project;
- for `pnpm-lock.yaml`, restore the intended base and run `pnpm install`;
- after merging a project release, run `tools/fixup-project-versions.sh`.

Review the regenerated diff and run the affected project tests before pushing.

## Continue to the pull request

Follow [Take a pull request from draft to merge](pull-request.md) when the branch is ready to share.
