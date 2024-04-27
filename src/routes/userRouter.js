const express = require('express');
const { register, login } = require('../controllers/userController');
const { regisValidator, loginValidator } = require('../middlewares/validator');

const router = express.Router();

router.post('/register', regisValidator, register);
router.post('/login', loginValidator, login);

module.exports = router;
