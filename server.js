// Dependencies
var express = require("express");
  // routing
var mongojs = require("mongojs");
  // connect to mongodb
// Require request and cheerio. This makes the scraping possible
var request = require("request");
  // make requests to get data/ html from another url
var cheerio = require("cheerio");
  // jquery like syntax to access particular elements from html we get back from request

var bodyParser = require('body-parser');

/*
  cheerio takes the html from the request and let's you use jQuery like syntax to access particular text inside of it
*/


// Initialize Express
var app = express();
  // add get and post routes to app

app.use(express.static("app/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// sets EJS available
app.set('view engine', 'ejs');

// Database configuration
var databaseUrl = "newsScraper";
var collections = ["newsArticles"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});



// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
  });
  