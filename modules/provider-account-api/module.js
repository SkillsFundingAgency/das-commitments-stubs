/* Provider account api */
const string = require('../shared/string');
const files = require('../shared/files');

module.exports = function(app) {

    app.post('/provider-account-api/api/email/:providerId/send',(req, res) => {

        let providerId = req.params.providerId;
        console.log(string.format("Provider Account Api Send Email to Provider {0}", providerId));
        res.status(200).send();
        
    });


        app.get('/provider-account-api/*',(req, res) => {
        files.sendResponseFile(res, req.url, req.method);
    });

};
