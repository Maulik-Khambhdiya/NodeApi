const mongoose= require('mongoose')

const userSchema= mongoose.Schema({
    name:{
        type: String,
        required:[true,'Enter Your Name']
    },
    email:{
        type: String,
        required:[true,'Enter Your Email']
    },
    password:{
        type: String,
        required:[true,'Enter Your Password']
    },

   profile:String
})

module.exports= mongoose.model("users",userSchema)