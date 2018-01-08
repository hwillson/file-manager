/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import filesCollection from '../collection';

Meteor.publish('files.single', function filesSingle(fileId) {
  check(fileId, String);
  let cursor;
  if (this.userId) {
    cursor = filesCollection.find({ uid: fileId });
  } else {
    cursor = this.ready();
  }
  return cursor;
});
