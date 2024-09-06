/* Apprentice Feedback Outer API */
const files = require('../../shared/files');

module.exports = function(app) {

    app.post("/apim-endpoints/apprentice-feedback-api/dataload/generate-feedback-summaries", (req, res) => {

        console.log("Apprentice Feedback Api: Post dataload generate-feedback-summaries");
        res.sendStatus(200);
    });
};
