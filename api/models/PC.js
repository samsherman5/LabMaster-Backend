const mongoose = require('mongoose');

const PCSchema = new mongoose.Schema({
	name: {type: String, required: true},
	firstOnline: {type: mongoose.Schema.Types.Date, required: true},
	lastOnline: {type: mongoose.Schema.Types.Date, required: true}
});

module.exports = mongoose.model('PC', PCSchema);
