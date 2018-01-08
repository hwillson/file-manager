/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import { expect } from 'meteor/practicalmeteor:chai';

import timeHelper from './time_helper';

describe('api.utilities.timeHelper', function () {
  it('should return current year', function () {
    const year = timeHelper.currentYear();
    expect(year).to.not.be.empty;
    expect(year.length).to.equal(4);
    expect(year.substring(0, 3)).to.equal('201');
  });
});
