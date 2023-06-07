/* Employer Profiles api */
const files = require('../shared/files');

module.exports = function(app) {


    app.get("/employer-profiles-api/api/users/:userId", (req, res) => {

        let userId = req.params.userId;

        console.log("Get employer profile user accounts for " + userId);

        files.sendFile(res, '/modules/employer-profiles-api/user-profile-response.json');

    });

};
