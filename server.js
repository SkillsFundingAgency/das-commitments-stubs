const config = require('./config');
const express = require("express");
const bodyParser = require('body-parser');
const pug = require('pug');

require('./modules/shared/querystring');

const port = process.env.PORT || config.port;

const app = express();

app.use(bodyParser.json());

app.set('view engine', 'pug');

app.get("/", (req, res) => {
    res.render('splash');
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
  });

require('./modules/provider-relationships/module')(app);
require('./modules/location-api/module')(app);
require('./modules/provider-account-api/module')(app);
require('./modules/courses-api/module')(app);
require('./modules/provider-courses-api/module')(app);
require('./modules/levy-transfer-matching-api/module')(app);
require('./modules/accounts-api/module')(app);
require('./modules/commitments-v2-api/module')(app);
require('./modules/forecasting-api/module')(app);
require('./modules/apim-endpoints/reservations/module')(app);
require('./modules/apim-endpoints/approvals/module')(app);
require('./modules/apim-endpoints/manage-apprenticeships/module')(app);
