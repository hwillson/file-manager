import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const fileSchema = new SimpleSchema({
  uid: {
    type: String,
  },
  dateUpdated: {
    type: Date,
    optional: true,
  },
  filename: {
    type: String,
    uniforms: {
      disabled: true,
    },
  },
  path: {
    type: String,
    uniforms: {
      disabled: true,
    },
  },
  title: {
    type: String,
    optional: true,
  },
  description: {
    type: String,
    optional: true,
  },
});

export default fileSchema;
