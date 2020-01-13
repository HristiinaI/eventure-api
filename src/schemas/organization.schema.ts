import * as mongoose from 'mongoose';
import { IUser } from './users.schemas';

export const OrganizationSchema = new mongoose.Schema({
  users: [{
    type: String,
    required: true,
  }],

  password: {
    type: String,
    required: true,
  },
});

export interface IOrganization extends mongoose.Document {
  users: [];
  password: string;
}
