import { Document }  from 'mongoose';

export interface IUser extends Document {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    type: string;
    country: string;
    education: string;
    workplace: string;
    about: string;
    organizations: String[];
    events: String[];
    chats: String[];
    role: string;
}
