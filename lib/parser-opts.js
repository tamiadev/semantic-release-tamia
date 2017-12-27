'use strict';

module.exports = {
	// Type: Change description
	// Type(scope): Change description
	headerPattern: /^(\w*)(?:\((.*)\))?\: (.*)$/,
	headerCorrespondence: [`type`, `scope`, `subject`],
	noteKeywords: [`BREAKING CHANGE`, `BREAKING CHANGES`],
};
