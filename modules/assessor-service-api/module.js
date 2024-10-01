/* Assessor service api */
const files = require('../shared/files');

module.exports = function(app) {
    
    app.get("/assessor-service-api/api/v1/learnerdetails/:apprenticeCommitmentsId", (req, res) => {
        let apprenticeCommitmentsId = req.params.apprenticeCommitmentsId;
        console.log("Assessor Service Api: Get Learner Details for " + apprenticeCommitmentsId);
        
        if(apprenticeCommitmentsId === "10")
        {
            files.sendFile(res, '/modules/assessor-service-api/learner-details.json');    
        }
        else
        {
            files.sendFile(res, '/modules/assessor-service-api/learner-details-2.json');
        }
        
    });

};
