/* Collection Calendar Api */

module.exports = function(app) {
  app.get('/collection-calendar-api/academicyears/:academicYear', (req, res) => {
    console.log("GET - collection-calendar-api/academicyears");

    let academicYear = req.params.academicYear;
    let startYear = parseInt(academicYear.substring(0, 2)) + 2000;
    let endYear = startYear + 1;

    const json = {
      "academicYear": academicYear,
      "startDate": `${startYear}-08-01T00:00:00`,
      "endDate": `${endYear}-07-31T00:00:00`,
      "hardCloseDate": `${endYear}-10-15T00:00:00`
    };

    res.header("Content-Type", 'application/json');
    res.send(json);
  });
};