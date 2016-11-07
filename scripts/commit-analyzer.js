'use strict';

const parseRawCommit = require('conventional-changelog/lib/git').parseRawCommit;

module.exports = (pluginConfig, config, cb) => {
	let type;

	config.commits
		.map(commit => parseRawCommit(`${commit.hash}\n${commit.message}`))
		.filter(commit => !!commit)
		.every(commit => {
			if (commit.breaks.length) {
				type = 'major';
				return false;
			}

			if (commit.type === 'Feat') {
				type = 'minor';
			}

			if (!type && commit.type === 'Fix') {
				type = 'patch';
			}

			return true;
		})
	;

	cb(null, type);
};
