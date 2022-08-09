var express = require('express');
var router = express.Router();

/* COMPUTER PING ROUTE */
/*
body: {
	mac:
	tstamp:
}
 */
router.post('/', function(req, res, next) {
	res.status(200);
	res.send(req.body)


});

module.exports = router;
