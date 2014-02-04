var express = require('express'),
    http = require('http'),
    https = require('https'),
    fs = require('fs'),
    app = express(),
    path = require('path'),
    routes = require('./server/routes.js'),
    port = process.env.PORT || 5000,
    allowCrossDomain = require('./server/config/crossDomainHeader.js')().allowCrossDomain;

// Log process.env.NODE_ENV
  
console.log("****************************");
console.log("* Current ENV:", app.get('env'));
console.log("****************************");


// Configure Express server
app.set('port', process.env.PORT || 5000);
//set up the root folder for jade file. 
//Here, in res.render('index'), will automatically look for the /server/views/index.jade'
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

// the first param of app.use, default route is '/';

// If in development, use Express error handler
app.configure('development', function() {
  app.use(express.errorHandler());
});
app.use(express.favicon());//use the icon between login?or between server wait time?
app.use(express.logger('dev'));
app.use(express.cookieParser());//allow you to use app.cookie.
app.use(express.bodyParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(express.methodOverride());
app.use(allowCrossDomain);//allow cross domain query
app.use(app.router);
app.use(express.static(path.join(__dirname, 'client')));
//set up the root folder for href,src in the index.jade file.

//handling error as a middleware
app.use(function(err, req, res, next){
  console.log(req.body);
  console.log("ERROR_Server:",err);
  res.status(err.status || 500);
  res.render('500', { error: err });//may need to be changed?
});

// Initialize routing
routes(app);

// var options = {
//     key:    fs.readFileSync('ssl/server.key',{encoding:'utf8'}),
//     cert:   fs.readFileSync('ssl/server.crt',{encoding:'utf8'}),
//     ca:     fs.readFileSync('ssl/ca.crt',{encoding:'utf8'}),
//     requestCert:        true,
//     rejectUnauthorized: false
// };
// options.agent = new https.Agent(options);


var options = {
  key: fs.readFileSync('key.pem',{encoding:'utf8'}),
  cert: fs.readFileSync('key-cert.pem',{encoding:'utf8'})
};
console.log(options);
// app.listen(port);
// http.createServer(app).listen(port);
https.createServer(options, app).listen(port);
