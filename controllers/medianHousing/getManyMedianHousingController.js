const MedianHousingCost = require("../../models/medianHousing");

module.exports = async function getManyMedianHousing(county, start_year, end_year) {
    /**
     * Retrieve a range of median housing cost indicators from the database, using the start and end year as bounds for the query.
     * Return the data in ascending order by year, matching the data points to the corresponding year
     * @param {string} county County for the data point
     * @param {string} start_year Start year for the range of data point
     * @param {string} end_year Start year for the range of data point
     * @return {object} JSON object containing the requested range of indicator's data
     */

    try {
        var data = await MedianHousingCost.aggregate()
            .match({
                county: county,
                year: { $gte: start_year, $lte: end_year }
            })
            .group({
                _id: '$year',
                medianHousingCost: { $first: '$medianHousingCost' }
            });
        var result = { 'county': county, 'data': data }
        return result
    } catch (err) {
        throw err;
    }
}