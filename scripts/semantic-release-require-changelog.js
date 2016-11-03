const SRError = require('@semantic-release/error');
const isChangelog = require('./util').isChangelog;

module.exports = (pluginConfig, config, cb) => {
	const type = config.nextRelease.type;
	const lastCommit = config.commits[0].message;

	// Publish PATCH or initial release automatically
	if (type === 'patch' || type === 'initial') {
		cb(null);
		return;
	}

	// Publish MAJOR or MINOR only when the latest commit is a changelog commit
	if (isChangelog(lastCommit)) {
		cb(null);
		return;
	}

	cb(new SRError(
		`No changelog commit for this ${type} release found and therefore a new version won’t be published:` +
		`To make a realease add a commit with a "Changelog:" tag and release notes in its body.`
	));
};
