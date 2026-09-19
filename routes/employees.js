const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employees');

router.get('/', employeesController.getAll);
router.get('/:id', employeesController.getSingle);

module.exports = router;