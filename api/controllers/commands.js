const mongoose = require('mongoose');
const Command = require('../models/Command');

exports.commands_get_all = (req, res, next) => {
	Command.find()
		.select('_id type content targets dateExecuted')
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				commands: docs.map(doc => {
					return {
						_id: doc._id,
						type: doc.type,
						content: doc.content,
						targets: doc.targets,
						dateExecuted: doc.dateExecuted
					};
				})
			};
			res.status(200).json(response);
		})
		.catch(err => {
			const error = new Error(err);
			error.status = 500;
			next(error);
		});
};


exports.create_command = (req, res, next) => {
	const command = new Command({
		type: req.body.type,
		content: req.body.content,
		targets: req.body.targets,
		dateExecuted: new Date()
	});
	command.save()
		.then(result => {
			res.status(201).json({
				message: 'Created command',
				createdCommand: {
					_id: result._id,
					type: result.type,
					content: result.content,
					targets: result.targets,
					dateExecuted: result.dateExecuted
				}
			});
		})
		.catch(err => {
			const error = new Error(err);
			error.status = 500;
			next(error);
		});
};
