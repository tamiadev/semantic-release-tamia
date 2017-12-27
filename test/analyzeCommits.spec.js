const analyzeCommits = require('../analyzeCommits');

test('Fix -> patch release', async () => {
	const commits = [
		{
			message:
				'Fix(zzz): Very cool commit\n' +
				'bla bla bla\n\n' +
				'Closes #2, #3. Resolves #4. Fixes #5. Fixes #6.\n' +
				'What not ?\n',
		},
	];
	const type = await analyzeCommits({}, { commits });
	expect(type).toBe('patch');
});

test('Feat -> minor release', async () => {
	const commits = [
		{
			message:
				'Feat(ng-list): Allow custom separator\n' +
				'bla bla bla\n\n' +
				'Closes #123\nCloses #25\nFixes #33\n',
		},
	];
	const type = await analyzeCommits({}, { commits });
	expect(type).toBe('minor');
});

test('Breaking changes -> major release', async () => {
	const commits = [
		{
			message:
				'Feat(scope): Broadcast $destroy event on scope destruction\n' +
				'bla bla bla\n\n' +
				'BREAKING CHANGE:\n\nSome breaking change\n',
		},
	];
	const type = await analyzeCommits({}, { commits });
	expect(type).toBe('major');
});
