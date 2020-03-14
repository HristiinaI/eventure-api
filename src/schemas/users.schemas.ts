import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Strategy } from 'passport-local';

export const UserSchema = new mongoose.Schema({
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

export interface IUser extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    type: string;
    country: string;
    education: string;
    workplace: string;
    about: string;
    organizations: string[];
    events: string[];
    name: string;
    role: string;
    auth: {
        email: {
            valid: boolean,
        }
    }
}
