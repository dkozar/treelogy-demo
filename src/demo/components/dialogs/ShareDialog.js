import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alert, Button, FormControl, Modal } from 'react-bootstrap'
import "./ShareDialog.css";

export default class ShareDialog extends Component {
  state = {
    copied: false
  };

  componentDidMount() {
    this.input.select();
    const copied = document.execCommand("copy");

    this.setState({
      copied
    });
  }

  render() {
    const text = this.props.text;
    const copiedMessage = this.state.copied && (
      <Alert className="dialog-share-copied" bsStyle="success">
        Copied to clipboard!
      </Alert>
    );

    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FormControl
              className="dialog-share-textarea"
              inputRef={dom => {
                this.input = dom;
              }}
              componentClass="textarea"
              value={text}
              readOnly
            />
            {copiedMessage}
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onClose}>Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

ShareDialog.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};
