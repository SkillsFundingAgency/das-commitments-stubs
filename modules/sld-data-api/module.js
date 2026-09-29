/* SLD Data Api (DC SLDDataApi Api) - FLP-1281
 *
 * GET /sld-data-api/api/lars/get-em-value/{learnAimRef}/{startDate}
 *
 * 200 -> bare JSON number (the English & Maths course value)
 * 400 / 404 / 500 -> JSON string body (error message)
 *
 * Response varies by learnAimRef only (startDate is logged but ignored):
 *   "400"     -> 400
 *   "404"     -> 404
 *   "500"     -> 500
 *   "DECIMAL" -> 1234.56 (tests decimal handling)
 *   anything else -> 1000
 */

const DEFAULT_VALUE = 1000;
const DECIMAL_VALUE = 1234.56;

module.exports = function(app) {

    app.get('/sld-data-api/api/lars/get-em-value/:learnAimRef/:startDate', (req, res) => {

        const learnAimRef = req.params.learnAimRef;
        const startDate = req.params.startDate;

        console.log(`SLD get-em-value request: learnAimRef=${learnAimRef}, startDate=${startDate}`);

        if (learnAimRef === "400") {
            return res.status(400).json("Bad Request (stub)");
        }

        if (learnAimRef === "404") {
            return res.status(404).json("Not found (stub)");
        }

        if (learnAimRef === "500") {
            return res.status(500).json("Internal Server Error (stub)");
        }

        const value = learnAimRef === "DECIMAL" ? DECIMAL_VALUE : DEFAULT_VALUE;

        // res.json emits a bare number, e.g. 1000 or 1234.56
        res.json(value);
    });

};
