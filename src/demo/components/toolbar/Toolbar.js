import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Glyphicon } from "react-bootstrap";
import toolbarActions from "./toolbarActions";
import "./Toolbar.css";

export default class Toolbar extends Component {
  render() {
    return (
      <div className="toolbar">
        <Button
          className="toolbar-button"
          onClick={this.props.onAction.bind(this, toolbarActions.CLEAR)}
        >
          <Glyphicon glyph="remove" /> Clear
        </Button>
        <Button
          className="toolbar-button"
          onClick={this.props.onAction.bind(this, toolbarActions.LINK)}
        >
          <Glyphicon glyph="link" /> Get shareable link
        </Button>
        <Button
          className="toolbar-button"
          onClick={this.props.onAction.bind(this, toolbarActions.EXPORT)}
        >
          <Glyphicon glyph="export" /> Export JSON
        </Button>
        <Button
          className="toolbar-button"
          onClick={this.props.onAction.bind(this, toolbarActions.IMPORT)}
        >
          <Glyphicon glyph="import" /> Import JSON
        </Button>
        <div className="toolbar-title">
          <a
            href="https://github.com/dkozar/treelogy-demo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Treelogy
          </a>
        </div>
      </div>
    );
  }
}

Toolbar.propTypes = {
  onAction: PropTypes.func.isRequired
};
