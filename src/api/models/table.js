// database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mesaSchema = new Schema({
    number: {
        type: Number,
        require: true
    },
    diners: {
        type: Number,
        require: true
    },
    kids: {
        type: Boolean,
        default: false
    },
    available: {
        default: true
    },
    waitress: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    code: {
        type: Number,
        default: null
    }
});

module.exports = mongoose.model('Table', mesaSchema);
