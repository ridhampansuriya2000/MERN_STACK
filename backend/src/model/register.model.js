const mongoose = require("mongoose");

const register_schema = mongoose.Schema({

    email: {
    type: String,
    require: true,
    index: { unique: true, sparse: true }
    },
    password: {
        type: String,
        require:true
    },    
    firstName :{
        type: String,
        require: true    
    },
    lastName :{
        type: String,
        require: true    
    },
    contact:{
        type: Number,
        require: true    
    },
    gender:{
        type: String
    },
    ip_address:{
        type: String
    },
    dateOfBirth: String,
    profile_photo: String
    
})

module.exports = mongoose.model("Users",register_schema)