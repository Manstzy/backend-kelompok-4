const express = require('express');
const { register } = require('../controllers/userController');
const { regisValidator } = require('../middlewares/validator');

const router = express.Router();

router.post('/register', regisValidator, register);

module.exports = router;
