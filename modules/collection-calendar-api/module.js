/* Collection Calendar api */
const files = require('../shared/files');

module.exports = function(app) {

    app.get("/collection-calendar-api/academicyears/*", (req, res) => {

        console.log("Get collection calendar dates ");

        files.sendFile(res, '\\modules\\collection-calendar-api\\dates.json');
    });
};
