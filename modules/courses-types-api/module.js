/* Provider courses api */
const string = require('../shared/string');
const files = require('../shared/files');

module.exports = function(app) {

    app.get('/courses-types-api/api/coursetypes/:courseId/features/learnerAge',(req, res) => {
        console.log(string.format("Get LearnerAge for course"));
        files.sendFile(res, '\\modules\\courses-types-api\\course-age-response.json');
    });

    app.get('/courses-types-api/api/coursetypes/:courseId/features/rpl',(req, res) => {
        console.log(string.format("Get RPL for course"));
        files.sendFile(res, '\\modules\\courses-types-api\\course-rpl-response.json');
    });
};
