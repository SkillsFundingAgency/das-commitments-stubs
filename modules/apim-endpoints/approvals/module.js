/* Approvals outer api */
const files = require('../../shared/files');
const string = require('../../shared/string');

module.exports = function(app) {

    app.get('/apim-endpoints/approvals/pledgeapplications/:pledgeApplicationId',(req, res) => {

        let pledgeApplicationId = req.params.pledgeApplicationId;

        console.log(string.format("GetPledgeApplication {0}", pledgeApplicationId));

        files.sendFile(res, '\\modules\\apim-endpoints\\approvals\\pledge-application-with-auto-approval.json');

    });

};
