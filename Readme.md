# Tâmia Semantic Release

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
