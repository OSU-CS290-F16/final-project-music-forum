/*
 * Here, you should write a simple server to serve files statically.
 */

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

fs.readFile('public/post.html', function(err, data){
    if(err){
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
        case '/post.html':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(post);
            break;
		default:
			response.writeHead(404, {'Content-Type': 'text/html'});
            response.write(page404);
		}
	response.end();
}).listen(port);
console.log("== Listening on port 3000");
