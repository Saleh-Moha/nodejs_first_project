const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Field must be a valid email"]
    },
    password: {
        type: String,
        required: true
    },
    token:{
        type:String
    },
    role:{
        type: String,
        enum: ["user","admin","manager"],
        default: "user"
    }
});

module.exports = mongoose.model("Users", userSchema);  // Ensure this is "Users"
