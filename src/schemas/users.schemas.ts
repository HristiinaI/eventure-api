import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
});

export interface IUser extends mongoose.Document {
    id: number;
    username: string;
    password: string;
}
