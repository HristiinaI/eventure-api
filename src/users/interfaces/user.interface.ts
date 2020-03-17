import { Document }  from 'mongoose';

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