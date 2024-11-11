/* Provider relationships module */

const files = require('../shared/files');

module.exports = function(app) {


    app.get('/provider-relationships/*',(req, res) => {

        if(req.url.includes('has-relationship-with')){
            handleHasRelationshipWithRequest(req,res);
            return;
        }

        if(req.url.includes('accountproviderlegalentities')){
            handleAccountProviderLegalEntitiesRequest(req,res);
            return;
        }

        files.sendResponseFile(res, req.url, req.method);
    });

};

function handleHasRelationshipWithRequest(req, res){
    console.log(`Handling request ${req.url}`);
    var ukprn = req.query.ukprn;
    var operationInt = req.query.operation;
    var operation = '';

    switch(operationInt){
        case '0':
            operation = 'CreateCohort';
            break;
        case '1':
            operation = 'Recruitment';
            break;
        case '2':
            operation = 'RecruitmentRequiresReview';
            break;
    }

    var path = `/provider-relationships/api/${ukprn}`;
    var json = files.getFileAsJson(path, req.method)

    var result = json.some(i=> i.Permissions.some(j=>j == operation));
    res.header("Content-Type", 'application/json');
    res.send(result);
    console.log(`returning result ${result}`);
}

function handleAccountProviderLegalEntitiesRequest(req, res){
    console.log(`Handling request ${req.url}`);
    var ukprn = req.query.ukprn;
    var operationInt = req.query.operations;
    var operation = '';

    switch(operationInt){
        case '0':
            operation = 'CreateCohort';
            break;
        case '1':
            operation = 'Recruitment';
            break;
        case '2':
            operation = 'RecruitmentRequiresReview';
            break;
    }

    var path = `/provider-relationships/api/${ukprn}`;
    var json = files.getFileAsJson(path, req.method)

    var result = json.filter(i=> i.Permissions.some(j=>j == operation));
    res.header("Content-Type", 'application/json');
    res.send({"AccountProviderLegalEntities":result});
    console.log(`returning result ${result}`);
}