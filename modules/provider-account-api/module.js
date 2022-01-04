/* Provider account api */
const files = require('../shared/files');

module.exports = function(app) {

    app.get('/provider-account-api/*',(req, res) => {
        files.sendResponseFile(res, req.url, req.method);
    });

};
