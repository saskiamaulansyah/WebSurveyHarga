const jwt = require('jsonwebtoken');
const db = require('../models');


const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const accessToken = bearer[1];
    jwt.verify(accessToken, 'mysecretkey', (jwtError, decoded) => {
      if (jwtError) {
        res.status(403).send({
          error: {
            message: 'invalid access token',
          },
        });
      } else {
        const { username } = decoded.payload;
        db.User.findOne({
          where: {
            username,
          },
        }).then(() => {
          next();
        }).catch((err) => {
          res.status(403).send({
            error: err,
          });
        });
      }
    });
  } else {
    res.status(403).send({
      error: {
        message: 'invalid access token',
      },
    });
  }
};

module.exports = verifyToken;
