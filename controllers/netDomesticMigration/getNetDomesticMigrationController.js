const NetDomesticMigration = require("../../models/netDomesticMigration");

module.exports = async function getNetDomesticMigration(county, year) {
    /**
     * Retrieve a single net domestic migration indicator from the database
     * @param {string} county County for the data point
     * @param {string} year Year for the data point
     * @return {object} JSON object containing the requested indicator's data
     */

    try {
        var data = await NetDomesticMigration.findOne({ county: county, year: year }).exec();
        if (data == null)
            return { 'corr_id': null };
        var result = {
            'corr_id': data._id,
            'county': data.county,
            'state': data.state,
            'year': data.year,
            'netDomesticMigration': data.netDomesticMigration
        }
        return result
    } catch (err) {
        throw err;
    }
}