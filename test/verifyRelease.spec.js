const verifyRelease = require('../verifyRelease');

test('return null for patch release', async () => {
	const commits = [
		{
			message: 'Fix: Very cool commit',
		},
	];
	const type = await verifyRelease(
		{},
		{ commits, nextRelease: { type: 'patch' } }
	);
	expect(type).toBe(null);
});

test('return null for changelog commit', async () => {
	const commits = [
		{
			message: 'Changelog:\n\nVery cool commit',
		},
	];
	const type = await verifyRelease(
		{},
		{ commits, nextRelease: { type: 'minor' } }
	);
	expect(type).toBe(null);
});
