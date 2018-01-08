import { Mongo } from 'meteor/mongo';

// import fileSchema from './schema';

const filesCollection = new Mongo.Collection('files');
// filesCollection.attachSchema(fileSchema);

export default filesCollection;
