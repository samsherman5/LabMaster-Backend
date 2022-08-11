const mongoose = require('mongoose');
const PC = require('../models/PC');

exports.add_pc = (req, res, next) => {
	const pc = new PC({
		name: req.body.name,
		firstOnline: new Date(),
		lastOnline: new Date(),
	});
	pc.save()
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

exports.ping_pc = (req, res, next) => {
	PC.findOneAndUpdate({_id: req.headers.id}, {lastOnline: new Date()})
		.then(result => {
			res.status(204).json({
				message: 'Pinged Successfully',
				currPC: {
					_id: result._id,
					name: result.name,
					lastOnline: result.lastOnline
				}
			});
		})
		.catch(err => {
			const error = new Error(err);
			error.status = 500;
			next(error);
		});
}
