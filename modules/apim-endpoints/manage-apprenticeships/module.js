/* ManageApprenticeships outer api */
const files = require('../../shared/files');
const string = require('../../shared/string');

module.exports = function(app) {

    app.get('/apim-endpoints/manage-apprenticeships/transfers/:accountId',(req, res) => {

        let accountId = req.params.accountId;

        console.log(string.format("Get Transfers {0}", accountId));

        files.sendFile(res, '\\modules\\apim-endpoints\\manage-apprenticeships\\transfers.json');

    });

};
