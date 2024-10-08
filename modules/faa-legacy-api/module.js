/* FAA Legacy api */
const files = require('../shared/files');

module.exports = function(app) {

    app.get("/faa-legacy-api/api/Apprenticeship/:email", (req, res) => {
        
        let email = req.params.email;
        console.log("FAA Legacy Api: Get applications for email " + email);

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

        if(email === "test3@test.com")
        {
            files.sendFile(res, '/modules/faa-legacy-api/responses/single-application.json');
            return;
        }

        if(email === "test4@test.com")
        {
            files.sendFile(res, '/modules/faa-legacy-api/responses/single-unsuccessful-application.json');
            return;
        }

        if(email === "test5@test.com")
        {
            files.sendFile(res, '/modules/faa-legacy-api/responses/single-successful-application.json');
            return;
        }

        if(email === "test-saved-vacancy@test.com")
        {
            files.sendFile(res, '/modules/faa-legacy-api/responses/single-saved-vacancy.json');
            return;
        }
        
        files.sendFile(res, '/modules/faa-legacy-api/responses/empty.json');
    });

    app.get("/faa-legacy-api/api/user/validate-credentials", (req, res) => {

        let email = req.query.email;
        let password = req.query.password;
        console.log("FAA Legacy Api: Validate credentials for " + email);

        if(email === "invalid@test.com")
        {
            files.sendFile(res, '/modules/faa-legacy-api/responses/validate-credentials-invalid-response.json');
            return;
        }

        files.sendFile(res, '/modules/faa-legacy-api/responses/validate-credentials-valid-response.json');
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

        if(email === "test-saved-vacancy@test.com")
        {
            files.sendFile(res, '/modules/faa-legacy-api/responses/user2.json');
            return;
        }

        res.sendStatus(404);
    });
   
};
