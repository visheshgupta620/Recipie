const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        default: 0
    },
    comments: {
        type: String,
    }
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;