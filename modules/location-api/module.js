/* Location api module */
const fs = require('fs');
const files = require('../shared/files');

module.exports = function(app) {

    app.get('/location-api/api/search',(req, res) => {

        let query = req.getFromQueryString("query");
        if(query === undefined) query = "";

        console.log("Location search request: " + query);

        let filename = __dirname + '\\locations.json';
        let locations = JSON.parse(fs.readFileSync(filename, 'utf8'));

        let result = locations.filter(el => el.locationName.toLowerCase().includes(query.toLowerCase()));

        let response = JSON.parse("{}");
        response.Locations = result;

        res.header("Content-Type",'application/json');
        res.send(response);
    });

    app.get('/location-api/api/locations',(req, res) => {

        let locationName = req.getFromQueryString("locationName");
        if(locationName === undefined) locationName = "";
        let authorityName = req.getFromQueryString("authorityName");
        if(authorityName === undefined) authorityName = "";

        console.log("Locations request: " + locationName + ", " + authorityName);

        let filename = __dirname + '\\locations.json';
        let locations = JSON.parse(fs.readFileSync(filename, 'utf8'));

        let result = locations.filter(el => el.locationName === locationName && el.localAuthorityName === authorityName);

        res.header("Content-Type",'application/json');
        res.send(result[0]);
    });

    app.get('/location-api/api/addresses',(req, res) => {

        console.log("Postcode locations request");
        
        files.sendFile(res, '\\modules\\location-api\\postcode-location.json');
        
    });

    app.get('/location-api/api/postcodes',(req, res) => {

        console.log("Postcode request");
        
        files.sendFile(res, '\\modules\\location-api\\postcode.json');

    });

};