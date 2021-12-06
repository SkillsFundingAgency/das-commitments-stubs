const config = require('./config');
const express = require("express");
const http = require("http");
const https = require("https");
const bodyParser = require('body-parser');
const fs = require('fs');
const pug = require('pug');
const files = require('./modules/shared/files.js');
const string = require('./modules/shared/string.js');

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

/* Reservations */

app.get('/apim-endpoints/reservations/transfers/validity',(req, res) => {
   
    let senderId = req.getFromQueryString("senderId");
    let receiverId = req.getFromQueryString("receiverId");
    let pledgeApplicationId = req.getFromQueryString("pledgeApplicationId");

    console.log(string.format("Transfer validation for Sender: {0}, Receiver: {1}, PledgeApplication: {2}", senderId, receiverId, pledgeApplicationId));

    files.sendFile(res, '\\modules\\apim-endpoints\\reservations\\valid-transfer.json');
    
});

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



/* Location Api */
app.get('/location-api/api/search',(req, res) => {

    let query = req.getFromQueryString("query");
    if(query === undefined) query = "";

    console.log("Location search request: " + query);


    let filename = __dirname + '\\modules\\location-api\\locations.json';
    let locations = JSON.parse(fs.readFileSync(filename, 'utf8'));

    let result = locations.filter(el => el.locationName.toLowerCase().includes(query.toLowerCase()));

    let response = JSON.parse("{}");
    response.Locations = result;
    
    res.header("Content-Type",'application/json');
    res.send(response);
});

app.get('/location-api/api/locations',(req, res) => {

    let locationName = req.getFromQueryString("locationName");
    if(locationName === undefined) locationName = "";
    let authorityName = req.getFromQueryString("authorityName");
    if(authorityName === undefined) authorityName = "";

    console.log("Locations request: " + locationName + ", " + authorityName);

    let filename = __dirname + '\\modules\\location-api\\locations.json';
    let locations = JSON.parse(fs.readFileSync(filename, 'utf8'));

    let result = locations.filter(el => el.locationName === locationName && el.localAuthorityName === authorityName);

    res.header("Content-Type",'application/json');
    res.send(result[0]);
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

/* Shared */

express.request.getFromQueryString = function(parameterName) {
    for (let key in this.query)
    {
        if(key.toLowerCase() === parameterName.toLowerCase())
        {
            return this.query[key];
        }
    }
};