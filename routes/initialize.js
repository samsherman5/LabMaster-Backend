var express = require('express');
const app = require("../app");
const gen = require("../crypto/tokengen");
var router = express.Router();

/* COMPUTER INTIT ROUTE */
/*
body: {
	PC_NAME:
	tstamp:
}
May add pubKey here
 */
router.post('/', function(req, res, next) {
	if(req.body.name && req.body.tstamp){
		FLEETDB_DEV.push({name: req.body.name, token: gen(), tstamp: req.body.tstamp});
		res.send(FLEETDB_DEV[FLEETDB_DEV.length-1]);
	} else {
		res.status(404);
	}
});

module.exports = router;
