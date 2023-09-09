const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    name : {
        type: String,
        required:true
    },
    email : {
        type: String,
        required: true
    },
    phone : {
        type : Number,
        required:true
    },
    city : {
        type : String,
        required:true
    },
    state : {
        type : String,
        required:true
    },
    role : {
        type : String,
        required : true
    },
    password : {
        type: String,
        required: true
    }
})

// Collection Creation
const register  = mongoose.model('Registration', registerSchema);
module.exports = register;