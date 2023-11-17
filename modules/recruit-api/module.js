/* Employer Users api */
const files = require('../shared/files');

module.exports = function(app) {

    app.get("/recruit-api/api/livevacancies", (req, res) => {

        //let userId = req.params.userId;

        console.log("Recruit Api: Get live vacancies");

        files.sendFile(res, '/modules/recruit-api/vacancies.json');
        
    });
};
