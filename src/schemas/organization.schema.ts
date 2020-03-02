import * as mongoose from 'mongoose';

export const OrganizationSchema = new mongoose.Schema({
  members: [{
    type: String,
    required: true,
  }],

  name: {
    type: String,
    required: String,
  },

  password: {
    type: String,
    required: true,
  },

  about: {
    type: String,
  },
  role: {
    type: String,
  }
});

export interface IOrganization extends mongoose.Document {
  members: [];
  name: string;
  password: string;
  about: string;
  role: string;
}
