if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}
console.log(process.env.ATLASDB_URL);
const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const Listing = require("./models/listing.js");
const ejsMate=require("ejs-mate");
const app=express();
const methodOverride=require("method-override");
const Review = require("./models/review");
const ExpressError=require("./utils/ExpressError.js");
const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/reviews.js")
const session=require("express-session");
const flash=require("connect-flash");
const multer=require("multer");
const initData=require("./init/data.js");
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
const passport=require("passport");
const LocalStrategy=require("passport-local");
const userRouter=require("./routes/user.js");
const User=require("./models/User.js")
main()
.then(()=>{
    console.log("connection sucessful");
})
.catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/hotel');
};

const sessionOptions={
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
    expires: new Date(Date.now() + 7*24*60*60*1000),
    maxAge: 7*24*60*60*1000,
    httpOnly:true,
}
};
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
      console.log(req.user);
      console.log(req.User);  
    next();
})

app.get("/wonderlust",(req,res)=>{
    res.render("user.ejs");
})
app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter)
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});
app.use((err,req,res,next)=>{
    let {status=500,message="something went wrong"}=err;
    res.status(status).send(message);
})
// sever start
app.listen(7070,()=>{
    console.log("server is listening");
})

