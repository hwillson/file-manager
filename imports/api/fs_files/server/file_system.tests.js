/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { expect } from 'meteor/practicalmeteor:chai';

import fileSystem from './file_system';

describe('api.files.server.FileSystem', function () {
  describe('#cleanDirectory', function () {
    it("should strip '..'s", function () {
      expect(fileSystem.cleanDirectory()).to.equal('');
      expect(fileSystem.cleanDirectory(null)).to.equal('');
      expect(fileSystem.cleanDirectory('..')).to.equal('');
      expect(fileSystem.cleanDirectory('../../..')).to.equal('//');
      expect(fileSystem.cleanDirectory('/../../asdf')).to.equal('///asdf');
      expect(fileSystem.cleanDirectory('/../asdf/../..')).to.equal('//asdf//');
      expect(
        fileSystem.cleanDirectory('../asdf/../qwer/../as///'),
      ).to.equal('/asdf//qwer//as///');
    });
  });
});
