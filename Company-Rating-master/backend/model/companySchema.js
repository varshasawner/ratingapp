const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName : {
        type: String,
        required:true
    },
    companyLocation : {
        type: String,
        required: true
    },
    city : {
        type : String,
        required:true
    },
    foundedOn : {
        type : String,
        required:true
    }
})

// Collection Creation
const company  = mongoose.model('Company', companySchema);
module.exports = company;