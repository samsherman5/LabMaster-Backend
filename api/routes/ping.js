const express = require('express');
const router = express.Router();

const PCController = require('../controllers/pcs');

/* COMPUTER PING ROUTE */
/*
headers:{
	random http headers...
	id: pc id
}
 */
router.get('/', PCController.ping_pc);

module.exports = router;
