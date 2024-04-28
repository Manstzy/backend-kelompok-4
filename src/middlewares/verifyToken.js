/* eslint-disable dot-notation */
const jwt = require('jsonwebtoken');

const verify = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send({
        message: 'No token provided',
      });
    }

    const checkToken = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    const userId = checkToken.id;
    req.userId = userId;
    console.log(checkToken.id);
    if (!checkToken) {
      return res.status(403).send({
        message: 'Failed to authenticate jwt',
      });
    }

    return next();
  } catch (error) {
    return res.status(500).send({
      message: error,
    });
  }
};

module.exports = { verify };
