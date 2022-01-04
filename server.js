const config = require('./config');
const express = require("express");
const http = require("http");
const https = require("https");
const bodyParser = require('body-parser');
const fs = require('fs');
const pug = require('pug');
const files = require('./modules/shared/files.js');
const string = require('./modules/shared/string.js');

require('./modules/shared/querystring');

const port = process.env.PORT || config.port;

const app = express();

app.use(bodyParser.json());

app.set('view engine', 'pug');

app.get("/", (req, res) => {
    res.render('splash');
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
  });

require('./modules/provider-relationships/module')(app);
require('./modules/location-api/module')(app);
require('./modules/apim-endpoints/reservations/module')(app);
require('./modules/provider-account-api/module')(app);
require('./modules/courses-api/module')(app);


/* Employer accounts api */

app.get('/accounts-api/*',(req, res) => {
    files.sendResponseFile(res, req.url, req.method);
});

app.get('/accounts-api-v2/*',(req, res) => {
    files.sendResponseFile(res, req.url, req.method);
});


/* Levy Transfer Matching Inner Api */
app.get('/levy-transfer-matching-api/applications/*',(req, res) => {
    
    console.log("get pledge application invoked");
    let filename = __dirname + '\\modules\\levy-transfer-matching-api\\pledge-application-with-auto-approval.json';
    let result = JSON.parse(fs.readFileSync(filename, 'utf8'));
    res.header("Content-Type",'application/json');
    res.send(result);
});

/* Approvals */

app.get('/apim-endpoints/approvals/pledgeapplications/:pledgeApplicationId',(req, res) => {

    let pledgeApplicationId = req.params.pledgeApplicationId;

    console.log(string.format("GetPledgeApplication {0}", pledgeApplicationId));

    files.sendFile(res, '\\modules\\apim-endpoints\\approvals\\pledge-application-with-auto-approval.json');

});

