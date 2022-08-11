const express = require('express');
const router = express.Router();

const CommandsController = require('../controllers/commands');

router.post('/', CommandsController.create_command)

module.exports = router;
