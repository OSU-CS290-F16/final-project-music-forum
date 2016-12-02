var path = require('path');

var staticDir = path.join(__dirname, 'public');
var indexFilename = 'index.html';
var notFoundFilename = '404.html';
var port = process.env.PORT || 3000;

var http = require('http');
var fs = require('fs');

var indexFile;
var styleSheet;
var page404;
var jsFile;
var post;

var newPost;
var post;

fs.readFile('public/index.html', function(err, data) {
    if (err){
        throw err;
    }
    indexFile = data;
});

fs.readFile('public/style.css', function(err, data) {
    if (err){
        throw err;
    }
    styleSheet = data;
});

fs.readFile('public/404.html', function(err, data) {
    if (err){
        throw err;
    }
    page404 = data;
});

fs.readFile('public/index.js', function(err, data) {
    if (err){
        throw err;
    }
    jsFile = data;
});
fs.readFile('public/new post.html', function(err, data) {
    if (err){
        throw err;
    }
    newPost = data;
});
fs.readFile('public/post.html', function(err, data) {
    if (err){
        throw err;
    }
    post = data;
});

console.log(path);

http.createServer(function(request, response){
	    switch (request.url) {
		case '/' :    
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(indexFile);
			break;
		case '/index.html' :    
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(indexFile);
			break;
        case '/style.css' :
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.write(styleSheet);
            break;
		case '/index.js' :
            response.writeHead(200, {'Content-Type': 'text/javascript'});
            response.write(jsFile);
            break;
// <<<<<<< HEAD
        case '/post.html':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(post);
            break;
// =======
		case '/post' :
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(post);
            break;
		case '/new_post' :
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(newPost);
            break;
// >>>>>>> 3e2cafd1a4368e0ec75ac38bdf267cf084a98287
		default:
			response.writeHead(404, {'Content-Type': 'text/html'});
            response.write(page404);
		}
	response.end();
}).listen(port);
console.log("== Listening on port 3000");


/*
var fs = require('fs');
var path = require('path');
var express = require('express');
var exphbs = require('experss-handlebars');
var app = express();
var port = process.env.PORT || 3000 ;

app.engine('handlebars', exphbs({defualtLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.status(200).render('index-page', {
    pageTitle: 'Welcome!'
  });
});



app.get('/post')
*/

