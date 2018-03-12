import { noop } from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, FormControl, Glyphicon } from "react-bootstrap";
import "./AddNodeEditor.css";

const ENTER_KEY = 13;
const ESC_KEY = 27;

class AddNodeEditor extends Component {
  state = {
    isEditMode: false,
    id: null,
    data: null
  };

  componentDidMount() {
    this.inputId.select();
  }

  submitButtonDisabled = () => {
    return !this.state.id || !this.state.data;
  };

  onKeyDown = keyEvent => {
    const { keyCode } = keyEvent;

    if (keyCode === ESC_KEY) {
      this.onCancel();
      return;
    }

    if (this.submitButtonDisabled()) {
      return;
    }

    if ([ENTER_KEY].includes(keyCode)) {
      // Enter
      this.onSubmit();
    }
  };

  onSubmit = () => {
    this.props.onSubmit(this.state.id, this.state.data);
    this.clearEditor();
  };

  onCancel = () => {
    this.props.onCancel();
    this.clearEditor();
  };

  clearEditor = () => {
    this.setState({
      isEditMode: false,
      id: null,
      data: null
    });
  };

  onButtonClick = mode => {
    switch (mode) {
      case "submit":
        this.onSubmit();
        break;
      case "cancel":
        this.onCancel();
        break;
      default:
        throw new Error(`Unknown mode: ${mode}`);
    }
  };

  onValueChange = (mode, input) => {
    const value = input.target.value;

    switch (mode) {
      case "id":
        this.setState({
          id: value
        });
        break;
      case "data":
        this.setState({
          data: value
        });
        break;
      default:
        throw new Error(`Unknown mode: ${mode}`);
    }
  };

  render() {
    return (
      <span className="version-add-node-editor">
        <FormControl
          inputRef={dom => {
            this.inputId = dom;
          }}
          placeholder="ID"
          className="version-add-node-editor-id"
          componentClass="input"
          onChange={this.onValueChange.bind(this, "id")}
          onKeyDown={this.onKeyDown}
        />
        <FormControl
          placeholder="Data"
          className="version-add-node-editor-data"
          componentClass="input"
          onChange={this.onValueChange.bind(this, "data")}
          onKeyDown={this.onKeyDown}
        />
        <Button
          className="version-add-node-editor-button"
          disabled={this.submitButtonDisabled()}
          onClick={this.onButtonClick.bind(this, "submit")}
        >
            <Glyphicon glyph="ok" /> Submit
          </Button>
          <Button
            className="version-add-node-editor-button"
            onClick={this.onButtonClick.bind(this, "cancel")}
          >
            <Glyphicon glyph="remove" /> Cancel
          </Button>
      </span>
    );
  }
}

AddNodeEditor.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

AddNodeEditor.defaultProps = {
  onSubmit: noop,
  onCancel: noop
};

export default AddNodeEditor;
