/* Apprentice accounts api */
const files = require('../shared/files');

module.exports = function(app) {

    app.get("/apprentice-accounts-api/apprentices/:apprenticeId", (req, res) => {
        let apprenticeId = req.params.apprenticeId;
        console.log("Apprentice Accounts Api: Get Apprentice " + apprenticeId);
        files.sendFile(res, '/modules/apprentice-accounts-api/apprentice.json');
    });

    app.get("/apprentice-accounts-api/apprenticepreferences/:apprenticeId", (req, res) => {
        let apprenticeId = req.params.apprenticeId;
        console.log("Apprentice Accounts Api: Get Apprentice Preferences for apprentice " + apprenticeId);
        files.sendFile(res, '/modules/apprentice-accounts-api/apprentice-preferences.json');
    });

    app.get("/apprentice-accounts-api/apprentices/:apprenticeId/MyApprenticeship", (req, res) => {
        let apprenticeId = req.params.apprenticeId;
        console.log("Apprentice Accounts Api: Get My Apprenticeship " + apprenticeId);
        files.sendFile(res, '/modules/apprentice-accounts-api/my-apprenticeship.json');
    });
    
    app.put("/apprentice-accounts-api/apprentices", (req, res) => {
        console.log("Apprentice Accounts Api: Put Apprentice ");
        files.sendFile(res, '/modules/apprentice-accounts-api/apprentice.json');
    });
};
