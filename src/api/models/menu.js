const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    menu_type: {
        type: String,
        required: true
    },
    sections: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Menu', menuSchema);
