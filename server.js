var fs = require('fs');
var path = require('path');
var express = require('express');
var Handlebars = require('handlebars');
var posts = require('./posts');
var app = express();
var port = process.env.PORT || 3000;
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB;
var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;
var mongoDB;

//http://stackoverflow.com/questions/32546100/how-to-write-data-to-a-json-file-using-javascript

//http://stackoverflow.com/questions/36856232/write-add-data-in-json-file-using-node-js

// Read the source of the post page template and compile it with Handlebars.
var postPageSource = fs.readFileSync(path.join(__dirname, 'templates', 'post-page.html'), 'utf8');
var postPageTemplate = Handlebars.compile(postPageSource);

// Read the source of the posts page template and compile it with Handlebars.
var postsPageSource = fs.readFileSync(path.join(__dirname, 'templates', 'posts-page.html'), 'utf8');
var postsPageTemplate = Handlebars.compile(postsPageSource);


// Serve static files from public/.
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
/*
 * For the /posts route, we dynamically build the content of the page using
 * the set of all available posts.  We let our Handlebars template do the
 * work, by simply passing the relevant data into the template.
 */
app.get('/', function (req, res) {

  var content = postsPageTemplate({ posts: posts });
  res.send(content);

});

/*
 * Here, we use a dynamic route to create a page for each post.  We use
 * Express machinery to get the requested post from the URL and then fill
 * in a template with that post's info using Handlebars.
 */
// app.get('/:post', function (req, res, next) {

//   var post = posts[req.params.post];

//   if (post) {

//     var content = postPageTemplate(post);
//     res.send(content);

//   } else {

//     // If we don't have info for the requested post, fall through to a 404.
//     next();

//   }

// });

app.get('/:post', function (req, res, next) {

  /*
   * Initiate a query for only the person we're interested in for this page.
   * We'll respond to the requesting client from within the callback of the
   * query.
   */
   var collection = mongoDB.collection('posts');
   collection.find({ username: req.params.post }).toArray(function (err, post) {
    if (err) {

      /*
       * Send an error response if there was a problem fetching the person
       * from the DB.
       */
      console.log("== Error fetching post (", req.params.post, ") from database:", err);
      res.status(500).send("Error fetching post from database: " + err);

    } else if (post.length >= 1) {

      /*
       * If we got at least one person (should be exactly 1), then we found the
       * requested person.  Compute whether they're 65 or older and send them
       * to Handlebars for rendering.
       */
      var poster = post[0];

      // Render the page, sending all the needed info to Handlebars.
      res.render('posts-page', {
        pageTitle: person.name,
        person: person
      });

    } else {

      /*
       * If there wasn't info for the requested person in the DB (i.e. if we
       * didn't get any rows back from our query), then fall through to a 404.
       */
      next();

    }

  });

});

// If we didn't find the requested resource, send a 404 error.
app.get('*', function(req, res) {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Listen on the specified port.
app.listen(port, function () {
  console.log("== Listening on port", port);
});
