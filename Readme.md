# Tâmia Semantic Release

[![npm](https://img.shields.io/npm/v/semantic-release-tamia.svg)](https://www.npmjs.com/package/semantic-release-tamia)
[![Build Status](https://travis-ci.org/tamiadev/semantic-release-tamia.svg)](https://travis-ci.org/tamiadev/semantic-release-tamia)

Custom [semantic-release](https://github.com/semantic-release/semantic-release) workflow:

* Fully automated PATCH releases.
* MINOR and MAJOR releases requre changelog.
* [Custom commit convention](./Convention.md).
* [Release draft generator](https://github.com/sapegin/dotfiles/blob/master/bin/sr-changelog).

Read more in my article [Automate npm releases with semantic-release and human-written change logs](https://medium.com/@sapegin/automate-npm-releases-with-semantic-release-and-human-written-change-logs-2adb1dce487#.b2w7c0zb2).

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

To release a new version, you'll need to create a commit with `Changelog` type. To simplify the creation of it, add to your `package.json` `scripts` section:

```json
"scripts" {
  "changelog:preview": "sr-changelog",
  "changelog:commit": "sr-changelog commit"
}
```

To generate changelog draft run `npm run changelog:preview`. It will create a file with all important commits for the release grouped by type (breaking changes, new features and bugfixes) and open it in your default editor.

Now you can rewrite your changelog to make it valuable for your users.

To commit changelog run `npm run changelog:commit`. It will make a commit without changes (git commit --allow-empty) of type Changelog and changelog in commit message body.

