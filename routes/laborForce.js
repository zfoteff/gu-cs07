const express = require('express');
const createLaborForce = require('../controllers/laborForce/createLaborForceController');
const getLaborForce = require('../controllers/laborForce/getLaborForceController');
const getManyLaborForce = require('../controllers/laborForce/getManyLaborForceController');
const deleteLaborForce = require('../controllers/laborForce/deleteLaborForceController')
const serialize = require('../serializers/laborForceSerializer');
var router = express.Router();

/*  insert new entry into the labor force collection in the db   */
router.post('/v1/newLaborForce', async(req, res) => {
    //  Check that query string exists
    if (
        typeof req.query.county === "undefined" ||
        typeof req.query.state === "undefined" ||
        typeof req.query.year === "undefined" ||
        typeof req.query.labor_force === "undefined") {

        var result = {
            'result': 'Failure',
            'reason': 'Parameter Error'
        };

        res.status(400).json(result);
        return;
    }

    //  Create new entry in labor force collection
    var entry = await createLaborForce(
        req.query.county,
        req.query.state,
        req.query.year,
        req.query.labor_force
    ).catch((err) => {
        var result = { 'result': 'Internal Error', 'error': err };
        res.status(404).json(result);
        return;
    });

    //  Compile result object with success message and new object's id
    res.status(201).json({
        'result': 'Success',
        'corr_id': entry.corr_id
    });
});

/*  get entry from labor participation rate collection in db  */
router.get('/v1/getLaborForce', async(req, res) => {
    if (
        req.query.county === "undefined" ||
        req.query.year === "undefined"
    ) {
        //  Check that the year parameter exists
        var result = {
            'result': 'Failure',
            'reason': 'Parameter error'
        };

        res.status(404).json(result);
        return;
    }

    var result = await getLaborForce(req.query.county, req.query.year)
        .catch((err) => {
            var result = {
                'result': 'Internal error',
                'error': err
            };

            res.status(404).json(result);
            return;
        });

    res.status(200).json(result);
})

/*  get all labor documents in year range from labor force collection in db  */
router.get('/v1/getManyLaborForce', async(req, res) => {
    if (
        req.query.county === "undefined" ||
        req.query.start_year === "undefined" ||
        req.query.end_year === "undefined"
    ) {
        //  Check that the year range parameters exist
        res.status(404).json({ 'result': 'Parameter error' });
        return;
    }

    var result = await getManyLaborForce(req.query.county, req.query.start_year, req.query.end_year)
        .catch(() => {
            res.status(404).json({
                'result': 'Failure',
                'reason': 'Parameter error'
            });
            return;
        });

    var serializedResult = await serialize(result);
    res.status(200).json(serializedResult);
});

/*  delete labor document from the collection by correlation id  */
router.delete('/v1/deleteLaborForce', async(req, res) => {
    if (typeof req.query.corr_id === 'undefined') {
        result = {
            'result': 'Failure',
            'reason': 'Parameter error'
        };

        return res.status(404).json(result);
    }

    var result = await deleteLaborForce(req.query.corr_id)
        .catch(() => {
            return res.status(404).json({ 'result': 'Internal error' });
        });

    res.status(200).json(result);
})

module.exports = router;