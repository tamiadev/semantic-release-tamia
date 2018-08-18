# Commit message conventions

## Format of the commit message

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Only **type** and **subject** are required.

## Types

- **Feat** — new feature;
- **Fix** — bug fix;
- **Docs** — documentation;
- **Style** — formatting, missing semicolons, etc.;
- **Refactor** — refactoring;
- **Test** — missing tests;
- **Chore** — maintenance: update dependencies, build, etc.;
- **Changelog** — changelog for MINOR and MAJOR release.

## Scope

Scope can be anything specifying place of the commit change. For example $location, $browser, $compile, $rootScope, ngHref, ngClick, ngView, etc...

## Subject

This is a very short description of the change.

- Use imperative, present tense: “change” not “changed” nor “changes”.
- _Capitalize_ first letter.
- No dot (.) at the end.

## Message body

- Just as in subject use imperative, present tense: “change” not “changed” nor “changes”.
- Includes motivation for the change and contrasts with previous behavior.

## Message footer

### Breaking changes

All breaking changes have to be mentioned as a breaking change block in the footer, which should start with the word BREAKING CHANGE: with a space or two newlines. The rest of the commit message is then the description of the change, justification and migration notes.

## Referencing issues

Closed bugs should be listed on a separate line in the footer prefixed with "Closes" keyword like this:

`Closes #234`

or in case of multiple issues:

`Closes #123, #245, #992`.

## Examples

- `Fix: Do not render empty component list`
- `Docs: Document subsections, add better examples`
- `Chore: Update deps`

```
Feat: Awesome new feature

Short description of a feature.

BREAKING CHANGE: Awesome old feature was removed, use awesome new feature instead.
```

---

Based on [AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.uyo6cb12dt6w).
