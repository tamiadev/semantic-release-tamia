'use strict';

const conventionalCommitsParser = require('conventional-commits-parser');

const BREAKING_MARKER = 'BREAKING CHANGE';
const TYPE_FEATURE = 'Feat';
const TYPE_FIX = 'Fix';

const is = (a, b) => (a || '').toUpperCase() === (b || '').toUpperCase();

const hasBreakingChanges = commit => commit.notes && !!commit.notes.find(c => c.title === BREAKING_MARKER);

module.exports = (pluginConfig, config, cb) => {
	let type;

	config.commits
		.map(commit => conventionalCommitsParser.sync(commit.message))
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
		})
	;

	cb(null, type);
};
