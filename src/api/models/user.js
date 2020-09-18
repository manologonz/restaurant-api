// database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        role_id: {
            type: Schema.Types.ObjectId,
            ref: 'Role',
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    subsidiary: {
        subsidiary_id: {
            type: Schema.Types.ObjectId,
            ref: 'Subsidiary',
        },
        name: {
            type: String,
        },
    }
});

module.exports = mongoose.model('User', userSchema);
