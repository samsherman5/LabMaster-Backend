const express = require('express');
const router = express.Router();

const PCController = require('../controllers/pcs');

/* COMPUTER PING ROUTE */
/*
body: {
	mac:
	tstamp:
}
 */
router.get('/', PCController.ping_pc);

module.exports = router;
