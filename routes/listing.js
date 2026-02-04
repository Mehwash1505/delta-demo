// routes/listing.js
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn, 
    upload.single('listing[image]'), 
    validateListing, 
    wrapAsync (listingController.createListing)
);

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm );

router
.route("/:id")
.get(wrapAsync (listingController.showListing))
.put(
    isLoggedIn, 
    isOwner, 
    upload.single('listing[image]'),
    validateListing, 
    wrapAsync (listingController.updateListing)
)
.delete(isLoggedIn, wrapAsync (listingController.destroyListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner,wrapAsync (listingController.renderEditFrom));

module.exports = router;

// app.get("/testlisting", async(req, res) =>{
//     let sampleListing = new listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });
