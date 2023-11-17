/* Provider events api */
const files = require('../shared/files');
const string = require('../shared/string');

module.exports = function(app) {

    app.get('/provider-events-api/api/v2/datalock',(req, res) => {

        console.log(string.format("Provider Events Api: Get Datalocks"));
        //files.sendFile(res, '/modules/provider-events-api/datalocks.json');

        res.status(404);
        res.close();
    });
};
