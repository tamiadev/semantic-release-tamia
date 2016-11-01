const changelog = require('conventional-changelog');
const parseUrl = require('github-url-from-git');

module.exports = (pluginConfig, config, cb) => {
	console.log('!@# release-notes-generator', config);

	const pkg = config.pkg;
	const repository = pkg.repository ? parseUrl(pkg.repository.url) : null

	changelog({
		version: pkg.version,
		repository: repository,
		file: false
	}, cb);
}
