const Listing = require("../models/listing");
// Home Page
module.exports.index = (req, res) => {
    res.render("home.ejs");
};

// Show All Listings
module.exports.renderNewForm = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("index.ejs", { allListings });
};

// Render New Listing Form
module.exports.createListing = async(req, res) => {
        console.log("createListing called");
    res.render("new.ejs");
};

// Show Single Listing
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({path:"reviews",
      populate:{
        path:"author",
      }}
    ).populate("owner")
    ;
    if (!listing) {
        req.flash("error", "Listing does not exist");
        return res.redirect("/listings");
    }  
    res.render("show.ejs", { listing });
};

// Add New Listing
module.exports.addListing = async (req, res, next) => {
    try {
        if (!req.file) {
            req.flash("error", "Please upload an image");
            return res.redirect("/listings/new");
        }

        let url = req.file.path;
        let filename = req.file.filename;

        const newListing = new Listing(req.body.listing);

        newListing.image = {
            url,
            filename,
        };
        newListing.owner=req.user._id;
        await newListing.save();
        req.flash("success", "New listing created successfully");
        res.redirect("/listings/allListings");
    } catch (err) {
        next(err);
    }
};

// Render Edit Form
module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let listing= await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing does not exist");
        return res.redirect("/listings");
    }
   let originalimage = listing.image.url;
originalimage = originalimage.replace(
    "/upload",
    "/upload/h_300,w_250"
);
res.render("edit.ejs", { listing, originalimage });
};

// Update Listing
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true, runValidators: true }
    );
   if( typeof req.file !=="undefined"){
          let url = req.file.path;
        let filename = req.file.filename;
    listing.image={url,filename};
    listing.save();
   }
    if (!listing) {
        req.flash("error", "Listing does not exist");
        return res.redirect("/listings");
    }

    req.flash("success", "Listing updated successfully");
    res.redirect("/listings/allListings");
};

// Delete Listing
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;

    let deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
        req.flash("error", "Listing does not exist");
        return res.redirect("/listings");
    }

    req.flash("success", "Listing deleted successfully");
    res.redirect("/listings/allListings");
};