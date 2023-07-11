/* Reservation api */
const string = require('../shared/string');
const files = require('../shared/files');
const crypto = require("crypto");

module.exports = function(app) {

    app.get('/reservations-api/api/reservations/validate/*',(req, res) => {
        
        console.log("Calling Reservation Validation endpoint");
        files.sendFile(res, '\\modules\\reservations-api\\validation-response.json');    
    });

    app.post('/reservations-api/api/Reservations/accounts/bulk-validate', (req, res) => {

        console.log("Calling Bulk upload Validation endpoint");
        files.sendFile(res, '\\modules\\reservations-api\\validation-response.json');
    });

    app.post('/reservations-api/api/reservations/:id/change', (req, res) => {

        var id = crypto.randomBytes(16).toString("hex");

        console.log("Creating a Reservation Id", id);
        var response = { ReservationdId: id };
        console.log("Change a Reservation endpoint");

        res.json(response);
    });
};
