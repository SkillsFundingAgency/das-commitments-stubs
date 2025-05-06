/* Reservations UI module */
const config = require('../../config');
const files = require('../shared/files');
const uuidv1 = require('uuid/v1');
const string = require('../shared/string');

module.exports = function(app) {

        
        //Provider Reservations endpoint - simulates start of Provider Reservations journey
            app.get("/reservations-ui/:providerId/reservations", (req, res) => {
        
                let providerId = req.params.providerId;
        
                console.log("Reservation selection for Provider " + providerId);
        
                let viewmodel = {
                    providerId : providerId,
                    reservations : [
                        {
                            reservationTitle: "Rapid Logistics (non levy)",
                            reservationSubtitle: "Reservation with for Geospatial Survey Technician (244) June 2019",
                            accountLegalEntityId: 'X9JE72',
                            reservationUrl: string.format("{0}/{1}/unapproved/add-apprentice?reservationId={2}&employerAccountLegalEntityPublicHashedId={3}&courseCode={4}&startMonthYear={5}",
                                config.providerCommitmentsBaseUrl,
                                providerId,
                                uuidv1(),
                                'X9JE72',
                                "244",
                                "062019")
                        }
                    ]
                };
        
                res.render('..\\modules\\reservations-ui\\views\\use-reservation', viewmodel);
            });
        
        
        //Provider Reservation selection page, used in "Add Another Apprentice" journey
        //If transfer sender id is included, the endpoint assumes that the sender is a levy payer so the user gets an "auto" reservation
            app.get("/reservations-ui/:providerId/reservations/:employerId/select", (req, res) => {
        
                let providerId = req.params.providerId;
                let employerId = req.params.employerId;
                let useLearnerData = req.getFromQueryString("useLearnerData");
                let cohortRef = req.getFromQueryString("cohortReference");
                let transferSenderId = req.getFromQueryString("transferSenderId");
                let journeyData = req.getFromQueryString("journeydata");
        
                console.log(string.format("Reservation selection for Provider: {0}, Employer: {1}", providerId, employerId));
                if(transferSenderId !== undefined)
                {
                    console.log(string.format("Transfer Sender {0} indicated", transferSenderId));
                }
        
                //simulate levy-payer auto create and redirect
                if(config.hashedlevyaccountlegalentities.includes(employerId) || (transferSenderId !== undefined))
                {
                    console.log("Simulating greenlight for levy payer - auto redirecting to add apprentice");
        
                    let redirectUrl = string.format("{0}/{1}/unapproved/{2}apprentices/add?reservationId={3}&employerAccountLegalEntityPublicHashedId={4}{5}{6}&autocreated=true{7}",
                        config.providerCommitmentsBaseUrl,
                        providerId,
                        cohortRef === undefined ? "" : cohortRef + "/",
                        uuidv1(),
                        employerId,
                        transferSenderId === undefined ? "" : "&transferSenderId=" + transferSenderId,
                        journeyData === undefined ? "" : "&journeydata=" + journeyData,
                        useLearnerData === undefined ? "" : "&useLearnerData=" + useLearnerData
                    );
        
                    res.redirect(redirectUrl);
                    return;
                }
        
                //non-levy payer must select a reservation
                let viewmodel = {
                    providerId : providerId,
                    cohortRef: cohortRef,
                    reservations : [
                        {
                            reservationTitle: "Geospatial Survey Technician (244) June 2019",
                            reservationSubtitle: "",
                            accountLegalEntityId: employerId,
                            reservationDescription: "",
                            reservationUrl: string.format("{0}/{1}/unapproved/{2}apprentices/add?reservationId={3}&employerAccountLegalEntityPublicHashedId={4}&courseCode={5}&startMonthYear={6}{7}",
                                config.providerCommitmentsBaseUrl,
                                providerId,
                                cohortRef === undefined ? "" : cohortRef + "/",
                                uuidv1(),
                                employerId,
                                "244",
                                "062019",
                                journeyData === undefined ? "" : "&journeydata=" + journeyData
                            )
                        }
                    ]
                };
        
                res.render('..\\modules\\reservations-ui\\views\\select-reservation', viewmodel);
            });
        
        
        
        
            /!* employer routes *!/
        
        
        //Employer Reservations endpoint - simulates start of Employer Reservations journey
            app.get("/reservations-ui/accounts/:accountId/reservations", (req, res) => {
        
                let accountId = req.params.accountId;
        
                console.log("Reservation selection for Employer Account: " + accountId);
        
                if(config.hashedLevyAccounts.includes(accountId))
                {
                    res.status(400).send('This endpoint is not appropriate for levy paying employers, who have no reservations UI');
                    return;
        
                }
        
                let reservations = config.employerReservations.filter(function(item){ return item.accountId === accountId });
        
                let viewmodel = {
                    reservations: []
                };
        
                reservations.forEach(reservation => {
        
                    viewmodel.reservations.push({
                        reservationTitle: reservation.title,
                        reservationSubtitle: reservation.subtitle,
                        accountLegalEntityId: reservation.accountLegalEntityId,
                        reservationUrl:  string.format("{0}/{1}/unapproved/add?reservationId={2}&accountLegalEntityHashedId={3}&courseCode={4}&startMonthYear={5}",
                            config.employerCommitmentsBaseUrl,
                            accountId,
                            uuidv1(),
                            reservation.accountLegalEntityId,
                            reservation.courseCode,
                            reservation.startMonthYear
                        )
                    });
        
                });
        
                res.render('..\\modules\\reservations-ui\\views\\employer-use-reservation', viewmodel);
            });
        
        
        //Employer Reservation selection page, used in "Add Another Apprentice" journey
        //If transfer sender id is included, the endpoint assumes that the sender is a levy payer so the user gets an "auto" reservation
        
        //Provider Select Reservation endpoint
            app.get("/reservations-ui/accounts/:accountId/reservations/:legalEntityId/select", (req, res) => {
        
                let employerId = req.params.accountId;
                let legalEntityId = req.params.legalEntityId;
        
                let cohortRef = req.getFromQueryString("cohortReference");
                let transferSenderId = req.getFromQueryString("transferSenderId");
                if(transferSenderId === "" ) {transferSenderId = undefined; }
                let providerId = req.getFromQueryString("providerId");
                let journeyData = req.getFromQueryString("journeydata");
                let encodedPledgeApplicationId = req.getFromQueryString("encodedPledgeApplicationId");
                if (encodedPledgeApplicationId === "") { encodedPledgeApplicationId = undefined; }
                let beforeProviderSelected = req.getFromQueryString("beforeProviderSelected");
                if (beforeProviderSelected === "") { beforeProviderSelected = undefined; }
                let apprenticeshipSessionKey = req.getFromQueryString("apprenticeshipSessionKey");
                if (apprenticeshipSessionKey === "") { apprenticeshipSessionKey = undefined; }
        
                console.log(string.format("Reservation selection for Employer: {0}, Ale: {1}", employerId, legalEntityId));
                if(transferSenderId !== undefined)
                {
                    console.log(string.format("Transfer Sender {0} indicated", transferSenderId));
                    if(encodedPledgeApplicationId !== undefined)
                    {
                        console.log(string.format("Pledge Application Id {0} indicated", encodedPledgeApplicationId));
                    }
                }
        
                //simulate levy-payer auto create and redirect (includes transfer receiver)
                if(config.hashedLevyAccounts.includes(employerId) || (transferSenderId !== undefined))
                {
                    console.log("Simulating greenlight for levy payer - auto redirecting to add apprentice");
        
                    let redirectUrl = string.format("{0}/{1}/unapproved/{2}?reservationId={3}&accountLegalEntityHashedId={4}{5}{6}{7}{8}{9}&autocreated=true",
                        config.employerCommitmentsBaseUrl,
                        employerId,
                        cohortRef === undefined ? "add/apprentice" : cohortRef + "/apprentices/add",
                        uuidv1(),
                        legalEntityId,
                        transferSenderId === undefined ? "" : "&transferSenderId=" + transferSenderId,
                        encodedPledgeApplicationId === undefined ? "" : "&encodedPledgeApplicationId=" + encodedPledgeApplicationId,
                        providerId === undefined ? "" : "&providerId=" + providerId,
                        journeyData === undefined ? "" : "&journeydata=" + journeyData,
                        apprenticeshipSessionKey === undefined ? "" : "&apprenticeshipSessionKey=" + apprenticeshipSessionKey,
                    );
        
                    res.redirect(redirectUrl);
                    return;
                }
        
                let backUrl = "";
                if(cohortRef === undefined)
                {
                    backUrl = "https://localhost:44376/" + employerId + "/unapproved/add/assign?ProviderId=" + providerId + "&AccountLegalEntityHashedId=" + legalEntityId;
                }
                else
                {
                    backUrl = "https://localhost:44376/" + employerId + "/unapproved/" + cohortRef;
                }

                let returnAddPage = "/apprentices/add";
                if (cohortRef === undefined) {
                    if (beforeProviderSelected !== undefined) {
                        returnAddPage = "add/set-reservation";
                    }
                    else {
                        returnAddPage = "add/apprentice";
                    }
                }

                //non-levy payer must select a reservation
                let viewmodel = {
                    cohortRef: cohortRef,
                    backUrl: backUrl,
                    reservations : [
                        {
                            reservationTitle: "Geospatial Survey Technician (244) June 2019",
                            reservationSubtitle: "",
                            accountLegalEntityId: employerId,
                            reservationDescription: "",
                            reservationUrl: string.format("{0}/{1}/unapproved/{2}?reservationId={3}&accountLegalEntityHashedId={4}&courseCode={5}&startMonthYear={6}{7}{8}{9}",
                                config.employerCommitmentsBaseUrl,
                                employerId,
                                cohortRef === undefined ? returnAddPage : cohortRef + "/apprentices/add",
                                uuidv1(),
                                legalEntityId,
                                "244",
                                "032025",
                                providerId === undefined ? "" : "&providerId=" + providerId,
                                journeyData === undefined ? "" : "&journeydata=" + journeyData,
                                apprenticeshipSessionKey === undefined ? "" : "&apprenticeshipSessionKey=" + apprenticeshipSessionKey,
                           )
                        }
                    ]
                };
        
                res.render('..\\modules\\reservations-ui\\views\\select-reservation', viewmodel);
        
            });
};