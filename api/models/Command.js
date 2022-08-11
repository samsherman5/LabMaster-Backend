const mongoose = require('mongoose');

const CommandSchema = new mongoose.Schema({
	type: {type: Number, required: true},
	content: mongoose.Schema.Types.Buffer,
	targets: [{type: mongoose.Schema.Types.ObjectId, ref: "PC"}],
	dateExecuted: {type: Date, required: true}
});

module.exports = mongoose.model('Command', CommandSchema);
