/* Reservations */
const files = require('../../shared/files');
const string = require('../../shared/string');

module.exports = function(app) {

    app.get('/apim-endpoints/reservations/transfers/validity', (req, res) => {

        let senderId = req.getFromQueryString("senderId");
        let receiverId = req.getFromQueryString("receiverId");
        let pledgeApplicationId = req.getFromQueryString("pledgeApplicationId");

        console.log(string.format("Transfer validation for Sender: {0}, Receiver: {1}, PledgeApplication: {2}", senderId, receiverId, pledgeApplicationId));

        files.sendFile(res, '\\modules\\apim-endpoints\\reservations\\valid-transfer.json');

    });
};