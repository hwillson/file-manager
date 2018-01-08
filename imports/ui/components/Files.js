import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Table, Tr, Td } from 'reactable';
import { css } from 'aphrodite';

import FilePath from './FilePath';
import NewDirectoryModal from './NewDirectoryModal';
import NewFileModal from './NewFileModal';
import FileLink from './FileLink';
import DirectoryLink from './DirectoryLink';
import ActionButtons from './ActionButtons';
import { currentDirectoryListing } from '../../api/fs_files/methods';
import UtilityStyles from '../styles/utility';

class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDirectory: '',
      fsFiles: [],
      showNewDirectoryModal: false,
      showNewFileModal: false,
    };
    this.setCurrentDirectory = this.setCurrentDirectory.bind(this);
    this.showDirectory = this.showDirectory.bind(this);
    this.openNewDirectoryModal = this.openNewDirectoryModal.bind(this);
    this.openNewFileModal = this.openNewFileModal.bind(this);
    this.closeNewDirectoryModal = this.closeNewDirectoryModal.bind(this);
    this.closeNewFileModal = this.closeNewFileModal.bind(this);
  }

  componentDidMount() {
    this.showDirectory();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentDirectory !== this.state.currentDirectory) {
      this.showDirectory();
    }
  }

  setCurrentDirectory(event) {
    event.preventDefault();
    const pathMatches = event.target.closest('a').href.match(/^(.*)\/files(.*)$/);
    if (pathMatches.length === 3) {
      this.setState({ currentDirectory: decodeURIComponent(pathMatches[2]) });
    } else {
      this.setState({ currentDirectory: '' });
    }
  }

  showDirectory() {
    currentDirectoryListing.call({
      currentDirectory: decodeURIComponent(this.state.currentDirectory),
    }, (error, fsFiles) => {
      if (fsFiles) {
        this.setState({ fsFiles });
      }
    });
  }

  openNewDirectoryModal() {
    this.setState({ showNewDirectoryModal: true });
  }

  openNewFileModal() {
    this.setState({ showNewFileModal: true });
  }

  closeNewDirectoryModal(event, refresh) {
    if (refresh) {
      this.showDirectory();
    }
    this.setState({ showNewDirectoryModal: false });
  }

  closeNewFileModal(event, refresh) {
    if (refresh) {
      this.showDirectory();
    }
    this.setState({ showNewFileModal: false });
  }

  renderRows() {
    const rows = [];
    const { currentDirectory } = this.state;
    this.state.fsFiles.forEach((fsFile) => {
      let link;
      if (fsFile.type === 'directory') {
        link = (
          <DirectoryLink
            key={fsFile.name}
            fsFile={fsFile}
            currentDirectory={currentDirectory}
            setCurrentDirectory={this.setCurrentDirectory}
          />
        );
      } else {
        link = (
          <FileLink
            key={fsFile.name}
            fsFile={fsFile}
          />
        );
      }
      rows.push(
        <Tr key={fsFile.name}>
          <Td column="Name">
            {link}
          </Td>
          <Td column="Last Modified" data={fsFile.lastModifiedTimestamp} />
          <Td column="Action">
            <ActionButtons
              fsFile={fsFile}
              refreshDirectory={this.showDirectory}
            />
          </Td>
        </Tr>,
      );
    });

    let content;
    if (rows.length === 0) {
      content = <p>No files.</p>;
    } else {
      content = (
        <Table className="table">
          {rows}
        </Table>
      );
    }

    return content;
  }

  render() {
    return (
      <div className="files">
        <Row className="header">
          <Col md={8}>
            <h4 className="title">
              Directory: <FilePath
                path={this.state.currentDirectory}
                setCurrentDirectory={this.setCurrentDirectory}
              />
            </h4>
          </Col>
          <Col md={4} className="text-right">
            <Button
              bsStyle="info"
              className={`btn-fill ${css(UtilityStyles.marginRight10)}`}
              onClick={this.openNewDirectoryModal}
            >
              <i className="fa fa-plus" /> New Directory
            </Button>
            <Button
              bsStyle="info"
              className="btn-fill"
              onClick={this.openNewFileModal}
            >
              <i className="fa fa-plus-circle" /> New File
            </Button>
          </Col>
        </Row>
        <Row className={css(UtilityStyles.marginTop20)}>
          <Col md={12}>
            {this.renderRows()}
          </Col>
        </Row>

        <NewDirectoryModal
          showModal={this.state.showNewDirectoryModal}
          closeModal={this.closeNewDirectoryModal}
          currentPath={this.state.currentDirectory}
        />
        <NewFileModal
          showModal={this.state.showNewFileModal}
          closeModal={this.closeNewFileModal}
          currentPath={this.state.currentDirectory}
        />
      </div>
    );
  }
}

export default Files;
