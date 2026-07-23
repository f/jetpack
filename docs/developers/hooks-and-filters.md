---
title: Use Jetpack hooks and filters
description: Find a documented Jetpack hook, implement it in the correct location, and verify its behavior.
audience: WordPress developers
document_type: how-to
sidebar_position: 20
---

Use a Jetpack hook when a documented action or filter matches the behavior you need.

## Find the hook

Search [Jetpack Developer Resources](https://developer.jetpack.com/hooks/). A hook page should identify:

- whether it is an action or filter;
- parameters and expected types;
- the version in which it was introduced;
- usage notes or examples.

Confirm the hook exists in the Jetpack versions you support.

## Implement the customization

Put production customizations in a maintained plugin or another deployment-controlled code location. Do not edit Jetpack plugin files directly.

<!-- wp:docspress/colorful-code {"language":"php","filename":"my-project/includes/jetpack.php","code":"<?php\n/**\n * Example shape only. Replace the hook and callback contract with the\n * documented Jetpack hook you intend to use.\n */\nfunction my_project_filter_jetpack_value( $value ) {\n\treturn $value;\n}\n\nadd_filter( 'documented_jetpack_filter', 'my_project_filter_jetpack_value' );","highlightedLines":"6-10","showLineNumbers":true,"caption":"Keep the customization outside Jetpack and copy the real hook contract from its current reference page."} /-->

The placeholder hook above is intentionally not runnable. Copy the exact hook name, priority, accepted argument count, and return contract from its documentation.

## Verify the change

1. Test with the customization disabled.
2. Enable it on a local or staging site.
3. Exercise the specific Jetpack feature.
4. Check PHP and browser logs.
5. Test the oldest and newest Jetpack versions you claim to support.
6. Confirm that removing the customization restores default behavior.

If your callback changes data shared with WordPress.com, continue to [Work with connection and data](connection-and-data.md).
