/* Commitments v2 Api */

const files = require('../shared/files');

module.exports = function(app) {

    app.get('/commitments-v2-api/api/accounts/:accountId/transfer-status', (req, res) => {
        console.log("Commitments v2 - Transfer Status");
        files.sendFile(res, '\\modules\\commitments-v2-api\\responses\\transfer-status.json');
    });
   
};