/* Employer Users api */
const files = require('../shared/files');

module.exports = function(app) {

    app.get("/employer-users-api/api/user/:userId/accounts", (req, res) => {

        let userId = req.params.userId;

        console.log("Get user accounts for " + userId);

        files.sendFile(res, "/modules/employer-users-api/" + userId + "/accounts_get.json");

    });

    app.get("/employer-users-api/api/accounts/internal/:accountId/users", (req, res) => {

        let accountId = req.params.accountId;

        console.log("Get team members for " + accountId);

        files.sendFile(res, "/modules/employer-users-api/" + accountId + "/users_get.json");
    });

    app.get("/employer-users-api/api/accounts/:accountId/legalentities", (req, res) => {

        let accountId = req.params.accountId;

        console.log("Get legal entities for " + accountId);

        files.sendFile(res, "/modules/employer-users-api/" + accountId + "/legalentities_get.json");
    });

    app.get("/employer-users-api/api/accounts/:accountId", (req, res) => {

        let accountId = req.params.accountId;

        console.log("Get Account details for " + accountId);

        files.sendFile(res, "/modules/employer-users-api/" + accountId + "/accountdetails_get.json");
    });


};