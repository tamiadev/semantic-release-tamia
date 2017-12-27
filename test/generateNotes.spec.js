const generateNotes = require('../generateNotes');

test('Generate list of fixes', async () => {
	const commits = [
		{
			subject: 'Fix: Very cool commit',
		},
		{
			subject: 'Fix(zzz): Another cool commit',
		},
	];
	const result = await generateNotes({}, { commits });
	expect(result).toMatchSnapshot();
});

test('Return commit body for change log commits', async () => {
	const commits = [
		{
			subject: 'Changelog:',
			body: 'My amazing changelog',
		},
	];
	const result = await generateNotes({}, { commits });
	expect(result).toMatchSnapshot();
});
