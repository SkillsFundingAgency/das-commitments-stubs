/* Approvals outer api */
const files = require('../../shared/files');
const string = require('../../shared/string');
const fs = require('fs');

module.exports = function(app) {

    app.get('/apim-endpoints/approvals/pledgeapplications/:pledgeApplicationId',(req, res) => {

        let pledgeApplicationId = req.params.pledgeApplicationId;

        console.log(string.format("GetPledgeApplication {0}", pledgeApplicationId));

        files.sendFile(res, '\\modules\\apim-endpoints\\approvals\\pledge-application-with-auto-approval.json');

    });

    app.get('/apim-endpoints/approvals/datalock/statuses',(req, res) => {

        let page = parseInt(req.getFromQueryString("page")) + 1;

        console.log(string.format("Get Datalock Statuses from page {0}", page));

        files.sendFile(res, '\\modules\\apim-endpoints\\approvals\\datalocks.json');

    });

    app.get('/apim-endpoints/approvals/datalock/statusesxxx',(req, res) => {

        let sinceEventIdString = req.getFromQueryString("sinceEventId");
        if(sinceEventIdString === "") sinceEventIdString = "0";
        let sinceEventId = parseInt(sinceEventIdString);

        console.log(string.format("Get Datalock Statuses from event id {0}", sinceEventId));

        sinceEventId = sinceEventId + 1;
        
        let filename = __dirname + '\\datalocks.json';
        let rawdata = fs.readFileSync(filename, 'utf8');
      
        let resultObject = JSON.parse(rawdata);
        
        var dlock = resultObject.dataLockStatuses[0];
        
        resultObject.dataLockStatuses = [];

        for (let i = 0; i < 100; i++) {

            var newDlock = JSON.parse(JSON.stringify(dlock));

            newDlock.id = sinceEventId + i;
            newDlock.dataLockEventId = sinceEventId + i;
            newDlock.apprenticeshipId = sinceEventId + i;

            resultObject.dataLockStatuses.push(newDlock);
        }
       

        res.header("Content-Type", 'application/json');
        res.send(resultObject);
        
    });
   
    
};
