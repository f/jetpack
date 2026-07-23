---
title: "Contribution guide"
description: "Choose a way to contribute to Jetpack and follow the community and submission expectations."
audience: "Jetpack contributors"
document_type: overview
sidebar_position: 5
---

You can contribute code, tests, documentation, bug reports, translations, and release feedback.

## Choose a contribution path

| Contribution | Start here |
| --- | --- |
| Test a pre-release build | [Test a Jetpack beta](testing/beta-testing.md) |
| Report a reproducible defect | [Create a useful bug report](guides/report-bugs.md) |
| Fix a bug or build an enhancement | [Start Jetpack development](quick-start.md) |
| Improve documentation | Edit the relevant Markdown page and follow the [documentation writing model](reference/documentation-map.md) |
| Translate Jetpack | [Translate Jetpack](translations.md) |

If you are not sure where to begin, look for [`[Type] Good First Bug`](https://github.com/Automattic/jetpack/labels/%5BType%5D%20Good%20First%20Bug) or [`Good For Community`](https://github.com/Automattic/jetpack/issues?q=is%3Aopen+sort%3Aupdated-desc+label%3A%22Good+For+Community%22) issues.

## Submit a code or documentation change

1. Read the repository and project-level `AGENTS.md` files that apply to your change.
2. Complete the [quick start](quick-start.md) or [full development environment](development-environment.md).
3. Follow the [Git workflow](git-workflow.md).
4. Make one focused change.
5. Run the relevant [automated tests](automated-testing.md) and manual checks.
6. Add a [changelog entry](writing-a-good-changelog-entry.md) when required.
7. Open a pull request and include the problem, approach, and verification evidence.
8. Work through [code review](code-reviews.md).

Ask questions in the issue or pull request when a requirement or project convention is unclear.

## Report security issues privately

Do not open a public issue for a suspected vulnerability. Follow the repository [security policy](https://github.com/Automattic/jetpack/blob/trunk/SECURITY.md) and use the Automattic HackerOne program.

## License

Jetpack is licensed under the [GNU General Public License v2 or later](https://github.com/Automattic/jetpack/blob/trunk/LICENSE.txt).

Contributed material must be compatible with GPLv2. If you add code or a dependency that you did not author:

1. Confirm that it has an explicit license.
2. Confirm that the license is [GPLv2 compatible](https://www.gnu.org/licenses/license-list.en.html#GPLCompatibleLicenses).
3. Preserve required notices and attribution.
4. Ask maintainers before adding a new dependency when compatibility or maintenance is unclear.
