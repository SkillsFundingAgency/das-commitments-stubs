/* LTM Inner api */

const fs = require('fs');
const files = require('../shared/files');

module.exports = function(app) {

    /* Forecasting Api */
    app.get('/forecasting-api/api/accounts/:accountId/accountprojection/projected-summary',(req, res) => {

        console.log("get forecasting account projection summary");
        files.sendFile(res, '\\modules\\forecasting-api\\responses\\summary.json');
    });

    app.get('/forecasting-api/api/accounts/:accountId/accountprojection/detail',(req, res) => {

        console.log("get forecasting account projection detail");
        files.sendFile(res, '\\modules\\forecasting-api\\responses\\detail.json');
    });
    
};