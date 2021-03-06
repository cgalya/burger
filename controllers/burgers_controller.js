//Make express and router available to use
var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes
//Display all the burgers on the page
router.get("/", function(req, res) {
  burger.all(function(data) {
    res.render("index", { burgers: data });
    console.log(data);
  });
});

//Create a new burger
router.post("/", function(req, res) {
  burger.create([
    "burger_name"
  ], [
    req.body.burger_name
  ], function() {
    res.redirect("/");
  });
});

//Update an existing burger  - change devoured from false to true
router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.update({
    devoured: true
  }, condition, function() {
    res.redirect("/");
  });
});

// Export routes for server.js to use
module.exports = router;
