var auth = require("./auth");

module.exports = function (app) {
    app.get('/partials/*', function (req, resp) {
        resp.render('../../public/app/' + req.params[0]);
    });
    app.post('/login', auth.authenticate);
    app.post('/logout', function (req, resp) {
        req.logout();
        resp.end();
    });
    app.get('*', function (request, response) {
        response.render('index', {
            bootstrappedUser: request.user
        });
    });

};