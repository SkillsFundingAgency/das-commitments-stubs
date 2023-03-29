/* RoATP Service Api */

const files = require('../shared/files');
const string = require('../shared/string');

module.exports = function(app) {

    app.get('/roatp-service-api/api/v1/search', (req, res) => {

        let keyword = req.getFromQueryString("searchTerm");
        if (keyword === undefined) keyword = "";

        console.log(string.format("RoATP Service - search request - {0}", keyword));
        
        if(keyword === "10000896")
        {
            files.sendFile(res, '/modules/roatp-service-api/employer_provider.json');
   
        }
        else
        {
            files.sendFile(res, '/modules/roatp-service-api/main_provider.json');    
        }

    });

    

};