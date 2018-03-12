import React, { Component } from "react";
import Version from "./demo/components/Version";
import Toolbar from "./demo/components/toolbar/Toolbar";
import Logo from "./demo/components/logo/Logo";
import AddVersion from "./demo/components/addVersion/AddVersion";
import ImportDialog from "./demo/components/dialogs/ImportDialog";
import UrlUpdater from "./demo/utils/UrlUpdater";
import { serialize, deserialize } from "treelogy";
import toolbarActions from "./demo/components/toolbar/toolbarActions";
import getInitialData from "./demo/utils/getInitialData";
import renderShareDialog from "./demo/renderShareDialog";
import "./App.css";

const urlUpdater = new UrlUpdater();

class App extends Component {
  constructor(props) {
    super(props);

    const data = getInitialData();

    this.treelogy = deserialize(data);
    this.state = {
      data: this.treelogy.process(),
      showShareDialog: false,
      shareDialogMode: null,
      showImportDialog: false
    };
  }

  serializeState = () => {
    return serialize(this.treelogy);
  };

  rebuildData = () => {
    this.setState({
      data: this.treelogy.process()
    });
    urlUpdater.updateUrl(this.serializeState());
  };

  onToolbarAction = action => {
    switch (action) {
      case toolbarActions.CLEAR:
        this.treelogy.clear();
        this.rebuildData();
        break;
      case toolbarActions.LINK:
        this.setState({
          showShareDialog: true,
          shareDialogMode: toolbarActions.LINK
        });
        break;
      case toolbarActions.IMPORT:
        this.setState({
          showImportDialog: true
        });
        break;
      case toolbarActions.EXPORT:
        this.setState({
          showShareDialog: true,
          shareDialogMode: toolbarActions.EXPORT
        });
        break;
      default:
        throw new Error(`Unknown toolbar action: ${action}`);
    }
  };

  onUpdateNode = (treeId, nodeId, data) => {
    const version = this.treelogy.getVersion(treeId);

    version.updateNode(nodeId, data);
    this.rebuildData();
  };

  onRemoveNode = (treeId, nodeId) => {
    const version = this.treelogy.getVersion(treeId);

    version.removeNode(nodeId);
    this.rebuildData();
  };

  onAddNode = (treeId, nodeId, data) => {
    const version = this.treelogy.getVersion(treeId);

    version.updateNode(nodeId, data);
    this.rebuildData();
  };

  onAddVersion = (treeId, parentVersionId) => {
    this.treelogy.createVersion(treeId, parentVersionId);
    this.rebuildData();
  };

  onRemoveVersion = treeId => {
    this.treelogy.deleteVersion(treeId);
    this.rebuildData();
  };

  renderVersions = () => {
    return this.state.data.map(treeData => {
      const treeId = treeData.id;
      const version = this.treelogy.getVersion(treeId);
      const parentChain = version.getParentChain();

      return (
        <Version
          id={treeId}
          title={treeId}
          key={treeId}
          nodes={treeData.nodes}
          inherited={treeData.inherited}
          overrides={treeData.overrides}
          onAddNode={this.onAddNode}
          onUpdateNode={this.onUpdateNode}
          onRemoveNode={this.onRemoveNode}
          onRemoveVersion={this.onRemoveVersion}
          parentChain={parentChain}
        />
      );
    });
  };

  onDialogClose = () => {
    this.setState({
      showShareDialog: false,
      showImportDialog: false
    });
  };

  onImport = json => {
    const data = JSON.parse(json);
    this.treelogy = deserialize(data);
    this.rebuildData();
    this.onDialogClose();
  };

  renderImportDialog = () => {
    return (
      <ImportDialog onSubmit={this.onImport} onClose={this.onDialogClose} />
    );
  };

  render() {
    const versions = this.renderVersions();
    let dialog;

    if (this.state.showShareDialog) {
      dialog = renderShareDialog(
        this.serializeState(),
        this.state.shareDialogMode,
        this.onDialogClose
      );
    } else if (this.state.showImportDialog) {
      dialog = this.renderImportDialog();
    }

    return (
      <div>
        <Toolbar onAction={this.onToolbarAction} />
        <div className="content">
          <Logo />
          {versions}
          <AddVersion
            onSubmit={this.onAddVersion}
            versions={this.treelogy.getVersions()}
          />
          {dialog}
        </div>
      </div>
    );
  }
}

export default App;
