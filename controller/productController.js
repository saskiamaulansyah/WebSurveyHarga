const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
// View Index
const indexProduct = (req, res) => {
    db.Product.findAll({}).then((product) => {
      console.log('productsss',product);
      res.render('product/product', { dataProduct: product, session:req.session});
  }).catch((err) => {
      res.status(500).send({ error: err });
  });

}
const getProduct = (req, res) => {
    const { id } = req.params;
    db.Product.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['price'],
      },
    }).then((user) => {
      res.json(user);
    }).catch((err) => {
      res.status(500).send({ error: err });
    });
};

const changeProductStatus = (req, res) => {
  const { id } = req.params;
  var updateData = req.body;

  db.Product.update(
    { status: "1" },
    { where: { id },

  }).then((user) => {
    res.json(user);
  }).catch((err) => {
    res.status(500).send({ error: err });
  });
}

const addProduct = (req, res) => {
  console.log('er');
        db.Product.create({
          ...req.body,
          status: "2"
        }).then((result) => {
          res.redirect('product');
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
  };
module.exports = {
    indexProduct,
    addProduct,
    getProduct,
    changeProductStatus
};
  