import axios from "axios";

const authToken = (token) => {
  if (token) {
    console.log("hui");
    axios.defaults.headers.common["Authorization"] = `${token}`;
  } else {

    console.log("iiii");
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default authToken;
