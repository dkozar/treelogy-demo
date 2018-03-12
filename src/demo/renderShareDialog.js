import React from "react";
import JSURL from "jsurl";
import ShareDialog from './components/dialogs/ShareDialog'
import toolbarActions from "./components/toolbar/toolbarActions";

const renderShareDialog = (data, shareDialogMode, onDialogClose) => {
  let title, text;

  if (shareDialogMode === toolbarActions.LINK) {
    const jsUrl = JSURL.stringify(data);
    const baseUrl = window.location.href.split("?")[0];

    title = "Shareable link created";
    text = `${baseUrl}?data=${jsUrl}`;
  } else {
    title = "JSON data";
    text = JSON.stringify(data);
  }
  return (
    <ShareDialog title={title} text={text} onClose={onDialogClose} />
  );
};

export default renderShareDialog;
