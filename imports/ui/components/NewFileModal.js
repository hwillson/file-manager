/* global FileReader */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';
import { css } from 'aphrodite';

import UtilityStyles from '../styles/utility';
import { uploadFile } from '../../api/fs_files/methods';

class NewFileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
    };
    this.callUploadFile = this.callUploadFile.bind(this);
    this.fileInput = null;
  }

  callUploadFile() {
    const { files } = this.fileInput;
    if (files.length > 0) {
      this.setState({ uploading: true });
      const fileInfo = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        uploadFile.call({
          filename: fileInfo.name,
          filePath: this.props.currentPath,
          fileData: reader.result,
        }, (error) => {
          this.setState({ uploading: false });
          if (!error) {
            this.props.closeModal(null, true);
          } else {
            console.log(error);
          }
        });
      };
      reader.readAsBinaryString(fileInfo);
    }
  }

  render() {
    const currentPath = this.props.currentPath || '/';
    const uploadLabel = (this.state.uploading) ? 'Uploading ...' : 'Upload';
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.closeModal}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className={css(UtilityStyles.marginRight10)}>
              <i className="fa fa-upload" />
            </span>
            Upload a New File
          </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body>
            <FormControl
              type="file"
              inputRef={(ref) => { this.fileInput = ref; }}
            />
            <HelpBlock>
              File will be uploaded into: <strong>{currentPath}</strong>
            </HelpBlock>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-fill" onClick={this.props.closeModal}>
              Cancel
            </Button>
            <Button
              bsStyle="info"
              className="btn-fill"
              onClick={this.callUploadFile}
              disabled={this.state.uploading}
            >
              {uploadLabel}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

NewFileModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  currentPath: PropTypes.string.isRequired,
};

export default NewFileModal;
