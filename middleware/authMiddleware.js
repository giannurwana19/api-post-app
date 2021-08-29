const jwt = require('jsonwebtoken');
const secret = require('../secret');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isCustomAuth = token.length < 500;

    console.log('token user', token);

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = authMiddleware;

// DOCS

// token nya lebih dari 500, maka itu token dari google
// sub: google name spesifik id untuk membedakan user
