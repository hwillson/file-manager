import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import md5 from 'md5';

import filesCollection from '../files/collection';

let fileSystem;
if (Meteor.isServer) {
  fileSystem = require('./server/file_system').default;
}

const currentDirectoryListing = new ValidatedMethod({
  name: 'fsFiles.currentDirectoryListing',
  validate: null,
  async run({ currentDirectory }) {
    let directoryListing = [];
    if (!this.isSimulation) {
      try {
        directoryListing = await fileSystem.getFiles(currentDirectory);
      } catch (error) {
        throw new Meteor.Error(`Directory "${currentDirectory}" doesn't exist!`);
      }
    }
    return directoryListing;
  },
});

const uploadFile = new ValidatedMethod({
  name: 'files.upload',
  validate: new SimpleSchema({
    filename: { type: String },
    filePath: { type: String },
    fileData: { type: String },
  }).validator(),
  run({ filename, filePath, fileData }) {
    // if (!this.isSimulation && this.userId) {
    if (!this.isSimulation) {
      const fullPath = `${filePath}/${filename}`;
      fileSystem.saveFile(fullPath, fileData);
      filesCollection.insert({
        uid: md5(fullPath),
        dateUpdated: new Date(),
        filename,
        path: filePath || '/',
      });
    }
  },
});

const createDirectory = new ValidatedMethod({
  name: 'files.createDirectory',
  validate: new SimpleSchema({
    currentDirectory: { type: String },
    directoryName: { type: String },
  }).validator(),
  run({ currentDirectory, directoryName }) {
    // if (!this.isSimulation && this.userId) {
    if (!this.isSimulation) {
      fileSystem.createDirectory(currentDirectory, directoryName);
    }
  },
});

export { currentDirectoryListing, uploadFile, createDirectory };
