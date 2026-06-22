const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const  listingschema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        match:/^(?=.*[a-zA-Z]).+$/
    },
    description:String,
    image:{
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
             ref:"Review"
        },
    ],
    owner:{
           type: Schema.Types.ObjectId,
             ref:"User"
    },
})
const Listing=mongoose.model("Listing",listingschema);
module.exports=Listing;
