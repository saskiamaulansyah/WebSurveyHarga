const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

const getUser = (req, res) => {
  const { id } = req.params;
  db.User.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ['password'],
    },
  }).then((user) => {
    res.json(user);
  }).catch((err) => {
    res.status(500).send({ error: err });
  });
};

const getAllUser = (req, res) => {

  db.User.findAll({}).then((user) => {
    res.json(user);
  }).catch((err) => {
    res.status(500).send({ error: err });
  });
};
const indexLogin = (req, res) => {
  res.render('login/login');
};

const indexRegister = (req, res) => {
  res.render('login/register');
};

const logout = (req, res) => {
  if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/login');
        }
      });
  }
  
}
const loginUser = (req, res) => {
  var session = req.session;
  const { username, password } = req.body;
  db.User.findOne({
    where: {
      username,
    },
  }).then((user) => {
    bcrypt.compare(password, user.password, (hashErr, isPassword) => {
      if (isPassword) {
        jwt.sign({
          payload: {
            id: user.id,
            username 
          },
        }, 'mysecretkey', (err, token) => {
          if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
            localStorage = new LocalStorage('./scratch');
          }

          console.log('uname');
          session.username = username;
          session.roleId = user.role_id;
          console.log('uname', session.roleId);
          localStorage.setItem('token', token);
          console.log(localStorage.getItem(token));
          session.save((success) => {
            console.log('success');
            res.render('dashboard/dashboard',{ session:req.session });
          })

        });
      } else {
        res.status(500).send({
          error: {
            message: 'Invalid password',
          },
        });
      }
    });
  }).catch(() => {
    res.status(500).send({
      error: {
        message: 'Invalid username',
      },
    });
  });
};

const registerUser = (req, res) => {
  const { password } = req.body;
  bcrypt.hash(password, 10, (hashErr, hash) => {
    if (hashErr) {
      res.send(hashErr);
    } else {
      db.User.create({
        ...req.body,
        password: hash,
      }).then((result) => {
        res.json(result);
      }).catch((err) => {
        const { errors, name } = err;
        const messages = [];
        if (errors.length > 0) {
          errors.forEach((each) => {
            messages.push(each.message);
          });
          res.status(500).send({
            error: {
              name,
              messages,
            },
          });
        } else {
          res.status(500).send({ error: err });
        }
      });
    }
  });
};

const updateUser = (req, res) => {
  const { username } = req.params;
  db.User.update(
    req.body,
    {
      returning: true,
      where: {
        username,
      },
    },
  ).then(() => {
    db.User.findOne({
      where: {
        username,
      },
      attributes: {
        exclude: ['password'],
      },
    }).then((user) => {
      res.json(user);
    }).catch((err) => {
      throw err;
    });
  }).catch((updateError) => {
    throw updateError;
  });
};

module.exports = {
  getUser,
  getAllUser,
  registerUser,
  loginUser,
  updateUser,
  indexLogin,
  indexRegister,
  logout
};
