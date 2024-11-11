/* Apprentice Feedback Outer API */
const files = require('../../shared/files');

module.exports = function(app) {

    app.post("/apim-endpoints/apprentice-feedback-api/dataload/generate-feedback-summaries", (req, res) => {

        console.log("Apprentice Feedback Api: Post dataload generate-feedback-summaries");
        res.sendStatus(200);
    });

    app.post("/apim-endpoints/apprentice-feedback-api/apprenticefeedbacktarget", (req, res) => {

        console.log("Apprentice Feedback Api: apprenticefeedbacktarget");
        res.sendStatus(200);
    });

    app.get("/apim-endpoints/apprentice-feedback-api/feedbacktransaction", (req, res) => {
        console.log("Apprentice Feedback Api: get feedback transaction");
        files.sendFile(res, '\\modules\\apim-endpoints\\apprentice-feedback-api\\feedback-transaction.json');
    });

    app.post("/apim-endpoints/apprentice-feedback-api/feedbacktransaction/generate-email-transactions", (req, res) => {
        console.log("Apprentice Feedback Api: generate feedback transactions");
        res.sendStatus(200);
    });

    app.get("/apim-endpoints/apprentice-feedback-api/apprenticefeedbacktarget/requiresupdate", (req, res) => {
        console.log("Apprentice Feedback Api: get apprenticefeedbacktarget updates");
        files.sendFile(res, '\\modules\\apim-endpoints\\apprentice-feedback-api\\feedbacktarget-updates.json');
    });


    app.put("/apim-endpoints/apprentice-feedback-api/apprenticefeedbacktarget", (req, res) => {
        console.log("Apprentice Feedback Api: updating apprenticefeedbacktarget");
        res.sendStatus(200);
    });
};


