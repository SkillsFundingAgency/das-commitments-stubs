/* Courses Api */

const files = require('../shared/files');
const fs = require('fs');

module.exports = function(app) {

    app.get('/courses-api/api/courses/routes', (req, res) => {

        files.sendFile(res, '/modules/courses-api/routes.json');
        
    });

    app.get('/courses-api/api/courses/levels', (req, res) => {

        files.sendFile(res, '/modules/courses-api/levels.json');

    });
    
    app.get('/courses-api/api/courses/standards/:standardId', (req, res) => {
        
        let standardId = req.params.standardId;

        console.log("Standard request for " + standardId);

        let filename = __dirname + '\\standards_get.json';
        let courseData = JSON.parse(fs.readFileSync(filename, 'utf8'));

        let result = courseData.standards.filter(obj => obj.standardUId === standardId || obj.larsCode == standardId);

        if (result.length === 0) {
            res.sendStatus(404);
            return;
        }

        result[0].ApprenticeshipType = "Apprenticeship";

        res.header("Content-Type", 'application/json');
        res.send(result[0]);

    });

    app.get('/courses-api/api/courses/standards', (req, res) => {

        let keyword = req.getFromQueryString("keyword");
        if (keyword === undefined) keyword = "";

        console.log("Standards request");


        let filename = __dirname + '\\standards_get.json';
        let courseData = JSON.parse(fs.readFileSync(filename, 'utf8'));

        let total = courseData.standards.length;

        let result = courseData.standards.filter(({title}) => title.toLowerCase().includes(keyword.toLowerCase()));

        let resultObject = JSON.parse("{}");
        resultObject.total = total;
        resultObject.totalFiltered = result.length;
        resultObject.standards = result;

        res.header("Content-Type", 'application/json');
        res.send(resultObject);
    });

    app.get('/courses-api/api/courses/frameworks', (req, res) => {

        console.log("Frameworks request");

        let resultObject = JSON.parse("{\"Frameworks\":[]}");

        res.header("Content-Type", 'application/json');
        res.send(resultObject);
    });

    app.get('/courses-api/ops/export', (req, res) => {

        console.log("Get all Standards request");

        let filename = __dirname + '\\standards_get.json';
        let courseData = JSON.parse(fs.readFileSync(filename, 'utf8'));

        let total = courseData.standards.length;

        let result = courseData.standards; 

        let resultObject = JSON.parse("{}");
        resultObject.total = total;
        resultObject.totalFiltered = result.length;
        resultObject.standards = result;

        res.header("Content-Type", 'application/json');
        res.send(resultObject);
    });

};