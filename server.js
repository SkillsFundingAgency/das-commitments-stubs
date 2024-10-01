const config = require('./config');
const https = require('https');
const fs = require('fs');
const express = require("express");
const bodyParser = require('body-parser');
const pug = require('pug');

require('./modules/shared/querystring');

const port = process.env.PORT || config.port;

const app = express();

https.createServer({
    key: fs.readFileSync('certs/localhost+2-key.pem'),
    cert: fs.readFileSync('certs/localhost+2.pem'),
    requestCert: false,
    rejectUnauthorized: false,
}, app).listen(config.sslport, () => {
    console.log("https server listening on port " + config.sslport);
});

app.listen(port, () => {
    console.log("http server listening on port " + port);
});

app.use(bodyParser.json());

app.set('view engine', 'pug');

app.get("/", (req, res) => {
    res.render('splash');
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
require('./modules/rofjaa-api/module')(app);
require('./modules/apim-endpoints/reservations/module')(app);
require('./modules/apim-endpoints/approvals/module')(app);
require('./modules/apim-endpoints/manage-apprenticeships/module')(app);
require('./modules/reservations-ui/module')(app);
require('./modules/reservations-api/module')(app);
require('./modules/roatp-service-api/module')(app);
require('./modules/employer-profiles-api/module')(app);
require('./modules/employer-users-api/module')(app);
require('./modules/provider-events-api/module')(app);
require('./modules/recruit-api/module')(app);
require('./modules/candidate-api/module')(app);
require('./modules/faa-legacy-api/module')(app);
require('./modules/apim-endpoints/apprentice-feedback-api/module')(app);

require('./modules/apprentice-accounts-api/module')(app);
require('./modules/assessor-service-api/module')(app);
require('./modules/collection-calendar-api/module')(app);
