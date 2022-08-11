const express = require('express');
const app = require("../../app");
const gen = require("../../crypto/tokengen");
const router = express.Router();

const PCController = require('../controllers/pcs')
/* COMPUTER INTIT ROUTE */
/*
body: {
	PC_NAME:
	tstamp:
}
May add pubKey here
 */
router.post('/', PCController.add_pc);

module.exports = router;
