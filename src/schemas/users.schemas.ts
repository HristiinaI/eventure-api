import * as mongoose from 'mongoose';
import { Strategy } from 'passport-local';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
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

    city: {
        type: String,
    },

    education: {
        type: String,
    },

    workplace: {
        type: String,
    },

    interests: {
        type: String,
    },
});

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    type: string;
    city: string;
    education: string;
    workplace: string;
    interests: string;
}
