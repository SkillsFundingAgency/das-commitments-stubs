/* Register of Flexi-Job Apprenticeship Agencies inner api */
const files = require('../shared/files');
const string = require('../shared/string');

module.exports = function(app) {

    app.get('/rofjaa-api/agencies/:legalEntityId',(req, res) => {

        let legalEntityId = req.params.legalEntityId;

        console.log(string.format("Rofjaa Api Get LegalEntityId {0}", legalEntityId));

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
