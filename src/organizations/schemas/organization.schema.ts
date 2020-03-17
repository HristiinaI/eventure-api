import { Schema } from 'mongoose';

export const OrganizationSchema = new Schema({
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
