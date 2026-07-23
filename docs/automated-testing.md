---
title: "Run automated tests"
description: "Choose and run the Jetpack automated test suite that covers a code change."
audience: "Jetpack contributors"
document_type: how-to
sidebar_position: 20
---
Choose the narrowest test that proves the behavior, then add broader coverage for integration risk.

## Choose a test level

| Need to prove | Prefer |
| --- | --- |
| A PHP function or class behaves correctly in isolation | PHPUnit unit test |
| PHP code works with WordPress or another public contract | PHPUnit integration test |
| A React component or JavaScript utility behaves correctly | Jest or Node test |
| A block edits, saves, migrates, and renders correctly | Block fixture, component, and editor tests |
| A complete browser workflow works across systems | End-to-end test |

## Run a project test

From the monorepo root, use the Jetpack CLI:

<!-- wp:docspress/terminal-session {"title":"Run one project test type","shell":"bash","prompt":"$","command":"jetpack test [test] [project]","output":""} /-->

Examples:

<!-- wp:docspress/terminal-session {"title":"Run representative focused checks","shell":"bash","prompt":"$","command":"jetpack test php packages/connection\njetpack test js plugins/jetpack\njetpack test typecheck packages/my-jetpack","output":""} /-->

Read the project-level `composer.json`, `package.json`, `README.md`, and `AGENTS.md` before assuming a test name. Use the [monorepo testing reference](monorepo.md#testing) for CI configuration and coverage.

<!-- wp:docspress/result {"status":"neutral","title":"Record what each command proved","content":"<p>A passing focused test proves only the behavior and environment it exercised. Include the exact command, project path, runtime state, and any skipped test type in the pull-request evidence.</p>","meta":"command · project · result · remaining risk"} /-->

## PHPUnit tests

Use PHPUnit for PHP code in plugins and packages. Unit tests isolate a function or class; integration tests exercise WordPress or another public dependency.

### Unit tests

Use a unit test when the behavior can run without WordPress, a database, or a network service. Fast isolated tests encourage smaller and more testable code.

Read the [current PHPUnit manual](https://docs.phpunit.de/) and inspect an existing test in the affected project. The [A8C MC Stats tests](https://github.com/Automattic/jetpack/blob/trunk/projects/packages/a8c-mc-stats/tests/php/StatsTest.php) provide one repository example.

Follow Jetpack's code style even when an external example uses another convention.

### Integration tests

Use an integration test for code that interacts with WordPress functions, an API contract, or a database. It is slower than a unit test but usually faster and more focused than a browser test.

There are normally two reasons why you would choose integration over unit tests:

- Code is coupled to WordPress and cannot be tested meaningfully in isolation.
- You want to test how the units interact with each other, to verify that public APIs work as expected.

Common tools include:

- [Brain Monkey](https://packagist.org/packages/brain/monkey) for mocking and stubbing WordPress functions and classes.
- [Jetpack Test Environment](https://github.com/Automattic/jetpack/blob/trunk/projects/packages/test-environment/README.md) for a shared lightweight WordPress installation based on [WorDBless](https://packagist.org/packages/automattic/wordbless).

The [Connection package integration test](https://github.com/Automattic/jetpack/blob/trunk/projects/packages/connection/tests/php/ManagerIntegrationTest.php) is one example.

## JavaScript tests

Use the test runner and Testing Library packages already configured by the affected project.

### React components

Test behavior visible to a user instead of component implementation details. See the [React Testing Library introduction](https://testing-library.com/docs/react-testing-library/intro/) and nearby tests in the affected project.

### Gutenberg blocks

Start with the [Block Editor testing overview](https://developer.wordpress.org/block-editor/contributors/code/testing-overview/). A block can need:

- [Fixture validation tests](https://github.com/Automattic/jetpack/blob/trunk/projects/plugins/jetpack/extensions/shared/test/block-fixtures.md) for saved output and migrations.
- Edit tests for editor behavior.
- Controls tests for block settings.

The [Subscriptions block tests](https://github.com/Automattic/jetpack/tree/trunk/projects/plugins/jetpack/extensions/blocks/subscriptions/test) contain examples.

## End-to-end tests

Use an end-to-end test for a critical browser workflow that crosses components or systems and cannot be proved adequately at a lower level.

Read the [end-to-end test documentation](https://github.com/Automattic/jetpack/blob/trunk/tools/e2e-commons/README.md) for setup and project conventions.
