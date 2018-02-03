const indent = require('indent');
const { isChangelog } = require('./lib/util');

const isFix = commit => commit.startsWith('Fix:') || commit.startsWith('Fix(');

const highlightTag = text => text.replace(/^Fix(:|\(.*?\))/, '**Fixed:**');

const formatListItem = text => '* ' + indent(text, 2).trim();

const asList = items => items.map(formatListItem).join('\n');

const getBody = commit => commit.split('\n\n').pop();

async function releaseNotesGenerator(pluginConfig, { commits }) {
	const lastCommit = commits[0];

	// Last commit is a changelog commit
	if (isChangelog(lastCommit.message)) {
		return getBody(lastCommit.message);
	}

	// Patch release: just list all fixes
	const fixes = commits
		.map(commit => commit.message)
		.filter(isFix)
		.map(highlightTag);

	return asList(fixes);
}

module.exports = releaseNotesGenerator;
