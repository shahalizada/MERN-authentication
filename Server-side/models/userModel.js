const mongoose = require("mongoose");


const userShema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    }
});

const User = mongoose.model("User", userShema);

module.exports = User;