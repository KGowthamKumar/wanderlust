const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapasync.js");
const { isLoggedin, isOwner } = require("../views/middileware.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");

// Home + Create Listing
router.route("/")
    .get(listingController.index)
    .post(
        isLoggedin,
        upload.single("listing[image]"),
        listingController.addListing
    );

// New Listing Form
router.get(
    "/new",
    isLoggedin,
    wrapAsync(listingController.createListing)
);

// All Listings
router.get(
    "/allListings",
    wrapAsync(listingController.renderNewForm)
);

// Show Single Listing
router.get(
    "/allListings/:id",
    wrapAsync(listingController.showListing)
);

// Edit Form
router.get(
    "/:id/edit",
    isLoggedin,
    isOwner,
    wrapAsync(listingController.editListing)
);

// Update & Delete
router.route("/:id")
    .put(
        isLoggedin,
        isOwner,
        upload.single("listing[image]"),
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isOwner,
        isLoggedin,
        wrapAsync(listingController.deleteListing)
    );

module.exports = router;