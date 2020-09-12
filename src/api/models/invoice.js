const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    nit: {
        type: String,
        required: true
    },
    items: [{
        meal_id: {
            type: Schema.Types.ObjectId,
            ref: 'Meal'
        },
        nombre: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    total_invoice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
