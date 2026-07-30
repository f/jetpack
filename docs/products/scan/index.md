---
title: Jetpack Scan
description: Navigate Jetpack Scan malware scanning, results, fixes, packages, tests, and its relationship with Protect.
product: scan
product_group: security
audience: everyone
document_type: overview
sidebar_position: 80
sidebar_collapsed: true
---

Jetpack Scan detects malware and other suspicious site changes and can provide remediation workflows. Its public source in this monorepo is package-oriented; current service behavior and site-specific remediation remain owned by product support.

<!-- wp:docspress/callout {"tone":"danger","title":"Treat a scan result as security-sensitive","content":"<p>Do not publish malicious files, private file paths, site identifiers, credentials, or customer data. Preserve evidence, avoid changing production blindly, and coordinate remediation with the site owner and support path.</p>","collapsible":false} /-->

<!-- wp:docspress/audience-paths {"compact":true,"eyebrow":"Jetpack Scan","title":"Choose your Scan task","description":"Separate site operation, package integration, safe testing, reference, and incident support.","paths":[{"title":"Use and administer","description":"Configure scanning, interpret results, and follow current remediation guidance.","url":"https://jetpack.com/support/scan/","cta":"Open Scan Support","icon":"SET","accent":"blue","newTab":true},{"title":"Build and integrate","description":"Understand Scan package boundaries and shared security models.","url":"#build-and-integrate","cta":"Open developer path","icon":"DEV","accent":"gold","newTab":false},{"title":"Contribute and test","description":"Run package tests with safe, synthetic fixtures.","url":"#contribute-and-test","cta":"Open contributor path","icon":"CODE","accent":"coral","newTab":false},{"title":"Reference","description":"Inspect the PHP and JavaScript Scan packages and related Protect sources.","url":"#reference","cta":"Open references","icon":"API","accent":"green","newTab":false},{"title":"Troubleshoot and support","description":"Handle scan status, result, remediation, and service failures without exposing sensitive data.","url":"#troubleshoot-and-support","cta":"Troubleshoot Scan","icon":"FIX","accent":"blue","newTab":false}],"columns":3,"tone":"paper","textAlign":"left","showNumbers":false} /-->

## Use and administer

Use [Jetpack Scan documentation](https://jetpack.com/support/scan/) for current scanning, result review, fix, and support procedures. Before remediation, confirm that a current backup exists and that the affected site and restore target are correct.

## Build and integrate

<!-- wp:docspress/file-tree {"root":"jetpack/","tree":"projects/\n  packages/\n    scan/\n  js-packages/\n    scan/\n  plugins/\n    protect/\n  packages/\n    protect-models/","caption":"Scan has PHP and JavaScript packages. Protect owns a separate plugin surface and shared security models; do not treat the names as interchangeable."} /-->

Treat remote service routes and private threat data as implementation details unless explicitly documented as public.

## Contribute and test

<!-- wp:docspress/terminal-session {"title":"Run Scan package checks","shell":"bash","prompt":"$","command":"jp test php packages/scan\njp test js packages/scan\njp phan packages/scan","output":""} /-->

Use synthetic fixtures that are safe to store and execute. Never introduce functioning malware or destructive payloads into repository tests.

## Reference

- [Scan PHP package](https://github.com/Automattic/jetpack/tree/trunk/projects/packages/scan)
- [Scan JavaScript package](https://github.com/Automattic/jetpack/tree/trunk/projects/js-packages/scan)
- [Jetpack Protect](../protect/index.md)
- [VaultPress Backup](../backup/index.md)
- [Secure your site](../../site-owners/secure-your-site.md)

## Troubleshoot and support

Record the Scan and WordPress versions, connection state, last completed scan, result identifier, affected component, expected remediation, actual result, and sanitized timestamps. Preserve evidence before deleting or replacing files.

Use [Scan Support](https://jetpack.com/support/scan/) for site-specific results or incidents. Use the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) only when the defect can be reproduced safely in public.
