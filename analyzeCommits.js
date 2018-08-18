const conventionalCommitsParser = require('conventional-commits-parser').sync;
const parserOpts = require('./lib/parser-opts');

const TYPE_FEATURE = 'Feat';
const TYPE_FIX = 'Fix';

const is = (a, b) => (a || '').toUpperCase() === (b || '').toUpperCase();

const hasBreakingChanges = commit =>
	commit.notes &&
	!!commit.notes.find(c =>
		parserOpts.noteKeywords.includes(c.title.toUpperCase())
	);

async function analyzeCommits(pluginConfig, config) {
	let type;

	config.commits
		.map(commit => conventionalCommitsParser(commit.message, parserOpts))
		.filter(commit => !!commit)
		.every(commit => {
			if (hasBreakingChanges(commit)) {
				type = 'major';
				return false;
			}

			if (is(commit.type, TYPE_FEATURE)) {
				type = 'minor';
			}

			if (!type && is(commit.type, TYPE_FIX)) {
				type = 'patch';
			}

			return true;
		});

	return type;
}

module.exports = analyzeCommits;
