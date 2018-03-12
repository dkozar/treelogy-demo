import { forEach, keys, noop } from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Node from "./Node";
import AddNode from "./addNode/AddNode";
import { Button, Glyphicon, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./Version.css";

class Version extends Component {
  onAddNode = (nodeId, value) => {
    this.props.onAddNode(this.props.id, nodeId, value);
  };

  onUpdateNode = (nodeId, value) => {
    this.props.onUpdateNode(this.props.id, nodeId, value);
  };

  onRemoveNode = nodeId => {
    this.props.onRemoveNode(this.props.id, nodeId);
  };

  onRemoveVersion = () => {
    this.props.onRemoveVersion(this.props.id);
  };

  renderNodes = (nodes, inherited, overrides) => {
    const treeNodes = [];

    forEach(nodes, node => {
      const id = node.id;
      const isInherited = !!inherited[id];
      const isOverridden = !!overrides[id];

      treeNodes.push(
        <Node
          id={id}
          key={id}
          data={node.data}
          onUpdateNode={this.onUpdateNode}
          onRemoveNode={this.onRemoveNode}
          isInherited={isInherited}
          isOverridden={isOverridden}
        />
      );
    });

    return treeNodes;
  };

  render() {
    const { id, nodes, inherited, overrides, title } = this.props;
    const parentChain = this.props.parentChain;
    const numberOfNodes = keys(nodes).length;
    const numberOfInheritedNodes = keys(inherited).length;
    const numberOfOverriddenNodes = keys(overrides).length;
    const numberOfLocalNodes = numberOfNodes - numberOfInheritedNodes;
    let inheritanceInfo, overridesInfo, localInfo;

    if (parentChain.length > 0) {
      inheritanceInfo = (
        <span className="version-header-pill version-header-pill-inheritance">
          Inheritance:&nbsp;
          {parentChain.map(version => (
            <React.Fragment key={version.id}>{version.id} &rarr; </React.Fragment>
          ))}
          {id}
        </span>
      );
    }

    if (numberOfOverriddenNodes > 0) {
      overridesInfo = <span className="version-header-pill version-header-pill-overrides">Overridden nodes</span>;
    }

    if (numberOfLocalNodes > 0) {
      localInfo = <span className="version-header-pill version-header-pill-local">Local nodes</span>;
    }

    const tooltip = (
      <Tooltip placement="top" className="in" id="remove-button-tooltip">
        Remove version
      </Tooltip>
    );
    const removeButton = (
      <OverlayTrigger placement="left" overlay={tooltip}>
        <Button
          bsSize="small"
          bsStyle="danger"
          className="version-header-remove"
          onClick={this.onRemoveVersion}
        >
          <Glyphicon glyph="remove" />
        </Button>
      </OverlayTrigger>
    );

    const treeNodes = this.renderNodes(nodes, inherited, overrides);

    return (
      <div className="version">
        <header className="version-header">
          <span className="version-header-title">{title}</span>
          {inheritanceInfo}
          {overridesInfo}
          {localInfo}
          <span className="version-header-spacer" />
          {removeButton}
        </header>
        {treeNodes}
        <AddNode onSubmit={this.onAddNode} />
      </div>
    );
  }
}

Version.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  parentChain: PropTypes.arrayOf(PropTypes.object).isRequired,
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  inherited: PropTypes.object.isRequired,
  overrides: PropTypes.object.isRequired,
  onUpdateNode: PropTypes.func.isRequired,
  onRemoveNode: PropTypes.func.isRequired,
  onRemoveVersion: PropTypes.func.isRequired
};

Version.defaultProps = {
  onAddNode: noop,
  onUpdateNode: noop,
  onRemoveNode: noop,
  onRemoveVersion: noop,
  inherited: [],
  overrides: []
};

export default Version;
