
import * as UT from "./userTypes";
import axios from "axios";
const REGISTER_URL = "http://localhost:8080/users/signup";

console.log("1234")
console.log(localStorage.jwtToken)
console.log("1234")
export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(userRequest());
    axios
      .get(
      "http://localhost:8080/users",{
            headers: {
              'Authorization':`${localStorage.jwtToken}`
            }
          }
      )
      .then((response) => {
        console.log("heyMaza");
        console.log(response.data);
        console.log("heyMaza");
        dispatch(userSuccess(response.data));

      })
      .catch((error) => {
        console.log(error);
        console.log(dispatch);
        console.log(dispatch);
        console.log(dispatch);
        dispatch(userFailure(error.message));
      });
  };
};


export const registerUser = (userObject) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const response = await axios.post(REGISTER_URL, userObject);
    dispatch(userSavedSuccess(response.data));
    return Promise.resolve(response.data);
  } catch (error) {
    dispatch(userFailure(error.message));
    return Promise.reject(error);
  }
};

const userRequest = () => {
  return {
    type: UT.USER_REQUEST,
  };
};

const userSavedSuccess = (user) => {
  return {
    type: UT.USER_SAVED_SUCCESS,
    payload: user,
  };
};

const userSuccess = (users) => {
  console.log(users);
  return {

    type: UT.USER_SUCCESS,
    payload: users,
  };
};

const userFailure = (error) => {
  return {
    type: UT.USER_FAILURE,
    payload: error,
  };
};
