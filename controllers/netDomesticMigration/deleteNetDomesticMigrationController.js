const NetDomesticMigration = require('../../models/netDomesticMigration');

module.exports = async function deleteDomesticMigration(corr_id) {
    /**
     * Delete domestic migration indicator entry from the database using the indicator's correlation id as a key
     * @param {string} corr_id Correlation id of the object to delete from the database
     * @returns {object} JSON object with the result of the deletion from the database
     */

    try {
        var findResult = await NetDomesticMigration.findById(corr_id).exec();
        if (findResult == (null || undefined))
            return {
                result: "Failure",
                reason: "Could not find the data associated with that correlation id"
            }

        var deleteResult = await NetDomesticMigration.deleteOne({ _id: findResult._id }).exec();
        if (deleteResult.deletedCount == 1)
            return { result: "Success" };
        else
            return {
                result: "Failure",
                reason: "Could not delete element from the database"
            }
    } catch {
        return { result: "Failure" };
    }
}