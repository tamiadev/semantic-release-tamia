const SRError = require('@semantic-release/error');
const gitLatestSemverTag = require('git-latest-semver-tag');
const commitsBetween = require('commits-between');
const indent = require('indent');
const isChangelog = require('./util').isChangelog;

const removeHeader = text => text.substring(text.indexOf('\n') + 1).trim();

const isFix = commit => commit.startsWith('Fix:');

const highlightTag = text => text.replace(/^Fix:/, '**Fixed:**');

const formatListItem = text => '* ' + indent(text, 2).trim();

const asList = items => items.map(formatListItem).join('\n');

module.exports = (pluginConfig, config, cb) => {
	gitLatestSemverTag((err, tag) => {
		if (err) {
			cb(new SRError(`Cannot get latest semver tag: ${err}`));
			return;
		}

		commitsBetween({ from: tag })
			.then(
				commits => {
					const lastCommit = commits[0].subject;

					// Last commit is a changelog commit
					if (isChangelog(lastCommit)) {
						cb(null, removeHeader(lastCommit));
						return;
					}

					// Patch release: just list all fixes
					const fixes = commits
						.map(commit => commit.subject)
						.filter(isFix)
						.map(highlightTag)
					;
					cb(null, asList(fixes));
				},
				err => {
					cb(new SRError(`Cannot get commits list: ${err}`));
				}
			)
		;
	});
}
