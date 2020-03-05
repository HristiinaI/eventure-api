import * as mongoose from 'mongoose';

export const OrganizationSchema = new mongoose.Schema({
  members: [{
    type: String,
  }],

  name: {
    type: String,
  },

  password: {
    type: String,
  },

  about: {
    type: String,
  },
  role: {
    type: String,
  }
});

export interface IOrganization extends mongoose.Document {
  members: String[];
  name: string;
  password: string;
  about: string;
  role: string;
}
