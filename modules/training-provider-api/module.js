/* Provider relationships module */

const files = require('../shared/files');

module.exports = function(app) {


    app.get('/training-provider-api/api/v1/search',(req, res) => {

        console.log(req.url);
        var ukprn = req.query.searchterm;
        files.sendResponseFile(res, `/training-provider-api/${ukprn}`, req.method);

    });

};