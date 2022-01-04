/* Courses Api */

const fs = require('fs');

module.exports = function(app) {

    app.get('/courses-api/api/courses/standards/:standardId', (req, res) => {

        let standardId = req.params.standardId;

        let filename = __dirname + '\\standards_get.json';
        let courseData = JSON.parse(fs.readFileSync(filename, 'utf8'));

        let result = courseData.standards.filter(({standardUId}) => standardUId === standardId);

        if (result.length === 0) {
            res.sendStatus(404);
            return;
        }

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
};