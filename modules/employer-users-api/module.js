/* Employer Users api */
const files = require('../shared/files');

module.exports = function(app) {

    app.get("/employer-users-api/:userId/accounts", (req, res) => {

        let userId = req.params.userId;

        console.log("Get user accounts for " + userId);

        res.sendStatus(404);
        
    });
};
