const indent = require('indent');
const { isChangelog } = require('./lib/util');

const isFix = commit => commit.startsWith('Fix:') || commit.startsWith('Fix(');

const highlightTag = text => text.replace(/^Fix(:|\(.*?\))/, '**Fixed:**');

const formatListItem = text => '* ' + indent(text, 2).trim();

const asList = items => items.map(formatListItem).join('\n');

async function releaseNotesGenerator(pluginConfig, { commits }) {
	console.log('GGGGGGG', commits);
	const lastCommit = commits[0];

	throw new Error('xxxx');

	// Last commit is a changelog commit
	if (isChangelog(lastCommit.subject)) {
		return lastCommit.body;
	}

	// Patch release: just list all fixes
	const fixes = commits
		.map(commit => commit.subject)
		.filter(isFix)
		.map(highlightTag);

	return asList(fixes);
}

module.exports = releaseNotesGenerator;
