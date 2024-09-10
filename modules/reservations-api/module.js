/* Reservation api */
const string = require('../shared/string');
const files = require('../shared/files');
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');

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
        var response = { ReservationId: id };
        console.log("Change a Reservation endpoint");

        res.json(response);
    });

    app.post('/reservations-api/api/Reservations/accounts/bulk-create', (req, res) => {
        console.log("Procesing bulk Reservations Create");
        var bodyContent = req.body;

        var reservations = bodyContent.Reservations;
        const returnList = reservations.map(({ Id, ULN }) => ({ ReservationId : Id, ULN }));
        console.log(returnList);

        var response = { BulkCreateResults: returnList };
        console.log("Returning bulk Reservations");

        res.json(response);
    });

    app.post('/reservations-api/api/accounts/:accountId/reservations', (req, res) => {

        var id = uuidv4();

        console.log("Creating a Reservation Id", id);
        var response = { Id: id };
        console.log("Create a Reservation endpoint");

        res.json(response);
    });

    app.delete('/reservations-api/api/reservations/:id', (req, res) => {
        console.log("Delete a Reservation endpoint");
        res.status(200).send({ message: 'Reservation deleted successfully' });
    });

    app.get('/reservations-api/api/accounts/:accountId/status', (req, res) => {

        let accountId = req.params.accountId;
        let transferSenderId = req.query.transferSenderId;

        if (!transferSenderId) {
            console.log("Calling Account Reservation status for " + accountId);
            files.sendFile(res, "/modules/reservations-api/" + accountId + "/accountstatus_get.json");
        }
        else {
            console.log("Calling Account Reservation status for with transfer sender " + accountId + " and " + transferSenderId);
            files.sendFile(res, "/modules/reservations-api/" + accountId + "/accountstatus_with_transfer_sender_get.json");
        }
    });

    app.get('/reservations-api/api/accounts/:accountId/reservations', (req, res) => {

        let accountId = req.params.accountId;
        console.log("Calling Account Reservations list for " + accountId);
        files.sendFile(res, "/modules/reservations-api/" + accountId + "/reservations_get.json");
    });
};
