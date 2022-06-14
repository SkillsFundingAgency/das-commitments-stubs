/* Approvals outer api */
const files = require('../../shared/files');
const string = require('../../shared/string');

module.exports = function(app) {

    app.get('/apim-endpoints/approvals/pledgeapplications/:pledgeApplicationId',(req, res) => {

        let pledgeApplicationId = req.params.pledgeApplicationId;

        console.log(string.format("GetPledgeApplication {0}", pledgeApplicationId));

        files.sendFile(res, '\\modules\\apim-endpoints\\approvals\\pledge-application-with-auto-approval.json');

    });


    app.get('/apim-endpoints/approvals/Providers/:providerId/courses/:courseCode',(req, res) => {

        let providerId = req.params.providerId;
        let courseCode = req.params.courseCode;

        console.log(string.format("providerId {0}", providerId));
        console.log(string.format("courseCode {0}", courseCode));

        files.sendFile(res, '/modules/apim-endpoints/approvals/delivery-models.json');

    });


    app.get('/apim-endpoints/approvals/rofjaa/agency/:legalEntityId',(req, res) => {

        let legalEntityId = req.params.legalEntityId;

        console.log(string.format("legalEntityId {0}", legalEntityId));

        files.sendFile(res, '/modules/apim-endpoints/approvals/fjaa-agency.json');

    });



};
