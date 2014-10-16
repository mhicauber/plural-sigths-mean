var path = require('path');

var rootPath = path.normalize(__dirname + '/../../');

module.exports = {

    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/multivision',
        port: process.env.PORT || 3030
    },

    production: {
        rootPath: rootPath,
        db: 'mongodb://mhicauber:multivision@ds063929.mongolab.com:63929/multivision',
        port: process.env.PORT || 80
    }
};