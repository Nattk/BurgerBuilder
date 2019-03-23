import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-8c3b6.firebaseio.com/"
});
// instance.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";
// instance.defaults.crossDomain = true;

export default instance;
