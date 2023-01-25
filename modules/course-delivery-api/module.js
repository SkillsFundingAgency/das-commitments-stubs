/* Course Delivery inner api */
/* Obsolete - will be switched off March 2023 */
const files = require('../shared/files');
const string = require('../shared/string');

module.exports = function(app) {

    app.get('/course-delivery-api/api/providers/:providerId',(req, res) => {

        let providerId = req.params.providerId;
        console.log(string.format("Course Delivery Api Get Provider {0}", providerId));
        files.sendFile(res, '/modules/course-delivery-api/10005077.json');            
    });
};
