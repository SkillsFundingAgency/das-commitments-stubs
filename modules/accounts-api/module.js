/* Accounts api */
const files = require('../shared/files');

module.exports = function(app) {

    app.get('/accounts-api/*',(req, res) => {
        files.sendResponseFile(res, req.url, req.method);
    });

    app.get('/accounts-api-v2/*',(req, res) => {
        files.sendResponseFile(res, req.url, req.method);
    });

};
