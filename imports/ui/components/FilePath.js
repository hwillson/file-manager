import React from 'react';
import PropTypes from 'prop-types';

const FilePath = ({ path, setCurrentDirectory }) => {
  const content = [];
  if (path) {
    const directories = decodeURIComponent(path).split('/');
    let currentPath = '/files';
    directories.forEach((directory, index) => {
      if (directory) {
        currentPath += `/${directory}`;
        let linkedDirectory;
        if (index === (directories.length - 1)) {
          linkedDirectory = directory;
        } else {
          linkedDirectory = (
            <a href={currentPath} onClick={setCurrentDirectory}>
              {directory}
            </a>
          );
        }
        content.push((
          <span key={directory}>{linkedDirectory} / </span>
        ));
      }
    });
  }
  return (
    <span className="file-path">
      <a href="/files" onClick={setCurrentDirectory}>
        <i className="fa fa-home" aria-hidden="true" />
      </a> / {content}
    </span>
  );
};

FilePath.propTypes = {
  path: PropTypes.string,
  setCurrentDirectory: PropTypes.func.isRequired,
};

FilePath.defaultProps = {
  path: '',
};

export default FilePath;
