import JSURL from "jsurl";
import demo1 from "../demos/demo1";

const getInitialData = () => {
  const urlData = window.location.search.split("?data=")[1];

  if (urlData) {
    // if data passed via the URL, use it
    return JSURL.parse(urlData);
  }

  // otherwise, use the hardcoded data
  return demo1;
};

export default getInitialData;
