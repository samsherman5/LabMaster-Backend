const mongoose = require('mongoose');
const PC = require('../models/PC');
const Command = require("../models/Command");

exports.add_pc = async (req, res, next) => {
	const pc = new PC({
		name: req.body.name,
		firstOnline: new Date(),
		lastOnline: new Date(),
	});
	await pc.save()
		.then(result => {
			res.status(201).json({
				message: 'PC Added',
				addedPC: {
					_id: result._id,
					name: result.name,
				}
			});
		})
		.catch(err => {
			const error = new Error(err);
			error.status = 500;
			next(error);
		});
}

exports.ping_pc = async (req, res, next) => {
	if(!req.headers.id){
		const error = new Error();
		error.status = 400;
		next(error);
	}

	const commandsForComputer = await Command.find({target: req.headers.id, executed: false})
		.select('_id type content executed dateSent')
		.exec()
		.then(docs => {
			return {
				count: docs.length,
				commands: docs.map(doc => {
					return {
						_id: doc._id,
						type: doc.type,
						content: doc.content,
						executed: doc.executed,
						dateExecuted: doc.dateSent
					};
				})
			};
		})
		.catch(err => {
			const error = new Error(err);
			error.status = 500;
			next(error);
		});

	await Command.updateMany({target: req.headers.id, executed: false}, {executed: true});

	await PC.findOneAndUpdate({_id: req.headers.id}, {lastOnline: new Date()})
		.then(result => {
			res.status(200).json({
				message: 'Pinged Successfully',
				commandsResult: commandsForComputer
			});
		})
		.catch(err => {
			const error = new Error(err);
			error.status = 500;
			next(error);
		});


}
