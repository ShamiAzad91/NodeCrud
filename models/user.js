const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        maxlength:32
    },
    email:{
        type:String,
        trim:true,
        
    },
    password:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model("User",userSchema);