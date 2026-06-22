const Listing=require("../models/listing.js")

module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
    req.session.redirectUrl=req.originalUrl;
    req.flash("error","you must be logged in to create listing");
    return res.redirect("/login");
    }
    next();
    
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner=async(req,res,next)=>{
  let {id}=req.params;
    let lesting=await Listing.findById(id);
    if(!lesting.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","you dont have permission to edit");
        return res.redirect(`/listings/allListings/${id}`);
    }
    next();
}

// module.exports.isReviewAuthor=async(req,res,next)=>{
//   let {id,reviewid}=req.params;
//   console.log(reviewid)
//     let review=await Listing.findById(reviewid);
//     if(!review.author.equals(res.locals.currUser._id)){
//         req.flash("error","you are not the autor of the listing");
//         return res.redirect(`/listings/allListings/${id}`);
//     }
//     next();
// }
const Review = require("../models/review.js");

module.exports.isReviewAuthor = async (req, res, next) => {
    let { reviewid,id } = req.params;

    // Find the review
    let review = await Review.findById(reviewid);

    // Check if review exists
    if (!review) {
        req.flash("error", "Review does not exist!");
        return res.redirect("back");
    }

    // Check if the current user is the author
   if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","you are not the autor of the listing");
        return res.redirect(`/listings/allListings/${id}`);
    }
  
    next();
};
