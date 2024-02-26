/* FAA Candidate api */
const files = require('../shared/files');

module.exports = function(app) {

    app.put("/candidate-api/api/applications/:vacancyReference", (req, res) => {

        let vacancyReference = req.params.vacancyReference;

        console.log("Candidate Api: Put application vacancy ref" + vacancyReference);

        files.sendFile(res, '/modules/candidate-api/application.json');  
    });
};
