import * as mongoose from 'mongoose';

export const OrganizationSchema = new mongoose.Schema({
  users: [{
    type: String,
    required: true,
  }],

  password: {
    type: String,
    required: true,
  },

  about: {
    type: String,
    required: true,
  },
});

export interface IOrganization extends mongoose.Document {
  users: [];
  password: string;
  about: string;
}
