import * as mongoose from 'mongoose';

export const OrganizationSchema = new mongoose.Schema({
  members: [{
    type: String,
    required: true,
  }],

  name: {
    type: String,
  },

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
  members: [];
  name: string;
  password: string;
  about: string;
}
