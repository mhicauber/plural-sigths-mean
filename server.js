//REQUIRES
var express = require('express'),
    logger = require('morgan'),
    stylus = require('stylus'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


// CREATES THE APP
var app = express();

// UTIILITY FUNCTIONS / VARS
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

function compile(str, path) {
    return stylus(str).set('filename', path);
}


// MODULES CONFIGURATION
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));
app.use(express.static(__dirname + '/public'));


// DB CONFIGURATION
if (env === 'development') {
    mongoose.connect('mongodb://localhost/multivision');
} else {
    mongoose.connect('mongodb://mhicauber:multivision@ds063929.mongolab.com:63929/multivision');
}
console.log("============> env == " + env);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log("multivision db opened");
});


// ROUTING
app.get('/partials/:partialPath', function (req, resp) {
    resp.render('partials/' + req.params.partialPath);
})
app.get('*', function (request, response) {
    response.render('index');
})


// START LISTENING
var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');