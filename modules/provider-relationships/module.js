/* Provider relationships module */

const files = require('../shared/files');

module.exports = function(app) {

    app.get('/provider-relationships/*',(req, res) => {
        files.sendResponseFile(res, req.url, req.method);
    });

};