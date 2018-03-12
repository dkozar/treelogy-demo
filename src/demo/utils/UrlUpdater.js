import JSURL from "jsurl";

export default class UrlUpdater {
  previousUrl = null;

  updateUrl = data => {
    const jsUrl = JSURL.stringify(data);
    const baseUrl = window.location.href.split("?")[0];
    const url = `${baseUrl}?data=${jsUrl}`;

    if (url !== this.previousUrl) {
      window.history.pushState({ path: url }, "", url);
      this.previousUrl = url;
    }
  };
}