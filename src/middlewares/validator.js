const validator = require('validator');
const bcrypt = require('bcrypt');
const { users } = require('../models');

const regisValidator = async (req, res, next) => {
  const {
    firstName,
    userName,
    email: userEmail,
    password: userPassword,
  } = req.body;

  if (!firstName || !userName || !userPassword || !userEmail) {
    return res.status(400).send({
      message: 'Register failed, field must not empty',
    });
  }

  const isValidEmail = validator.isEmail(userEmail, {
    host_whitelist: ['gmail.com'],
  });
  if (!isValidEmail) {
    return res.status(400).send({
      message: 'invalid email, use only google mail',
    });
  }

  const isStrongPassword = validator.isStrongPassword(userPassword);
  if (!isStrongPassword) {
    return res.status(400).send({
      message:
        'password not strong. password must be 8 character, include lowercase, uppercase, number, and symbol',
    });
  }

  const isEmailAvailable = await users.findOne({
    where: { email: userEmail },
  });
  const isUserNameAvailable = await users.findOne({
    where: { username: userName },
  });
  if (isEmailAvailable || isUserNameAvailable) {
    return res.status(400).send({
      message: 'Email / Username sudah digunakan',
    });
  }

  return next();
};

const loginValidator = async (req, res, next) => {
  const { userName, password } = req.body;

  const getUser = await users.findOne({ where: { username: userName } });

  if (!getUser) {
    return res.status(400).send({
      message: 'Error, user not found',
    });
  }

  const dataUser = getUser.dataValues;
  const comparedPassword = bcrypt.compareSync(password, dataUser.password);
  if (!comparedPassword) {
    return res.status(400).send({
      message: 'Error, incorrect password',
    });
  }

  req.userInfo = dataUser;
  return next();
};

module.exports = { regisValidator, loginValidator };
