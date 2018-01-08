import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import UtilityStyles from '../styles/utility';

const DirectoryLink = ({ fsFile, currentDirectory, setCurrentDirectory }) => (
  <div key={fsFile.name}>
    <span className={css(UtilityStyles.marginRight5)}>
      <i className="fa fa-folder-o" />
    </span>
    <a
      href={`/files${currentDirectory}/${fsFile.name}`}
      onClick={setCurrentDirectory}
    >
      {fsFile.name}
    </a>
  </div>
);

DirectoryLink.propTypes = {
  fsFile: PropTypes.object.isRequired,
  currentDirectory: PropTypes.string.isRequired,
  setCurrentDirectory: PropTypes.func.isRequired,
};

export default DirectoryLink;
