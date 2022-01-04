/* LTM Inner api */

const fs = require('fs');

module.exports = function(app) {

    /* Levy Transfer Matching Inner Api */
    app.get('/levy-transfer-matching-api/applications/*',(req, res) => {

        console.log("get pledge application invoked");
        let filename = __dirname + '\\pledge-application-with-auto-approval.json';
        let result = JSON.parse(fs.readFileSync(filename, 'utf8'));
        res.header("Content-Type",'application/json');
        res.send(result);
    });

};