---
title: Jetpack Protect
description: Work with Jetpack Protect vulnerability intelligence, firewall behavior, packages, tests, and support.
product: protect
product_group: security
audience: everyone
document_type: overview
sidebar_position: 70
sidebar_collapsed: true
---

Jetpack Protect helps identify known vulnerabilities and provides protection capabilities through a standalone plugin and shared security packages. Protect and Scan are related but distinct: Protect focuses on vulnerability and protection signals; Scan covers malware scanning and fixes.

<!-- wp:docspress/callout {"tone":"warning","title":"Do not blur Protect and Scan findings","content":"<p>Record which product produced the finding, what object it describes, and whether the evidence is a known vulnerability, firewall event, malware result, or site-specific compromise. The remediation and test path depends on that distinction.</p>","collapsible":false} /-->

<!-- wp:docspress/audience-paths {"compact":true,"eyebrow":"Jetpack Protect","title":"Choose your Protect task","description":"Open the correct operational, integration, contribution, reference, or support source.","paths":[{"title":"Use and administer","description":"Install, configure, review findings, and follow current product guidance.","url":"https://jetpack.com/support/jetpack-protect/","cta":"Open Protect Support","icon":"SET","accent":"blue","newTab":true},{"title":"Build and integrate","description":"Understand plugin, models, status, firewall, and connection boundaries.","url":"#build-and-integrate","cta":"Open developer path","icon":"DEV","accent":"gold","newTab":false},{"title":"Contribute and test","description":"Build the plugin and run focused security project tests.","url":"#contribute-and-test","cta":"Open contributor path","icon":"CODE","accent":"coral","newTab":false},{"title":"Reference","description":"Inspect the plugin and owning security packages.","url":"#reference","cta":"Open references","icon":"API","accent":"green","newTab":false},{"title":"Troubleshoot and support","description":"Classify vulnerability, firewall, connection, data, and UI failures.","url":"#troubleshoot-and-support","cta":"Troubleshoot Protect","icon":"FIX","accent":"blue","newTab":false}],"columns":3,"tone":"paper","textAlign":"left","showNumbers":false} /-->

## Use and administer

Use [Jetpack Protect documentation](https://jetpack.com/support/jetpack-protect/) for current installation, configuration, finding review, and support procedures. Validate the affected component and installed version before acting on a vulnerability result.

## Build and integrate

<!-- wp:docspress/file-tree {"root":"jetpack/","tree":"projects/\n  plugins/\n    protect/\n  packages/\n    protect-models/\n    protect-status/\n    waf/\n    connection/","caption":"Protect uses a product plugin plus shared models, status, firewall, and connection packages. Follow imports before assigning ownership."} /-->

Do not expose vulnerability feeds, service credentials, private site identifiers, or internal service contracts in public examples.

## Contribute and test

<!-- wp:docspress/terminal-session {"title":"Build and test Jetpack Protect","shell":"bash","prompt":"$","command":"jp build plugins/protect --deps\njp test php plugins/protect\njp test js plugins/protect\njp phan plugins/protect","output":""} /-->

Use safe fixtures for security findings. Test active, inactive, disconnected, offline, and unavailable-service states when the change affects status or onboarding.

## Reference

- [Protect plugin source](https://github.com/Automattic/jetpack/tree/trunk/projects/plugins/protect)
- [Protect Models package](https://github.com/Automattic/jetpack/tree/trunk/projects/packages/protect-models)
- [Protect Status package](https://github.com/Automattic/jetpack/tree/trunk/projects/packages/protect-status)
- [Web Application Firewall package](https://github.com/Automattic/jetpack/tree/trunk/projects/packages/waf)
- [Jetpack Scan](../scan/index.md)

## Troubleshoot and support

Record the affected plugin or theme slug and version, finding identifier, Protect version, connection state, firewall state, expected result, actual result, and sanitized evidence. Do not paste exploit payloads, credentials, or private site data into a public issue.

Use [Protect Support](https://jetpack.com/support/jetpack-protect/) for site-specific findings. Search the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) for reproducible plugin or package defects.
