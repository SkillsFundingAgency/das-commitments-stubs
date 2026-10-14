/* Commitments v2 Api - Change of Circumstances approvals */

module.exports = function(app) {

    // PUT /approvals/{learningKey} - "Start an approval" (note: no "/api/" prefix, as per the spec).
    // Deliberately simple: only a StartDate change is supported. It is auto-approved, unless the new
    // StartDate falls on the 13th of a month, in which case it comes back 'pending' (employer approval needed).
    // Any request without a StartDate change throws (Express turns this into a 500).
    app.put('/commitments-v2-api/approvals/:learningKey', (req, res) => {
        console.log(`Commitments v2 - CoC Approval ${req.params.learningKey}`);
        console.log(`Commitments v2 - CoC Approval request body:\n${JSON.stringify(req.body, null, 2)}`);

        const changes = (req.body && req.body.Changes) || [];
        if (!changes.some(c => c.ChangeType === 'StartDate')) {
            throw new Error(`CoC Approval stub only supports changeType 'StartDate'; got: ${JSON.stringify(changes.map(c => c.ChangeType))}`);
        }

        const startDateChange = changes.find(c => c.ChangeType === 'StartDate');
        const newStartDate = startDateChange.Data && startDateChange.Data.New;
        const isPending = new Date(newStartDate).getUTCDate() === 13;
        const approvalStatus = isPending ? 'pending' : 'autoApproved';
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
