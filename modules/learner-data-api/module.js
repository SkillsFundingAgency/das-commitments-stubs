/* Learner Data Api */

const files = require('../shared/files');

module.exports = function(app) {

  app.get('/learner-data-api/learners/:academicYear', (req, res) => {
    
    let academicYear = req.params.academicYear;// ignored, but here for completeness
    var ukprn = req.query.ukprn;
    var pageNumber = req.query.pageNumber;// ignored, but here for completeness
    var pageSize = req.query.pageSize;// ignored, but here for completeness

    console.log(`GET - /learner-data-api/learners/${academicYear}?ukprn=${ukprn}&pageNumber=${pageNumber}&pageSize=${pageSize}`);


    res.header("Content-Type", 'application/json');
    res.header("X-Pagination", '{"TotalItems":4,"PageNumber":1,"PageSize":4,"TotalPages":1}');
    files.sendFile(res, `/modules/learner-data-api/${ukprn}.json`);
  });
   
};

