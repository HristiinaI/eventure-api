import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Strategy } from 'passport-local';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
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
}
