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

app.get('/', function(req,res){
    res.render(__dirname + '/app/views/pages/index');
})

app.use(express.static("app/public"));


app.get('/:section', function(req, res) {
    // Find all results from the scrapedData collection in the db
    // find everything
    db.newsArticles.find({section: req.params.section}, function(error, found) {
      // data we get back is in found
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        res.render(__dirname + '/app/views/pages/index', {data: found});
      }
    });
});


app.post('/scrape/:section', function(req, res) {

    var requestURL = 'https://www.nytimes.com/';
    var section = 'section/' +req.params.section;
    if(req.params.section == 'top_stories'){
        section =  '';
    }
    request(requestURL + section, function(error, response, html) {
        if(error) throw error;

  
      var $ = cheerio.load(html);
    

      $('article.story.theme-summary').each(function(i, element) {
        // Save the text and href of each link enclosed in the current element
        var title = $(element).children('.story-body').children('h2').children('a').text();
  
        var link = $(element).children('.story-body').children('h2').children('a').attr('href');

        var image = $(element).children('figure').children('a').children('img').attr('src');

        var summary = $(element).children('.story-body').children('.summary').text();

        // var published = $(element).children('.story-body').children('.byline').children('.freshness').children('time').text();

        var author = $(element).children('.story-body').children('.byline').children('.author').text();
        

        // If this found element had both a title and a link (false if empty strings ir undefined)
        if (title && link && image && summary && author) {
          // Insert the data in the scrapedData collection insert a new document
          db.newsArticles.find({link: link}, {$exists: true}).toArray(function(err, doc){ //find if a value exists    
            if(doc.length == 0){ //if it does not exist
                db.newsArticles.insert({
                    title: title,
                    link: link,
                    image: image,
                    summary: summary,
                    author: author, 
                    section: req.params.section,
                },
                function(err, inserted) {
                    if (err) {
                    // Log the error if one is encountered during the query
                    console.log(err);
                    }
                    else {
                    // Otherwise, log the inserted data (successful)
            
                    console.log(inserted);
                        // console log the document that was inserted
                    }
                });
            }
            else{
                console.log(`Doc already exists ${doc}`);
            }
              
          });
        }
      });
    });
  
    res.redirect('/'+req.params.section);
  });


// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
  });
  