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


/* Provider account api */

app.get('/provider-account-api/*',(req, res) => {
    files.sendResponseFile(res, req.url, req.method);
});

/* Courses Api */

app.get('/courses-api/api/courses/standards/:standardId',(req, res) => {

    let standardId = req.params.standardId;

    let filename = __dirname + '\\modules\\courses-api\\standards_get.json';
    let courseData = JSON.parse(fs.readFileSync(filename, 'utf8'));

    let result = courseData.standards.filter(({standardUId}) => standardUId === standardId);

    if(result.length === 0)
    {
        res.sendStatus(404);
        return;
    }
    
    res.header("Content-Type",'application/json');
    res.send(result[0]);
    
});

app.get('/courses-api/api/courses/standards',(req, res) => {

    let keyword = req.getFromQueryString("keyword");
    if(keyword === undefined) keyword = ""; 
    
    console.log("Standards request");


    let filename = __dirname + '\\modules\\courses-api\\standards_get.json';
    let courseData = JSON.parse(fs.readFileSync(filename, 'utf8'));

    let total = courseData.standards.length;

    let result = courseData.standards.filter(({title}) => title.toLowerCase().includes(keyword.toLowerCase()));

    let resultObject = JSON.parse("{}");
    resultObject.total = total;
    resultObject.totalFiltered = result.length;
    resultObject.standards = result;

    res.header("Content-Type",'application/json');
    res.send(resultObject);
});




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

