import { Document } from 'mongoose';

export interface IOrganization extends Document {
    members: String[];
    name: string;
    password: string;
    about: string;
    role: string;
    creator: string;
  }