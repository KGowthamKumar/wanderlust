const express=require("express");
const app=express();
const path=require("path");
const router=express.Router();
const ExpressError=require("../utils/ExpressError.js");
const User=require("../models/User.js");
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const flash=require("connect-flash");
const { saveRedirectUrl } = require("../views/middileware.js");
const userController=require("../controllers/users.js");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
router
.route("/signup")
.get((req,res)=>{
    res.render("users/signup.ejs")
})
router.post("/signup",userController.signup)
router.get("/login",(req,res)=>{
    res.render("login.ejs")
})
router.post(
    "/login",
    // saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:'/login',
        failureFlash:true
    }),userController.login
);
router.get("/logout",userController.logout)

module.exports=router;


