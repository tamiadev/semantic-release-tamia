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

test.each([
	'Feat(ng-list): Allow custom separator\n' +
		'bla bla bla\n\n' +
		'Closes #123\nCloses #25\nFixes #33\n',
	'Feat(scope): Broadcast $destroy event on scope destruction\n\n' +
		'There are no BREAKING CHANGES in this commmit\n',
	'Feat(scope): Broadcast $destroy event on scope destruction\n\n' +
		'There are no BREAKING CHANGES: in this commmit\n',
])('Feat -> minor release', async message => {
	const commits = [
		{
			message,
		},
	];
	const type = await analyzeCommits({}, { commits });
	expect(type).toBe('minor');
});

test.each([
	'Feat(scope): Broadcast $destroy event on scope destruction\n' +
		'bla bla bla\n\n' +
		'BREAKING CHANGE:\n\nSome breaking change\n',
	'Feat(scope): Broadcast $destroy event on scope destruction\n\n' +
		'BREAKING CHANGES:\n\nSome breaking change\n',
	'Feat(scope): Broadcast $destroy event on scope destruction\n\n' +
		'BREAKING CHANGES:\nSome breaking change\n',
	'Feat(scope): Broadcast $destroy event on scope destruction\n\n' +
		'BREAKING CHANGE: Some breaking change\n',
	'Feat(scope): Broadcast $destroy event on scope destruction\n\n' +
		'Breaking change: Some breaking change\n',
	'Feat(scope): Broadcast $destroy event on scope destruction\n\n' +
		'Breaking changes: Some breaking change\n',
	'Feat(scope): Broadcast $destroy event on scope destruction\n\n' +
		'  BREAKING CHANGE: Some breaking change\n',
])('Breaking changes -> major release', async message => {
	const commits = [
		{
			message,
		},
	];
	const type = await analyzeCommits({}, { commits });
	expect(type).toBe('major');
});
