/* Commitments v2 Api - Change of Circumstances approvals */

module.exports = function(app) {

    // PUT /approvals/{learningKey} - "Start an approval" (note: no "/api/" prefix, as per the spec).
    // Deliberately simple: only a StartDate change is supported, and it is always auto-approved.
    // Any request without a StartDate change throws (Express turns this into a 500).
    app.put('/commitments-v2-api/approvals/:learningKey', (req, res) => {
        console.log(`Commitments v2 - CoC Approval ${req.params.learningKey}`);

        const changes = (req.body && req.body.changes) || [];
        if (!changes.some(c => c.changeType === 'StartDate')) {
            throw new Error(`CoC Approval stub only supports changeType 'StartDate'; got: ${JSON.stringify(changes.map(c => c.changeType))}`);
        }

        res.status(201).json({
            changes: [{
                changeType: 'StartDate',
                approvalStatus: 'autoApproved',
                data: { old: '2025-09-01', new: '2025-09-15' }
            }],
            prices: []
        });
    });
};
