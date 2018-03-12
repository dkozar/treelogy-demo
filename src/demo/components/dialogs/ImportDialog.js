import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alert, Button, FormControl, Modal } from "react-bootstrap";
import "./ImportDialog.css";

const validate = json => {
  try {
    JSON.parse(json);
  } catch (ex) {
    return false;
  }
  return true;
};

export default class ImportDialog extends Component {
  state = {
    value: "",
    isValid: true
  };

  componentDidMount() {
    this.input.select();
  }

  onChange = event => {
    const value = event.target.value;
    const isValid = validate(value);
    this.setState({
      value,
      isValid
    });
  };

  onSubmit = () => {
    this.props.onSubmit(this.state.value);
  };

  render() {
    const value = this.state.value;
    const isValid = this.state.isValid;
    const shouldDisplaySubmitButton = value && isValid;
    let message;

    if (value) {
      let text, style;
      if (isValid) {
        text = "JSON is valid.";
        style = "success";
      } else {
        text = "Invalid JSON!";
        style = "danger";
      }
      message = (
        <Alert className="dialog-import-message" bsStyle={style}>
          {text}
        </Alert>
      );
    }

    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Import JSON</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FormControl
              className="dialog-share-textarea"
              inputRef={dom => {
                this.input = dom;
              }}
              placeholder="Data in JSON format here"
              componentClass="textarea"
              onChange={this.onChange}
            />
            {message}
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onClose}>Cancel</Button>
            <Button
              onClick={this.onSubmit}
              bsStyle="primary"
              disabled={!shouldDisplaySubmitButton}
            >
              Import
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

ImportDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
