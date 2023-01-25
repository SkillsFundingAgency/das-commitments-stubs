/* Register of Flexi-Job Apprenticeship Agencies inner api */
const files = require('../shared/files');
const string = require('../shared/string');

module.exports = function(app) {

    app.get('/roatp-api/api/providers/:providerId',(req, res) => {

        let providerId = req.params.providerId;
        console.log(string.format("Roatp Api Get Provider {0}", providerId));
        files.sendFile(res, '/modules/roatp-api/10005077.json');            
    });
};
