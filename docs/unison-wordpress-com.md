---
title: "Configure Unison for WordPress.com development"
description: "Use advanced Unison preferences for Jetpack development on a WordPress.com sandbox."
audience: "Jetpack contributors with WordPress.com access"
document_type: how-to
sidebar_position: 20
---
Use this optional workflow only if you have access to a WordPress.com development sandbox and already use the repository's Unison setup.

## Choose one target

Jetpack uses a `sun` and `moon` strategy in which production files and a development version live in separate directories.

To avoid tracking the active directory manually, point your Unison preference file to `wp-content/mu-plugins/jetpack-plugin/dev` on the sandbox. When that directory exists, the development loader uses it instead of `sun` or `moon`.

## Sync both targets

Create one Unison preference for `sun` and another for `moon`, then run a separate watcher for each. For example:

<!-- wp:docspress/terminal-session {"title":"Watch the moon and sun profiles in tmux","shell":"bash","prompt":"$","command":"tmux new-session -d 'unison -ui text -repeat watch jetpack-plugin-moon' \\; \\\n\tsplit-window -d 'unison -ui text -repeat watch jetpack-plugin-sun' \\; \\\n\tattach","output":""} /-->

Replace the profile names with the names of your own Unison preferences.

## Verify the sync

1. Change a harmless file locally.
2. Confirm the intended sandbox target receives the change.
3. Confirm the other target is unchanged unless you intentionally run both watchers.
4. Stop the watchers before switching profiles or branches.

Do not sync credentials, local environment files, or unrelated working-tree changes.
