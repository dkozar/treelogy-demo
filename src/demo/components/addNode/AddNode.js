import { noop } from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Glyphicon } from "react-bootstrap";
import AddNodeEditor from "./AddNodeEditor";
import "./AddNode.css";

class AddNodeSection extends Component {
  state = {
    isEditMode: false,
    id: null,
    data: null
  };

  onSubmit = (id, data) => {
    this.props.onSubmit(id, data);
    this.clearEditor();
  };

  onCancel = () => {
    this.clearEditor();
  };

  clearEditor = () => {
    this.setState({
      isEditMode: false,
      id: null,
      data: null
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
        <Glyphicon glyph="plus" /> Create node
      </Button>
    );
    const editor = isEditMode && (
      <AddNodeEditor onSubmit={this.onSubmit} onCancel={this.onCancel} />
    );

    return (
      <div className="version-add-node">
        {addButton}
        {editor}
      </div>
    );
  }
}

AddNodeSection.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

AddNodeSection.defaultProps = {
  onSubmit: noop
};

export default AddNodeSection;
