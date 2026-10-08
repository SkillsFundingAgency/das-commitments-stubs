/* Commitments v2 Api */

module.exports = function(app) {
    require('./core')(app);
    require('./coc-approvals')(app);
};
