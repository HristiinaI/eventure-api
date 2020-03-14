import * as mongoose from 'mongoose';

export const OrganizationSchema = new mongoose.Schema({
  members: [{
    type: String,
    required: true,
  }],

  name: {
    type: String,
    required: true,
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
  },

  creator: {
    type: String,
  }
});

export interface IOrganization extends mongoose.Document {
  members: String[];
  name: string;
  password: string;
  about: string;
  role: string;
  creator: string;
}
