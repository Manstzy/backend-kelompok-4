const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');
const { users } = require('../models');


const register = async (req, res) => {
  const userId = `user-${nanoid(16)}`;
  const info = {
    id: userId,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    username: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  };

  const hashPassword = bcrypt.hashSync(info.password, 8);
  try {
    const regis = await users.create({
      ...info,
      password: hashPassword,
    });

    return res.status(201).send({
      message: 'Create user success',
      data: regis,
    });
  } catch (error) {
    return res.status(500).send({ message: 'server error' });
  }
};

const login = async (req, res) => {
  const data = req.userInfo;
  const token = jwt.sign(
    { id: data.id, userName: data.userName },
    process.env.JWT_SECRET,
    { expiresIn: 60 },
  );

  return res.status(200).send({
    message: 'Login Success',
    access_token: token,
  });
};

module.exports = { register, login };
