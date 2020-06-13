import { Schema }  from 'mongoose';

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

     chats: [{
         type: String,
     }],

    role: {
        type: String,
    }
});
