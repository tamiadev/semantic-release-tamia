const SRError = require('@semantic-release/error');
const { isChangelog } = require('./lib/util');

async function verifyRelease(pluginConfig, { commits, nextRelease }) {
	const type = nextRelease.type;
	const lastCommit = commits[0].message;

	// Publish PATCH or initial release automatically
	if (type === 'patch' || type === 'initial') {
		return null;
	}

	// Publish MAJOR or MINOR only when the latest commit is a changelog commit
	if (isChangelog(lastCommit)) {
		return null;
	}

	return new SRError(
		`No changelog commit for this ${type} release found and therefore a new version won’t be published:\n` +
			`To make a realease add a commit with a "Changelog:" tag and release notes in its body.`
	);
}

module.exports = verifyRelease;
