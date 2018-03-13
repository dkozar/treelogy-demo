import JSURL from "jsurl";
import defaultDemo from '../demos/defaultDemo'

const getInitialData = () => {
  const urlData = window.location.search.split("?data=")[1];

  if (urlData) {
    // if data passed via URL, use it
    return JSURL.parse(urlData);
  }

  // otherwise, use the hardcoded data
  return defaultDemo;
};

export default getInitialData;
