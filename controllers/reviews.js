const Listing=require("../models/listing");
const Review=require("../models/review.js");
module.exports.createReview=async (req, res) => {
    try {
        console.log(req.body);
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
        newReview.author=req.user._id;
         listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
        res.redirect(`/listings/allListings/${listing._id}`);
    } catch(err) {
        console.log(err);
    }
}
module.exports.destroyReview=async(req,res)=>{
    let {id,reviewid}=req.params;
    console.log(reviewid);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}})
   await Review.findByIdAndDelete(reviewid);
   res.redirect(`/listings/allListings/${id}`);
}