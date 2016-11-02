const isChangelog = commit => commit.startsWith('Changelog:');

module.exports = {
	isChangelog,
};
