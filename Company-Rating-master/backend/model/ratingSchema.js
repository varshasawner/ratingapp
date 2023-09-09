const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    companyId : {
        type: String,
        required:true
    },
    userId : {
        type: String,
        required: true
    },
    rating : {
        type : Number,
        required:true
    }
})

// Collection Creation
const rating  = mongoose.model('Rating', ratingSchema);
module.exports = rating;