# Tâmia Semantic Release

[![npm](https://img.shields.io/npm/v/semantic-release-tamia.svg)](https://www.npmjs.com/package/semantic-release-tamia) [![Build Status](https://travis-ci.org/tamiadev/semantic-release-tamia.svg)](https://travis-ci.org/tamiadev/semantic-release-tamia)

Custom [semantic-release](https://github.com/semantic-release/semantic-release) workflow:

- Fully automated PATCH and MINOR releases.
- MAJOR releases require a changelog.
- [Custom commit convention](./Convention.md).
- [Release draft generator](https://github.com/tamiadev/tamia-changelog).

Read more in my article [Automate npm releases with semantic-release and human-written changelogs](http://blog.sapegin.me/all/semantic-release).

## Installation

First [install semantic-release](https://github.com/semantic-release/semantic-release#setup).

Then:

```
npm install --save-dev semantic-release-tamia
```

Add to your `package.json`:

```json
"release": {
  "analyzeCommits": "semantic-release-tamia/analyzeCommits",
  "generateNotes": "semantic-release-tamia/generateNotes",
  "verifyRelease": "semantic-release-tamia/verifyRelease"
}
```

## Release process

To release a new version, you’ll need to create a commit with `Changelog` type. To simplify the creation of it use [tamia-changelog](https://github.com/tamiadev/tamia-changelog).

To generate a changelog draft run `tamia-changelog`. It will create a file with all important commits for the release grouped by type (breaking changes, new features and bugfixes) and open it in your default editor.

Now you can rewrite your changelog to make it valuable for your users.

To commit the changelog, run `tamia-changelog commit`. It will make a commit without changes (`git commit --allow-empty`) with a `Changelog` tag and the changelog text in commit message’s body.
