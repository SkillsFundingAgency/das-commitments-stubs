/* Collection Calendar Api */

const files = require('../shared/files');

module.exports = function(app) {

  app.get('/collection-calendar-api/academicyears/', (req, res) => {
    console.log("GET - collection-calendar-api/academicyears");
    var date = req.query.date;
    var currentYear = parseInt(date.substring(0, 4));
    var currentMonth = parseInt(date.substring(5, 7));

    var yearFrom = 0;
    var yearTo = 0;
    if(currentMonth > 7){
      var yearFrom = currentYear;
      var yearTo = currentYear + 1;
    }
    else{
      var yearFrom = currentYear - 1;
      var yearTo = currentYear;
    }

    var json = {
      "academicYear": getAcademicYearString(yearFrom, yearTo),
      "startDate": `${yearFrom}-08-01T00:00:00`,
      "endDate": `${yearTo}-07-31T00:00:00`,
      "hardCloseDate": `${yearTo}-10-15T00:00:00`
    }

    res.header("Content-Type", 'application/json');
    res.send(json);
  });
   
};

/**
 * This will convert 2 dates into an academic year. e.g yearFrom 2023 and yearTo 2024 become 2324
 */
function getAcademicYearString(yearFrom, yearTo){
  var from = yearFrom - 2000; // removing 2000 turns 2023 into 23. This should work until the year 2100 at which point a refactor is needed :)
  var to = yearTo - 2000;

  return `${from}${to}`;
}