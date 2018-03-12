import { noop } from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Glyphicon
} from "react-bootstrap";
import AddVersionEditor from "./AddVersionEditor";
import "./AddVersion.css";

class AddVersion extends Component {
  state = {
    isEditMode: false,
  };

  onSubmit = (id, parentVersionId) => {
    this.props.onSubmit(id, parentVersionId);
    this.clearEditor();
  };

  onCancel = () => {
    this.clearEditor();
  };

  clearEditor = () => {
    this.setState({
      isEditMode: false
    });
  };

  onButtonClick = () => {
    this.setState({
      isEditMode: true
    });
  };

  render() {
    const isEditMode = this.state.isEditMode;
    const addButton = !isEditMode && (
      <Button onClick={this.onButtonClick}>
        <Glyphicon glyph="plus" /> Create version
      </Button>
    );
    const editor = isEditMode && (
      <AddVersionEditor
        versions={this.props.versions}
        onSubmit={this.onSubmit}
        onCancel={this.onCancel}
      />
    );

    return (
      <div className="add-version">
        {addButton}
        {editor}
      </div>
    );
  }
}

AddVersion.propTypes = {
  versions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired
};

AddVersion.defaultProps = {
  onSubmit: noop
};

export default AddVersion;
