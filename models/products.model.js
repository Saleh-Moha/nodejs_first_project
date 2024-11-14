const mongoose = require("mongoose")


const coursesschema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price:{
        type : Number,
        required : true
    },
    added_with:{
        type:String,
        ref:"Users",
        required:true
    }
})


module.exports = mongoose.model('course' , coursesschema)