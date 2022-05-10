import * as AT from "./authTypes";
import axios from "axios";

const AUTH_URL = "http://localhost:8080/login";
let nameP = "";
export const authenticateUser = (email, password) => async (dispatch) => {
  dispatch(loginRequest());


  nameP = email
  try {
    const response = await axios.post(AUTH_URL, {
      username: email,
      password: password,

        }
    );
    console.log("wwwww")
    console.log(response.data.username)
    console.log(response.data.password)



    localStorage.setItem("jwtToken", response.data.token);
    var abc =  parseJwt(localStorage.jwtToken);
    var roles = (abc.roles[0]);
   // parseJwt(response.data.token);
    localStorage.setItem("roles", roles);
    console.log("________________");
console.log(nameP);

    localStorage.setItem("Admin", nameP);
    console.log(response.data.token);
    console.log(response.data)
    dispatch(success({ username: response.data.name, isLoggedIn: true }));
    console.log(response.data)
    console.log(response)

    return Promise.resolve(response.data);
  } catch (error) {
    dispatch(failure());
    return Promise.reject(error);
  }
};

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));


  return JSON.parse(jsonPayload);
};


export const logoutUser = () => {

  console.log("LOG[OEQUT")

  return (dispatch) => {
    dispatch(logoutRequest());
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("roles")
    //localStorage.clear();
    dispatch(success({ username: "", isLoggedIn: false }));
  };
};

const loginRequest = () => {
  return {
    type: AT.LOGIN_REQUEST,
  };
};

const logoutRequest = () => {
  return {
    type: AT.LOGOUT_REQUEST,
  };
};

const success = (isLoggedIn) => {
  return {
    type: AT.SUCCESS,
    payload: isLoggedIn,
  };
};

const failure = () => {
  return {
    type: AT.FAILURE,
    payload: false,
  };
};
