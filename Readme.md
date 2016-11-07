# Tâmia Semantic Release

[![Build Status](https://travis-ci.org/tamiadev/semantic-release-tamia.svg)](https://travis-ci.org/tamiadev/semantic-release-tamia)

Custom [https://github.com/semantic-release/semantic-release](semantic-release) workflow:

* Fully automated PATCH releases.
* MINOR and MAJOR releases requre changelog.
* Custom commit convention.

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
