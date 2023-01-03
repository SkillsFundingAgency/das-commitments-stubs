/* Reservation api */
const string = require('../shared/string');
const files = require('../shared/files');


module.exports = function(app) {

    app.get('/reservations-api/api/reservations/validate/*',(req, res) => {
        
        console.log("Calling Reservation Validation endpoint");
        files.sendFile(res, '\\modules\\reservations-api\\validation-response.json');    
    });
};
