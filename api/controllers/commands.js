const mongoose = require('mongoose');
const Command = require('../models/Command');

exports.commands_get_all = async (req, res, next) => {
	await Command.find()
		.select('_id type content targets dateExecuted')
		.exec()
		.then(docs => {
			const response = {
				count: docs.length,
				commands: docs.map(doc => {
					return {
						_id: doc._id,
						type: doc.type,
						target: doc.target,
						content: doc.content,
						executed: doc.executed,
						dateExecuted: doc.dateSent
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



exports.create_command = async (req, res, next) => {
	const command = new Command({
		type: req.body.type,
		target: req.body.target,
		content: req.body.content,
		executed: false,
		dateSent: new Date()
	});
	await command.save()
		.then(result => {
			res.status(201).json({
				message: 'Created command',
				createdCommand: {
					_id: result._id,
					type: result.type,
					target: result.target,
					content: result.content,
					dateSent: result.dateSent
				}
			});
		})
		.catch(err => {
			const error = new Error(err);
			error.status = 500;
			next(error);
		});
};
