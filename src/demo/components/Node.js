import { delay, isEqual, noop } from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  ButtonGroup,
  FormControl,
  Glyphicon,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import classNames from "classnames";
import "./Node.css";

const ENTER_KEY = 13;
const ESC_KEY = 27;

class Node extends Component {
  state = {
    isEditMode: false
  };

  componentDidMount() {
    this.setState({
      originalData: this.props.data
    });
  }

  componentWillReceiveProps(newProps) {
    if (!isEqual(newProps.data, this.props.data) && !this.state.isEditMode) {
      this.setState({
        originalData: newProps.data
      });
    }
  }

  onFocus = () => {
    this.input.select();
  };

  onBlur = () => {
    delay(() => {
      this.setState({
        isEditMode: false
      });
    }, 100);
  };

  onValueChange = input => {
    this.props.onUpdateNode(this.props.id, input.target.value);
  };

  onKeyDown = keyEvent => {
    const { keyCode } = keyEvent;

    if ([ENTER_KEY, ESC_KEY].includes(keyCode)) {
      // Enter, Esc
      this.onBlur();
    }

    if (keyCode === ESC_KEY) {
      this.onCancel();
    }
  };

  onCancel = () => {
    this.props.onUpdateNode(this.props.id, this.state.originalData);
  };

  onRemoveNode = () => {
    this.props.onRemoveNode(this.props.id);
  };

  onButtonClick = mode => {
    if (mode === "remove") {
      this.onRemoveNode();
    } else if (mode === "cancel") {
      this.onCancel();
    }

    switch (mode) {
      case "edit":
        this.setState(
          {
            isEditMode: true
          },
          this.onFocus
        );
        break;
      case "ok":
      case "cancel":
      case "remove":
        this.setState({
          isEditMode: false
        });
        break;
      default:
        throw new Error(`Unknown mode: ${mode}`);
    }
  };

  renderEditor = (data, button) => {
    return (
      <React.Fragment>
        <FormControl
          inputRef={dom => {
            this.input = dom;
          }}
          className="version-node-editor-input"
          defaultValue={data}
          componentClass="input"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onValueChange}
          onKeyDown={this.onKeyDown}
        />
        <span className="version-node-button">{button}</span>
      </React.Fragment>
    );
  };

  render() {
    const { id, data, isInherited, isOverridden } = this.props;
    const className = classNames("version-node", {
      "version-node-inherited": isInherited,
      "version-node-overridden": isOverridden
    });
    const tooltipRemove = (
      <Tooltip className="in" id="remove-button-tooltip">
        {isOverridden ? "Remove override" : "Remove node"}
      </Tooltip>
    );
    const tooltipEdit = (
      <Tooltip className="in" id="remove-button-tooltip">
        Edit node
      </Tooltip>
    );
    const tooltipOk = (
      <Tooltip className="in" id="submit-button-tooltip">
        Submit changes
      </Tooltip>
    );
    const tooltipCancel = (
      <Tooltip className="in" id="cancel-button-tooltip">
        Abandon changes
      </Tooltip>
    );
    const shouldDisplayRemoveButton = !isInherited || isOverridden;
    const removeButton = (
      <OverlayTrigger placement="top" overlay={tooltipRemove}>
        <Button
          className={
            shouldDisplayRemoveButton ? "" : "version-node-remove-button-hidden"
          }
          bsSize="small"
          bsStyle={isOverridden ? "danger" : "success"}
          onClick={this.onButtonClick.bind(this, "remove")}
        >
          <Glyphicon glyph="remove" />
        </Button>
      </OverlayTrigger>
    );
    const button = this.state.isEditMode ? (
      <ButtonGroup>
        <OverlayTrigger placement="top" overlay={tooltipOk}>
          <Button bsSize="small" onClick={this.onButtonClick.bind(this, "ok")}>
            <Glyphicon glyph="ok" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={tooltipCancel}>
          <Button
            bsSize="small"
            onClick={this.onButtonClick.bind(this, "cancel")}
          >
            <Glyphicon glyph="remove" />
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
    ) : (
      <ButtonGroup>
        <OverlayTrigger placement="top" overlay={tooltipEdit}>
          <Button
            bsSize="small"
            onClick={this.onButtonClick.bind(this, "edit")}
          >
            <Glyphicon glyph="edit" />
          </Button>
        </OverlayTrigger>
        {removeButton}
      </ButtonGroup>
    );
    const editor = this.state.isEditMode ? (
      this.renderEditor(data, button)
    ) : (
      <React.Fragment>
        <span className="version-node-data">{data}</span>
        <span className="version-node-button">{button}</span>
      </React.Fragment>
    );

    return (
      <div className={className} key={id}>
        <span className="version-node-id">{id}</span>{" "}
        <span className="version-node-editor">{editor}</span>
      </div>
    );
  }
}

Node.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.any,
  isInherited: PropTypes.bool,
  isOverridden: PropTypes.bool,
  onUpdateNode: PropTypes.func.isRequired,
  onRemoveNode: PropTypes.func.isRequired
};

Node.defaultProps = {
  isInherited: false,
  isOverridden: false,
  onUpdateNode: noop,
  onRemoveNode: noop
};

export default Node;
