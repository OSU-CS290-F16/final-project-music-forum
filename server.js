var fs = require('fs');
var path = require('path');
var express = require('express');
var Handlebars = require('handlebars');
var posts = require('./posts');
var app = express();
var port = process.env.PORT || 3000;

//http://stackoverflow.com/questions/32546100/how-to-write-data-to-a-json-file-using-javascript

// Read the source of the post page template and compile it with Handlebars.
var postPageSource = fs.readFileSync(path.join(__dirname, 'templates', 'post-page.html'), 'utf8');
var postPageTemplate = Handlebars.compile(postPageSource);

// Read the source of the posts page template and compile it with Handlebars.
var postsPageSource = fs.readFileSync(path.join(__dirname, 'templates', 'posts-page.html'), 'utf8');
var postsPageTemplate = Handlebars.compile(postsPageSource);


// Serve static files from public/.
app.use(express.static(path.join(__dirname, 'public')));

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
app.get('/:post', function (req, res, next) {

  var post = posts[req.params.post];

  if (post) {

    var content = postPageTemplate(post);
    res.send(content);

  } else {

    // If we don't have info for the requested post, fall through to a 404.
    next();

  }

});

// If we didn't find the requested resource, send a 404 error.
app.get('*', function(req, res) {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Listen on the specified port.
app.listen(port, function () {
  console.log("== Listening on port", port);
});
