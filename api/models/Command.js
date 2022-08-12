const mongoose = require('mongoose');

const CommandSchema = new mongoose.Schema({
	type: {type: Number, required: true},
	target: {type: mongoose.Schema.Types.ObjectId, ref: "PC", required: true},
	content: String,
	executed: Boolean,
	dateSent: {type: Date, required: true}
});

module.exports = mongoose.model('Command', CommandSchema);
