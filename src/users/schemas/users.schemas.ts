import { Schema }  from 'mongoose';
import { Strategy } from 'passport-local';

export const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    type: {
        type: String,
        required: true,
    },

    country: {
        type: String,
    },

    education: {
        type: String,
    },

    workplace: {
        type: String,
    },

    about: {
        type: String,
    },

    organizations: [{
        type: String,
        }
    ],

    events: [{
        type: String,
    }],

    name: {
        type: String,
    },

    role: String,

    auth: {
        email: {
            valid: { type: Boolean, default: false }
        }
    }

});
