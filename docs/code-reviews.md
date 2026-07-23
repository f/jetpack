---
title: "Review Jetpack code"
description: "Use Jetpack review expectations to give and respond to actionable pull-request feedback."
audience: "Jetpack contributors"
document_type: how-to
sidebar_position: 30
---
Code reviews are an important part of the Jetpack workflow. They help to keep code quality consistent, and they help every person working on Jetpack learn and improve over time. We want to make you the best Jetpack contributor you can be.

Every PR should be reviewed and approved by someone other than the author, even if the author has write access. Fresh eyes can find problems that can hide in the open if you’ve been working on the code for a while.

## Prepare a reviewable pull request

As the author:

1. Keep the change focused.
2. Explain the problem and the chosen approach.
3. Link the issue or requirement.
4. Include automated and manual test evidence.
5. Add screenshots or recordings for visible changes.
6. Call out compatibility, rollout, migration, and follow-up work.
7. Review your own diff before requesting another person.

## Find a reviewer

Look for recent maintainers of the affected project or use [Git blame](https://docs.github.com/en/repositories/working-with-files/using-files/viewing-a-file#viewing-the-line-by-line-revision-history-for-a-file) to identify people familiar with the code. Prefer project ownership and recent context over the largest number of historical commits.

Then, you may ask that person to review your code by mentioning their GitHub username on the PR comments like this:

<!-- wp:docspress/colorful-code {"language":"plaintext","filename":"Pull-request comment","code":"cc @username","highlightedLines":"","showLineNumbers":false,"caption":"Mention a reviewer who owns or recently changed the affected area, and include the specific review question."} /-->

## Review the change

Check:

- whether the implementation satisfies the stated requirement;
- regressions and affected consumers;
- public API and backward compatibility;
- security, permissions, escaping, and data handling;
- accessibility and responsive behavior;
- performance and failure states;
- tests, documentation, translations, changelog entries, and generated artifacts.

Make feedback actionable. State the observed problem, why it matters, and a way to reproduce or verify it. Separate required changes from suggestions and questions.

Everyone is encouraged to review pull requests and ask questions, including new contributors. Reading outside your immediate project helps reveal shared patterns and assumptions.

## Respond to review

As the author:

- answer questions with evidence;
- update tests when review reveals an uncovered contract;
- explain when you choose a different solution;
- resolve threads only after the concern is addressed or explicitly closed;
- summarize substantial changes for the next review pass.

Whether somebody is reviewing your code or you are reviewing somebody else’s code, [a positive mindset towards code reviews](https://medium.com/medium-eng/the-code-review-mindset-3280a4af0a89) helps a ton. We’re building something together that is greater than the sum of its parts.
