/* Recruit api */
const files = require('../shared/files');

module.exports = function(app) {

    app.get("/recruit-api/api/livevacancies/total-positions-available", (req, res) => {
        console.log("Recruit Api: total positions available");
        files.sendFile(res, '/modules/recruit-api/total-positions-available.json');
    });
    
    app.get("/recruit-api/api/livevacancies", (req, res) => {

        let pageNumber = req.getFromQueryString("pageNo");

        console.log("Recruit Api: Get live vacancies: page " + pageNumber);

        if(pageNumber === "1")
        {
            files.sendFile(res, '/modules/recruit-api/vacancies_page1.json');  
        }
        else if(pageNumber === "2")
        {
            files.sendFile(res, '/modules/recruit-api/vacancies_page2.json');
        }
        else
        {
            files.sendFile(res, '/modules/recruit-api/vacancies_page1.json');    
        }
    });

    app.get("/recruit-api/api/livevacancies/:vacancyReference", (req, res) => {
        let vacancyReference = req.params.vacancyReference;
        console.log("Recruit Api: Get live vacancy " + vacancyReference);
        
        if(vacancyReference === "1000012333")
        {
            res.sendStatus(404);
            return;
        }
        
        files.sendFile(res, '/modules/recruit-api/vacancy.json');
    });

    app.get("/recruit-api/api/closedvacancies/:vacancyReference", (req, res) => {
        let vacancyReference = req.params.vacancyReference;
        console.log("Recruit Api: Get closed vacancy " + vacancyReference);
        
        if(vacancyReference == '1000000999')
        {
            res.sendStatus(404);
            return;
        }
        
        files.sendFile(res, '/modules/recruit-api/closed-vacancy.json');
    });

    app.post("/recruit-api/api/applications/:candidateId", (req, res) => {
        let candidateId = req.params.candidateId;
        console.log("Recruit Api: Create application for candidate " + candidateId);
        res.sendStatus(204); //must return a no-content response code
    });


    app.post("/recruit-api/api/closedvacancies", (req, res) => {
       
        console.log("Recruit Api: Get closed vacancies");
        files.sendFile(res, '/modules/recruit-api/closed-vacancies.json');
    });

};
