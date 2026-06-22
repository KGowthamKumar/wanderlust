const express=require("express");
const mongoose=require("mongoose");
const router=express.Router({mergeParams:true});
const ExpressError=require("../utils/ExpressError.js");
const wrapasync=require("../utils/wrapasync.js");
const Listing = require("../models/listing");
const Review = require("../models/review.js");
const {isReviewAuthor}=require("../views/middileware.js")
const reviewController=require("../controllers/reviews.js");
const {isLoggedin}=require("../views/middileware.js")
router.post("/",isLoggedin, wrapasync(reviewController.createReview));
router.delete("/:reviewid",isLoggedin,isReviewAuthor, wrapasync(reviewController.destroyReview))
module.exports=router;