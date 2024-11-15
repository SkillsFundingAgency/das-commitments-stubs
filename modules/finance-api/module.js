/* Finance api */
const string = require('../shared/string');
const files = require('../shared/files');

module.exports = function(app) {

    app.get('/finance-api/api/accounts/internal/:accountId/transfers/connections', (req, res) => {

        let accountId = req.params.accountId;

        console.log("Calling Finanace Transfers Connections for " + accountId);
        files.sendFile(res, "/modules/finance-api/" + accountId + "/transferconnections_get.json");
    });
};
