const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    table: {
        type: Number,
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
    total_order: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);
