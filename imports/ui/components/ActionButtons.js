/* global confirm */
/* eslint-disable no-alert */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { deleteFile } from '../../api/files/methods';

const ActionButtons = ({ fsFile, refreshDirectory }) => {
  const callRemoveFile = () => {
    const msg =
      fsFile.type === 'directory'
        ? 'Are you sure you want to remove this directory? This directory and '
          + 'all of its subdirectories/files will be removed from the '
          + 'filesystem and database. '
        : 'Are you sure you want to remove this file? The file on the '
          + 'filesystem and all database stored metadata will be removed. ';
    if (confirm(msg)) {
      deleteFile.call({
        fileId: fsFile.uid,
        filePath: fsFile.path,
        type: fsFile.type,
      }, (error) => {
        if (error) {
          console.log(error);
        } else {
          refreshDirectory();
        }
      });
    }
  };

  return (
    <div className="action-buttons">
      <Button
        bsStyle="danger"
        className="btn-fill"
        onClick={() => { callRemoveFile(); }}
        bsSize="xsmall"
      >
        <i className="fa fa-minus-circle" />
        Remove
      </Button>
    </div>
  );
};

ActionButtons.propTypes = {
  fsFile: PropTypes.object.isRequired,
  refreshDirectory: PropTypes.func.isRequired,
};

export default ActionButtons;
