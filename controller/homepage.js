'use strict';

// View Index
const indexHomepage = (req, res) => {
    res.render('homepage/home',{ session:req.session })
}

module.exports = {
    indexHomepage
};
  