const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    meals:[Schema.Types.ObjectId]
});

module.exports = mongoose.model('Section',  sectionSchema);
