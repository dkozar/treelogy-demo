import { noop } from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  DropdownButton,
  FormControl,
  Glyphicon,
  MenuItem
} from "react-bootstrap";
import "./AddVersionEditor.css";

const ENTER_KEY = 13;
const ESC_KEY = 27;

class AddVersionEditor extends Component {
  state = {
    isEditMode: false,
    id: null,
    parentVersionId: null
  };

  componentDidMount() {
    this.selectLastVersion(this.props.versions);
    this.inputId.select();
  }

  selectLastVersion = versions => {
    const len = versions.length;

    if (versions.length > 0) {
      const version = versions[len - 1];

      this.selectParentVersion(version.id);
    }
  };

  submitButtonDisabled = () => {
    return !this.state.id;
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
    this.props.onSubmit(this.state.id, this.state.parentVersionId);
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
      parentVersionId: null
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

  onValueChange = input => {
    const value = input.target.value;

    this.setState({
      id: value
    });
  };

  selectParentVersion = parentVersionId => {
    this.setState({
      parentVersionId
    });
  };

  renderDropdown = () => {
    const versions = this.props.versions;
    const parentVersionId = this.state.parentVersionId;
    let items = versions.map((version, index) => {
      const treeId = version.id;
      const isSelected = parentVersionId === treeId;

      return (
        <MenuItem
          key={index}
          eventKey={index}
          onSelect={this.selectParentVersion.bind(this, treeId)}
          active={isSelected}
        >
          {treeId}
        </MenuItem>
      );
    });
    items = items.concat([
      <MenuItem key="divider" divider />,
      <MenuItem
        key="none"
        eventKey="-1"
        onSelect={this.selectParentVersion.bind(this, null)}
        active={!parentVersionId}
      >
        None
      </MenuItem>
    ]);

    let title = parentVersionId ? parentVersionId : "Inherit from (optional)";

    return (
      <span className="add-version-editor-parent-dropdown">
        <DropdownButton id="parent-version-id" title={title} dropup>
          {items}
        </DropdownButton>
      </span>
    );
  };

  render() {
    const versions = this.props.versions;
    const shouldRenderDropdown = versions.length > 0;
    const dropdown = shouldRenderDropdown && this.renderDropdown();

    return (
      <span className="add-version-editor">
        <FormControl
          inputRef={dom => {
            this.inputId = dom;
          }}
          placeholder="Version ID"
          className="add-version-editor-id"
          componentClass="input"
          onChange={this.onValueChange}
          onKeyDown={this.onKeyDown}
        />
        {dropdown}
        <Button
          className="add-version-editor-button"
          disabled={this.submitButtonDisabled()}
          onClick={this.onButtonClick.bind(this, "submit")}
        >
          <Glyphicon glyph="ok" /> Submit
        </Button>
        <Button
          className="add-version-editor-button"
          onClick={this.onButtonClick.bind(this, "cancel")}
        >
          <Glyphicon glyph="remove" /> Cancel
        </Button>
      </span>
    );
  }
}

AddVersionEditor.propTypes = {
  versions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

AddVersionEditor.defaultProps = {
  onSubmit: noop,
  onCancel: noop
};

export default AddVersionEditor;
