/* Provider courses api */
const files = require('../shared/files');

module.exports = function(app) {

    app.get('/provider-courses-api/providers/:providerId/courses/:courseId',(req, res) => {
        
        let providerId = req.params.providerId;
        let courseId = req.params.courseId;

        //console.log(string.format("Get Course Delivery {0} {1}", providerId, courseId));

        if(courseId === "274") //only "abattoir worker"
        {
            files.sendFile(res, '\\modules\\provider-courses-api\\course-delivery-response.json');    
        }
        else
        {
            files.sendFile(res, '\\modules\\provider-courses-api\\regular-course-delivery-response.json');
        }
    });

};
