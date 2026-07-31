---
title: VaultPress Backup
description: Navigate VaultPress Backup operation, source projects, development, testing, restore safety, and support.
product: backup
product_group: security
audience: everyone
document_type: overview
sidebar_position: 30
sidebar_collapsed: true
---

VaultPress Backup records site changes and supports recovery workflows. Backup code lives in a standalone plugin and shared packages, while storage, retention, and restore procedures depend on the current product service.

<!-- wp:docspress/callout {"tone":"danger","title":"A restore changes site data","content":"<p>Never use production as a restore experiment. Confirm the target site, restore point, excluded data, current backup state, connection identity, and rollback before starting a restore or testing restore-related code.</p>","collapsible":false} /-->

<!-- wp:docspress/audience-paths {"compact":true,"eyebrow":"VaultPress Backup","title":"Choose your Backup task","description":"Use the owning operational, source, test, reference, or support path.","paths":[{"title":"Use and administer","description":"Configure backups and follow current restore procedures.","url":"https://jetpack.com/support/backup/","cta":"Open Backup Support","icon":"SET","accent":"blue","newTab":true},{"title":"Build and integrate","description":"Understand the plugin, shared package, connection, and activity boundaries.","url":"#build-and-integrate","cta":"Open developer path","icon":"DEV","accent":"gold","newTab":false},{"title":"Contribute and test","description":"Build the plugin and packages, then test without risking production data.","url":"#contribute-and-test","cta":"Open contributor path","icon":"CODE","accent":"coral","newTab":false},{"title":"Reference","description":"Inspect the public monorepo source and shared platform guidance.","url":"#reference","cta":"Open references","icon":"API","accent":"green","newTab":false},{"title":"Troubleshoot and support","description":"Separate site identity, connection, backup, storage, and restore failures.","url":"#troubleshoot-and-support","cta":"Troubleshoot Backup","icon":"FIX","accent":"blue","newTab":false}],"columns":3,"tone":"paper","textAlign":"left","showNumbers":false} /-->

## Use and administer

Use [VaultPress Backup documentation](https://jetpack.com/support/backup/) for current setup, backup status, storage, retention, download, restore, and support procedures. Record who owns the WordPress.com connection, backup access, alerts, and recovery decisions.

## Build and integrate

<!-- wp:docspress/file-tree {"root":"jetpack/","tree":"projects/\n  plugins/\n    backup/\n  packages/\n    backup/\n    connection/\n    sync/\n    activity-log/","caption":"The Backup plugin owns its product surface while shared packages provide connection, synchronization, and activity capabilities."} /-->

Do not treat stored options, remote service routes, archive formats, or generated client bundles as public APIs unless the owning source documents that contract.

## Contribute and test

<!-- wp:docspress/terminal-session {"title":"Build and test the Backup projects","shell":"bash","prompt":"$","command":"jp build plugins/backup --deps\njp test php packages/backup\njp test js packages/backup\njp phan packages/backup","output":""} /-->

Use disposable or staging data for manual coverage. A restore test must verify the target environment before, during, and after the operation and must include a recovery path if the result is wrong.

## Reference

- [Backup plugin source](https://github.com/Automattic/jetpack/tree/trunk/projects/plugins/backup)
- [Backup package source](https://github.com/Automattic/jetpack/tree/trunk/projects/packages/backup)
- [Connection and data](../../developers/connection-and-data.md)
- [Staging and deployment safety](../../agencies/staging-and-deployment.md)

Backup recovery complements [Jetpack Scan](../scan/index.md) and [Jetpack Protect](../protect/index.md); it does not replace vulnerability prevention or malware detection.

## Troubleshoot and support

Capture the site URL in private support only, WordPress and plugin versions, connection identity, latest completed backup, affected restore point, excluded content, observed status, and sanitized logs. Never attach downloadable archives, credentials, tokens, or customer data to a public issue.

Use [Backup Support](https://jetpack.com/support/backup/) for site-specific backup or restore problems. Use the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) only for a source defect that can be reproduced without private site data.
