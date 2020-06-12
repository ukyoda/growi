import React from 'react';
import PropTypes from 'prop-types';

import path from 'path';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import PageContainer from '../../services/PageContainer';

import { withUnstatedContainers } from '../UnstatedUtils';

class LinkEditModal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      isUseRelativePath: false,
      isUsePermanentLink: false,
      linkInputValue: '',
      labelInputValue: '',
      linkerType: 'mdLink',
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.cancel = this.cancel.bind(this);
    this.toggleIsUseRelativePath = this.toggleIsUseRelativePath.bind(this);
    this.handleChangeLinkInput = this.handleChangeLinkInput.bind(this);
    this.handleChangeLabelInput = this.handleChangeLabelInput.bind(this);
    this.handleSelecteLinkerType = this.handleSelecteLinkerType.bind(this);
    this.showLog = this.showLog.bind(this);
    this.save = this.save.bind(this);
    this.generateLink = this.generateLink.bind(this);
    this.toggleIsUsePamanentLink = this.toggleIsUsePamanentLink.bind(this);
  }

  show(editor) {
    const selection = editor.getDoc().getSelection();
    this.setState({ show: true, labelInputValue: selection });
  }

  cancel() {
    this.hide();
  }

  hide() {
    this.setState({
      show: false,
    });
  }

  toggleIsUseRelativePath() {
    if (this.state.linkerType === 'growiLink') {
      return;
    }
    this.setState({ isUseRelativePath: !this.state.isUseRelativePath });
  }

  renderPreview() {
    // TODO GW-2658
  }

  insertLinkIntoEditor() {
    // TODO GW-2659
  }

  showLog() {
    console.log(this.state.linkInputValue);
  }

  handleChangeLinkInput(linkValue) {
    this.setState({ linkInputValue: linkValue });
  }

  handleChangeLabelInput(labelValue) {
    this.setState({ labelInputValue: labelValue });
  }

  handleSelecteLinkerType(linkerType) {
    if (this.state.isUseRelativePath && linkerType === 'growiLink') {
      this.toggleIsUseRelativePath();
    }
    this.setState({ linkerType });
  }

  save() {
    const output = this.generateLink();

    if (this.props.onSave != null) {
      this.props.onSave(output);
    }

    this.hide();
  }

  generateLink() {
    const { pageContainer } = this.props;
    const {
      linkInputValue,
      labelInputValue,
      linkerType,
      isUseRelativePath,
    } = this.state;

    let reshapedLink = linkInputValue;

    if (isUseRelativePath && linkInputValue.match(/^\//)) {
      reshapedLink = path.relative(pageContainer.state.path, linkInputValue);
    }

    if (linkerType === 'pukiwikiLink') {
      return `[[${labelInputValue}>${reshapedLink}]]`;
    }
    if (linkerType === 'growiLink') {
      return `[${reshapedLink}]`;
    }
    if (linkerType === 'mdLink') {
      return `[${labelInputValue}](${reshapedLink})`;
    }
  }

  toggleIsUsePamanentLink() {
    // GW-2834
    this.setState({ isUsePermanentLink: !this.state.isUsePermanentLink });
  }

  render() {
    return (
      <Modal isOpen={this.state.show} toggle={this.cancel} size="lg">
        <ModalHeader tag="h4" toggle={this.cancel} className="bg-primary text-light">
          Edit Links
        </ModalHeader>

        <ModalBody className="container">
          <div className="row">
            <div className="col-12 col-lg-6">
              <form className="form-group">
                <div className="form-gorup my-3">
                  <label htmlFor="linkInput">Link</label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      id="linkInput"
                      type="text"
                      placeholder="URL or page path"
                      aria-describedby="button-addon"
                      value={this.state.linkInputValue}
                      onChange={e => this.handleChangeLinkInput(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button type="button" id="button-addon" className="btn btn-secondary" onClick={this.showLog}>
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
                <div className="form-inline">
                  <div className="custom-control custom-checkbox custom-checkbox-info">
                    <input
                      className="custom-control-input"
                      id="relativePath"
                      type="checkbox"
                      checked={this.state.isUseRelativePath}
                      disabled={this.state.linkerType === 'growiLink'}
                    />
                    <label className="custom-control-label" htmlFor="permanentLink" onClick={this.toggleIsUsePamanentLink}>
                      convert into permanent link
                    </label>
                  </div>
                </div>
              </form>

              <div className="d-block d-lg-none">
                {this.renderPreview}
                render preview
              </div>

              <div className="card">
                <div className="card-body">
                  <form className="form-group">
                    <div className="form-group btn-group w-100" role="group" aria-label="type">
                      <button
                        type="button"
                        name="mdLink"
                        className={`btn btn-outline-secondary w-100 ${this.state.linkerType === 'mdLink' && 'active'}`}
                        onClick={e => this.handleSelecteLinkerType(e.target.name)}
                      >
                        Markdown
                      </button>
                      <button
                        type="button"
                        name="growiLink"
                        className={`btn btn-outline-secondary w-100 ${this.state.linkerType === 'growiLink' && 'active'}`}
                        onClick={e => this.handleSelecteLinkerType(e.target.name)}
                      >
                        Growi Original
                      </button>
                      <button
                        type="button"
                        name="pukiwikiLink"
                        className={`btn btn-outline-secondary w-100 ${this.state.linkerType === 'pukiwikiLink' && 'active'}`}
                        onClick={e => this.handleSelecteLinkerType(e.target.name)}
                      >
                        Pukiwiki
                      </button>
                    </div>

                    <div className="form-group">
                      <label htmlFor="label">Label</label>
                      <input
                        type="text"
                        className="form-control"
                        id="label"
                        value={this.state.labelInputValue}
                        onChange={e => this.handleChangeLabelInput(e.target.value)}
                        disabled={this.state.linkerType === 'growiLink'}
                      />
                    </div>
                    <div className="form-inline">
                      <div className="custom-control custom-checkbox custom-checkbox-info">
                        <input
                          className="custom-control-input"
                          id="relativePath"
                          type="checkbox"
                          checked={this.state.isUseRelativePath}
                          disabled={this.state.linkerType === 'growiLink'}
                        />
                        <label className="custom-control-label" htmlFor="relativePath" onClick={this.toggleIsUseRelativePath}>
                          Use relative path
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.hide}>
            Cancel
          </button>
          <button type="submit" className="btn btn-sm btn-primary" onClick={this.save}>
            Done
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

LinkEditModal.propTypes = {
  pageContainer: PropTypes.instanceOf(PageContainer).isRequired,
  onSave: PropTypes.func,
};

/**
 * Wrapper component for using unstated
 */
const LinkEditModalWrapper = withUnstatedContainers(LinkEditModal, [PageContainer]);

export default LinkEditModalWrapper;
