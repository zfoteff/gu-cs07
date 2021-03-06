const mongoose = require('mongoose');

const laborForceSchema = mongoose.Schema({
    county: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    laborForce: {
        type: Number,
        required: true
    },
    year: {
        type: String,
        required: true
    }
});

var LaborForce = mongoose.model('LaborForce', laborForceSchema, 'laborforce');
module.exports = LaborForce;