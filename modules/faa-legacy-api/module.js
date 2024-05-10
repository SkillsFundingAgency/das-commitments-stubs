/* FAA Legacy api */
const files = require('../shared/files');

module.exports = function(app) {

    app.get("/faa-legacy-api/api/Apprenticeship/:email", (req, res) => {
        
        let email = req.params.email;
        console.log("FAA Legacy Api: Get application for email " + email);

        if(email === "test@test.com")
        {
            files.sendFile(res, '/modules/faa-legacy-api/responses/applications1.json');
            return;
        }
        
        if(email === "test2@test.com")
        {
            files.sendFile(res, '/modules/faa-legacy-api/responses/applications2.json');
            return;
        }

        files.sendFile(res, '/modules/faa-legacy-api/responses/empty.json');
    });

    app.get("/faa-legacy-api/api/user/:email", (req, res) => {

        let email = req.params.email;
        console.log("FAA Legacy Api: Get user by email " + email);

        if(email === "test@test.com")
        {
            files.sendFile(res, '/modules/faa-legacy-api/responses/user1.json');
            return;
        }

        if(email === "test2@test.com")
        {
            files.sendFile(res, '/modules/faa-legacy-api/responses/user2.json');
            return;
        }

        res.sendStatus(404);
    });
};
