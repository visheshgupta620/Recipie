const express = require('express')
const Dish = require('../models/dishes')
const Review = require('../models/review');
const { isloggedin } = require('../middlewares');
const router = express.Router();

router.post('/dish/reviews/:id',isloggedin,async (req, res) => {
    const { id } = req.params;
    const { rating, comments } = req.body;
    const dish = await Dish.findById(id);
    const rev = await Review.create({ rating, comments });
    dish.reviews.push(rev);
    dish.save();

    req.flash('info','Review Added Successfully')

    res.redirect('back')
})

module.exports = router;