var express = require("express");
var router = express.Router();


router.get("/", function(req, res) {
    res.render("index.ejs");
});

router.get("/signin", function(req, res) {
    res.render("signin.ejs");
});

router.get("/exhibition", function(req, res) {
    res.render("exhibition.ejs");
});

router.get("/Pricefilter", function(req, res) {
    res.render("Pricefilter.ejs");
});
module.exports = router;