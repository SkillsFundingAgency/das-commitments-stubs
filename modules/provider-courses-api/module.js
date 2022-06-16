/* Provider courses api */
const string = require('../shared/string');
const files = require('../shared/files');


module.exports = function(app) {

    app.get('/provider-courses-api/providers/:providerId/courses/:courseId',(req, res) => {
        
        let providerId = req.params.providerId;
        let courseId = req.params.courseId;

        console.log(string.format("Get Course Delivery for Provider {0} Course {1}", providerId, courseId));

        if(courseId === "274") //only "abattoir worker"
        {
            console.log("Returning Course Delivery response with PortableFlexiJob");
            files.sendFile(res, '\\modules\\provider-courses-api\\course-delivery-response.json');    
        }
        else
        {
            console.log("Returning default Regular Course Delivery response");
            files.sendFile(res, '\\modules\\provider-courses-api\\regular-course-delivery-response.json');
        }
    });

};
