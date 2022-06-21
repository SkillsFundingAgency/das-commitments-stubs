/* Register of Flexi-Job Apprenticeship Agencies inner api */
const files = require('../shared/files');
const string = require('../shared/string');

module.exports = function(app) {

    app.get('/rofjaa-api/agency/:legalEntityId',(req, res) => {

        let legalEntityId = req.params.legalEntityId;

        console.log(string.format("legalEntityId {0}", legalEntityId));

        if(legalEntityId === "2818")
        {
            files.sendFile(res, '/modules/rofjaa-api/fjaa-agency.json');    
        }
        else
        {
            res.sendStatus(404);
        }
    });
};
