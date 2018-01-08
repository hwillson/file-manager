import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import UtilityStyles from '../styles/utility';

const FileLink = ({ fsFile }) => (
  <div key={fsFile.name}>
    <span className={css(UtilityStyles.marginRight5)}>
      <i className="fa fa-file-text-o" />
    </span>
    <a
      href="#file"
    >
      {fsFile.name}
    </a>
  </div>
);

FileLink.propTypes = {
  fsFile: PropTypes.object.isRequired,
};

export default FileLink;
