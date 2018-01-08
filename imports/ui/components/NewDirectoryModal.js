import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';
import { css } from 'aphrodite';

import UtilityStyles from '../styles/utility';
import { createDirectory } from '../../api/fs_files/methods';

class NewDirectoryModal extends Component {
  constructor(props) {
    super(props);
    this.callCreateDirectory = this.callCreateDirectory.bind(this);
    this.directoryInput = null;
  }

  componentDidUpdate() {
    if (this.directoryInput) {
      this.directoryInput.focus();
    }
  }

  callCreateDirectory(event) {
    event.preventDefault();
    const directoryName = this.directoryInput.value;
    if (directoryName) {
      createDirectory.call({
        currentDirectory: this.props.currentPath,
        directoryName,
      }, (error) => {
        if (!error) {
          this.props.closeModal(null, true);
        }
      });
    }
  }

  render() {
    const path = this.props.currentPath || '/';
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.closeModal}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className={css(UtilityStyles.marginRight10)}>
              <i className="fa fa-folder-open-o" />
            </span>
            Create a New Directory
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={this.callCreateDirectory}>
          <Modal.Body>
            <FormGroup controlId="newDirectoryForm">
              <ControlLabel>New Directory Name</ControlLabel>
              <FormControl
                type="text"
                inputRef={(ref) => { this.directoryInput = ref; }}
              />
              <HelpBlock>
                New directory will be created in: <strong>{path}</strong>
              </HelpBlock>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-fill" onClick={this.props.closeModal}>
              Cancel
            </Button>
            <Button type="submit" bsStyle="info" className="btn-fill">
              Create
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

NewDirectoryModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  currentPath: PropTypes.string.isRequired,
};

NewDirectoryModal.defaultProps = {
  showModal: false,
};

export default NewDirectoryModal;
