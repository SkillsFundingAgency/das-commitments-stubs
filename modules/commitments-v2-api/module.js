/* Commitments v2 Api */

const files = require('../shared/files');

module.exports = function(app) {

    app.get('/commitments-v2-api/api/accounts/:accountId/transfer-status', (req, res) => {
        console.log("Commitments v2 - Transfer Status");
        files.sendFile(res, '\\modules\\commitments-v2-api\\responses\\transfer-status.json');
    });
   
    app.get('/commitments-v2-api/api/cohorts/accountIds', (req, res) => {
        console.log("Commitments v2 - Cohort Account Ids");
        files.sendFile(res, '\\modules\\commitments-v2-api\\responses\\account-ids.json');
    });

    app.get('/commitments-v2-api/api/apprenticeships', (req, res) => {
        console.log("Commitments v2 - Get Apprenticeships");
        files.sendFile(res, '\\modules\\commitments-v2-api\\responses\\apprenticeships.json');
    });

    app.get('/commitments-v2-api/api/cohorts', (req, res) => {
        console.log("Commitments v2 - Get Cohorts");
        files.sendFile(res, '\\modules\\commitments-v2-api\\responses\\cohorts.json');
    });
    
};