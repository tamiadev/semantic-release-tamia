const generateNotes = require('../generateNotes');

test('Generate list of fixes', async () => {
	const commits = [
		{
			message: 'Fix: Very cool commit',
		},
		{
			message: 'Fix(zzz): Another cool commit',
		},
	];
	const result = await generateNotes({}, { commits });
	expect(result).toMatchSnapshot();
});

test('Return commit body for change log commits', async () => {
	const commits = [
		{
			message: 'Changelog: X\n\nMy amazing changelog',
		},
	];
	const result = await generateNotes({}, { commits });
	expect(result).toMatchSnapshot();
});
