import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Strategy } from 'passport-local';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        
    },

    password: {
        type: String,
    },

    firstName: {
        type: String,
        
    },

    lastName: {
        type: String,
        
    },

    type: {
        type: String,
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

    organizations: [],

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
    organizations: [];
    name: string;
    role: string;
    auth: {
        email: {
            valid: boolean,
        }
    }
}
