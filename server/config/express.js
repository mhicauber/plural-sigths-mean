var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    stylus = require('stylus'),

//    cookieParser = require('cookie-parser'),

    session = require('express-session'),
    passport = require('passport');

module.exports = function (app, config) {

// MODULES CONFIGURATION
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(logger('dev'));

//    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use(session({secret: 'multi vision unicorns'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: function (str, path) {
                return stylus(str).set('filename', path);
            }
        }
    ));
    app.use(express.static(config.rootPath + '/public'));

};
