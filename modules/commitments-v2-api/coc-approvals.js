/* Commitments v2 Api - Change of Circumstances approvals */

module.exports = function(app) {

    // PUT /approvals/{learningKey} - "Start an approval" (note: no "/api/" prefix, as per the spec).
    // Deliberately simple: only a StartDate change is supported. The verdict is chosen by the day of the new StartDate:
    //   13th of a month -> 'EmployerApprovalRequested' (pending employer approval; the value the real API sends for Pending)
    //   14th of a month -> 'AutoRejected'
    //   any other day   -> 'autoApproved'
    // A price-only request (NewPrices but no StartDate change) always comes back 'EmployerApprovalRequested'.
    // Any other request without a StartDate change throws (Express turns this into a 500).
    app.put('/commitments-v2-api/approvals/:learningKey', (req, res) => {
        console.log(`Commitments v2 - CoC Approval ${req.params.learningKey}`);
        console.log(`Commitments v2 - CoC Approval request body:\n${JSON.stringify(req.body, null, 2)}`);

        const changes = (req.body && req.body.Changes) || [];
        const newPrices = (req.body && req.body.NewPrices) || [];
        if (!changes.some(c => c.ChangeType === 'StartDate')) {
            if (newPrices.length > 0) {
                console.log(`Commitments v2 - CoC Approval ${req.params.learningKey} Prices -> EmployerApprovalRequested`);
                res.status(201).json({
                    changes: [{ changeType: 'Prices', approvalStatus: 'EmployerApprovalRequested', data: null }],
                    newPrices
                });
                return;
            }
            throw new Error(`CoC Approval stub only supports changeType 'StartDate' or a price-only change; got: ${JSON.stringify(changes.map(c => c.ChangeType))}`);
        }

        const startDateChange = changes.find(c => c.ChangeType === 'StartDate');
        const newStartDate = startDateChange.Data && startDateChange.Data.New;
        const approvalStatus = getApprovalStatus(newStartDate);
        console.log(`Commitments v2 - CoC Approval ${req.params.learningKey} StartDate ${newStartDate} -> ${approvalStatus}`);

        res.status(201).json({
            changes: [{
                changeType: 'StartDate',
                approvalStatus,
                data: { old: startDateChange.Data && startDateChange.Data.Old, new: newStartDate }
            }],
            prices: []
        });
    });
};

function getApprovalStatus(newStartDate) {
    switch (new Date(newStartDate).getUTCDate()) {
        case 13: return 'EmployerApprovalRequested';
        case 14: return 'AutoRejected';
        default: return 'autoApproved';
    }
}
