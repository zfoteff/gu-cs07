const LaborForce = require("../../models/laborForce");

module.exports = async function createLaborForce(
    county,
    state,
    year,
    laborForce) {
    /**
     * Creates new labor force indicator and insert it into the database
     * @param {string} county County for the data point
     * @param {string} state State for the data point
     * @param {string} year Year for the data point
     * @param {string} laborForce Labor force data for the indicator
     * @returns {object} JSON object with the result of the insertion into the database
     */

    try {
        const newLabor = new LaborForce({
            county: county,
            state: state,
            year: year,
            laborForce: parseFloat(laborForce),
        });

        await newLabor.save();
        return { corr_id: newLabor._id };
    } catch (err) {
        throw err
    }
}