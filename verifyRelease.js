const { isChangelog } = require('./lib/util');

async function verifyRelease(pluginConfig, { commits, nextRelease }) {
	const type = nextRelease.type;
	const lastCommit = commits[0].message;

	// Publish PATCH, MINOR or initial releases automatically
	if (type === 'patch' || type === 'minor' || type === 'initial') {
		return null;
	}

	// Publish MAJOR releases only when the latest commit is a changelog commit
	if (isChangelog(lastCommit)) {
		return null;
	}

	console.log(
		`No changelog commit for this ${type} release found and therefore a new version won’t be published:`
	);
	console.log(
		`To make a release, add a commit with a "Changelog:" tag and release notes in its body.`
	);
	process.exit(0);
}

module.exports = verifyRelease;
