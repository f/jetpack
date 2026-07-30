---
title: Jetpack VideoPress
description: Work with VideoPress upload, storage, blocks, playback, packages, tests, and support.
product: videopress
product_group: performance
audience: everyone
document_type: overview
sidebar_position: 120
sidebar_collapsed: true
---

Jetpack VideoPress provides video upload, storage, management, blocks, and playback through a standalone plugin and shared package. A video problem can belong to upload, processing, metadata, editor, player, network, account, or storage behavior.

<!-- wp:docspress/callout {"tone":"warning","title":"Use disposable media for development","content":"<p>Uploads can consume storage, processing time, and network bandwidth. Use short non-sensitive fixtures, record ownership, and remove test media through the supported workflow when testing is complete.</p>","collapsible":false} /-->

<!-- wp:docspress/audience-paths {"compact":true,"eyebrow":"Jetpack VideoPress","title":"Choose your VideoPress task","description":"Open the operational, integration, contribution, reference, or diagnostic path.","paths":[{"title":"Use and administer","description":"Upload, manage, embed, and troubleshoot video using current product guidance.","url":"https://jetpack.com/support/videopress/","cta":"Open VideoPress Support","icon":"SET","accent":"blue","newTab":true},{"title":"Build and integrate","description":"Understand the plugin, package, block, uploader, metadata, and player boundaries.","url":"#build-and-integrate","cta":"Open developer path","icon":"DEV","accent":"gold","newTab":false},{"title":"Contribute and test","description":"Build the projects and test upload, editor, and playback with controlled media.","url":"#contribute-and-test","cta":"Open contributor path","icon":"CODE","accent":"coral","newTab":false},{"title":"Reference","description":"Inspect VideoPress source and component documentation.","url":"#reference","cta":"Open references","icon":"API","accent":"green","newTab":false},{"title":"Troubleshoot and support","description":"Classify upload, processing, metadata, block, player, and storage failures.","url":"#troubleshoot-and-support","cta":"Troubleshoot VideoPress","icon":"FIX","accent":"blue","newTab":false}],"columns":3,"tone":"paper","textAlign":"left","showNumbers":false} /-->

## Use and administer

Use [VideoPress documentation](https://jetpack.com/support/videopress/) for current upload, storage, player, block, privacy, and support procedures.

## Build and integrate

<!-- wp:docspress/file-tree {"root":"jetpack/","tree":"projects/\n  plugins/\n    videopress/\n  packages/\n    videopress/\n      src/\n        client/\n          block-editor/\n          components/\n          hooks/\n          lib/\n  plugins/\n    jetpack/\n      extensions/\n        blocks/\n          videopress/","caption":"The standalone plugin and VideoPress package own the product. Core Jetpack block integration remains relevant for compatibility."} /-->

Follow documented package and block interfaces. Media tokens, private service requests, generated player markup, and transient upload state are not public contracts unless explicitly documented.

## Contribute and test

<!-- wp:docspress/terminal-session {"title":"Build and test VideoPress","shell":"bash","prompt":"$","command":"jp build plugins/videopress --deps\njp test php packages/videopress\njp test js packages/videopress\njp phan packages/videopress","output":""} /-->

Test supported file types and sizes relevant to the change, processing states, editor reload, poster behavior, captions where affected, keyboard controls, responsive playback, and error recovery.

## Reference

- [VideoPress plugin source](https://github.com/Automattic/jetpack/tree/trunk/projects/plugins/videopress)
- [VideoPress package source](https://github.com/Automattic/jetpack/tree/trunk/projects/packages/videopress)
- [VideoPress package README](https://github.com/Automattic/jetpack/blob/trunk/projects/packages/videopress/README.md)
- [Blocks and editor integrations](../../developers/blocks-and-editor.md)

## Troubleshoot and support

Record the WordPress, VideoPress plugin, and browser versions; file type and size; connection state; upload or processing state; affected video identifier in private support only; expected result; actual result; and sanitized console/network evidence.

Use [VideoPress Support](https://jetpack.com/support/videopress/) for account, storage, processing, and site-specific problems. Use the [Jetpack issue tracker](https://github.com/Automattic/jetpack/issues) for reproducible public source defects.
