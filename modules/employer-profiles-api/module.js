/* Employer Profiles api */
const files = require('../shared/files');

module.exports = function(app) {

    app.get("/employer-profiles-api/api/users/:userId", (req, res) => {

        let userId = req.params.userId;

        console.log("Get employer profile user accounts for " + userId);

        if(userId === "2979B22C-37AC-4A40-9119-230DAD681E0E")
        {
            files.sendFile(res, '/modules/employer-profiles-api/recruit-user-profile-response.json');
        }
        else {
            files.sendFile(res, '/modules/employer-profiles-api/user-profile-response.json');
        }
    });

    app.put("/employer-profiles-api/api/users/:userId", (req, res) => {

        let userId = req.params.userId;

        console.log("Put employer profile user accounts for " + userId);

        if(userId === "2979B22C-37AC-4A40-9119-230DAD681E0E")
        {
            files.sendFile(res, '/modules/employer-profiles-api/recruit-user-profile-response.json');
        }
        else {
            files.sendFile(res, '/modules/employer-profiles-api/user-profile-response.json');
        }
    });
};
