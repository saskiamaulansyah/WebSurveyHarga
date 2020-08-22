'use strict';

// View Index
const indexDashboard = (req, res) => {
    res.render('dashboard/dashboard',{ session:req.session })
}

module.exports = {
    indexDashboard
};
  