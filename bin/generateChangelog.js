#!/usr/bin/env node

/*
 * 1. Generates a changelog and opens it in the default editor.
 * 2. Commits a changelog as a commit message.
 *
 * Usage:
 *   sr-changelog [commit]
 *
 * Author: Artem Sapegin, sapegin.me
 * License: MIT
 * https://github.com/sapegin/dotfiles
 *
 */

const fs = require('fs');
const path = require('path');
const opn = require('opn');
const git = require('git-lib');
const gitLatestSemverTag = require('git-latest-semver-tag');
const commitsBetween = require('commits-between');
const conventionalCommitsParser = require('conventional-commits-parser');

const CHANGELOG_FILE = 'Changelog.md';
const BREAKING_MARKER = 'BREAKING CHANGE';
const TYPE_FEATURE = 'Feat';
const TYPE_FIX = 'Fix';
const TYPE_CHANGELOG = 'Changelog';
const SECTION_BREAKING = 'breaking';
const SECTION_FEATURE = 'feature';
const SECTION_FIX = 'fix';
const SECTION_TITLES = {
  [SECTION_BREAKING]: 'Breaking changes',
  [SECTION_FEATURE]: 'New features',
  [SECTION_FIX]: 'Bug fixes',
};

const renderSection = ({ title, changes }) => trim(`
## ${title}

${changes.join('\n\n')}
`);

const renderChange = ({ subject, body, footer }) => trim(`
### ${subject}

${body || ''}

${footer ? footer.replace(`${BREAKING_MARKER}:`, '') : ''}
`);

const trim = text => text.replace(/\n\n+/g, '\n\n').trim();

const is = (a, b) => (a || '').toUpperCase() === (b || '').toUpperCase();

const hasBreakingChanges = commit => commit.notes && !!commit.notes.find(({ title }) => title === BREAKING_MARKER);

function error(message) {
  console.error(message);
  process.exit(1);
}

function usage() {
  const appName = path.basename(process.argv[1]);
  return `
Usage:
  ${appName} [commit]
  `.trim();
}

function parseCommits(commits, cb) {
  const changes = commits
      .map(parseCommit)
      .filter(commit => commit && commit.type)
      .reduce((changes, commit) => {
        changes[commit.type].push(commit);
        return changes;
      }, {
        [SECTION_BREAKING]: [],
        [SECTION_FEATURE]: [],
        [SECTION_FIX]: [],
      })
    ;
  cb(null, changes);
}

function parseCommit(commit) {
  const parsed = conventionalCommitsParser.sync(`${commit.subject}\n\n${commit.body}`);
  return Object.assign({}, parsed, {
    type: getCommitType(parsed),
  });
}

function getCommitType(commit) {
  if (hasBreakingChanges(commit)) {
    return SECTION_BREAKING;
  }
  else if (is(commit.type, TYPE_FEATURE)) {
    return SECTION_FEATURE;
  }
  else if (is(commit.type, TYPE_FIX)) {
    return SECTION_FIX;
  }
  return null;
}

function generateChangelog(changes) {
  return generateSections(changes).join('\n\n');
}

function generateSections(changes) {
  return Object.keys(changes).reduce((sections, type) => {
    const sectionChanges = changes[type];
    if (sectionChanges.length) {
      sections.push(generateSection(SECTION_TITLES[type], sectionChanges));
    }
    return sections;
  }, []);
}

function generateSection(title, commits) {
  const changes = commits.map(renderChange);
  return renderSection({ title, changes });
}

function buildChangelog() {
  gitLatestSemverTag((err, tag) => {
    if (err) {
      error(err);
    }

    console.log(`Generating changelog since ${tag}...`);

    commitsBetween({ from: tag })
      .then(
        commits => {
          console.log(`${commits.length} commits found.`);
          if (!commits.length) {
            return;
          }

          parseCommits(commits, (err, changes) => {
            if (err) {
              error(err);
            }

            const changelog = generateChangelog(changes);

            fs.writeFileSync(CHANGELOG_FILE, changelog);
            opn(CHANGELOG_FILE, { wait: false });
          });
        },
        error
      )
    ;
  });
}

function commitChangelog() {
  if (!fs.existsSync(CHANGELOG_FILE)) {
    error(`Changelog file not found: "${CHANGELOG_FILE}".`);
  }

  console.log('Commiting changelog...');

  const changelog = fs.readFileSync(CHANGELOG_FILE, 'utf8');
  git.commit(`${TYPE_CHANGELOG}: 🚀\n\n${changelog}`, '--allow-empty')
  console.log('Done.');
  console.log('');
  console.log('Don’t forget to push!');
}

const command = process.argv[2];
if (command) {
  if (command === 'commit') {
    commitChangelog();
  }
  else {
    error(`Unknown command "${command}".\n\n${usage()}`);
  }
}
else {
  buildChangelog();
}
