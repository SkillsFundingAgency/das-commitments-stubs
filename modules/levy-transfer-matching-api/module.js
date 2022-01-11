/* LTM Inner api */

const fs = require('fs');
const files = require('../shared/files');

module.exports = function(app) {

    /* Levy Transfer Matching Inner Api */
    app.get('/levy-transfer-matching-api/applications/*',(req, res) => {

        console.log("get pledge application invoked");
        let filename = __dirname + '\\pledge-application-with-auto-approval.json';
        let result = JSON.parse(fs.readFileSync(filename, 'utf8'));
        res.header("Content-Type",'application/json');
        res.send(result);
    });

    app.get('/levy-transfer-matching-api/applications',(req, res) => {
        console.log("LTM API - Applications");
        files.sendFile(res, '\\modules\\levy-transfer-matching-api\\responses\\applications.json');
    });

    app.get('/levy-transfer-matching-api/pledges',(req, res) => {
        console.log("LTM API - Pledges");
        files.sendFile(res, '\\modules\\levy-transfer-matching-api\\responses\\pledges.json');
    });

};