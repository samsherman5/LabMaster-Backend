const crypto = require('crypto');

const gen = () => {
	return crypto.randomBytes(64).toString("base64");
};

module.exports = gen;
