const { name } = require("ejs");
const mongoose=require("mongoose");
const  listingschema=new mongoose.Schema({
    names:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
     password:{
        type:String,
        required:true,
    }
})
const Login=mongoose.model("Listing",listingschema);
module.exports=Login;