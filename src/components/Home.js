import React from "react";
import { useSelector } from "react-redux";
import authToken from "../utils/authToken";
import { Alert } from "react-bootstrap";
import axios from "axios";

const Home = () => {
  if (localStorage.jwtToken) {

      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.jwtToken}`

      authToken(localStorage.jwtToken);
      console.log("________________");
      console.log(localStorage.Admin)
  }


console.log()
  const auth = useSelector((state) => state.nameDad);
  console.log(auth);
  console.log("HUITa! !b!!!!!!!!!!!!l!!!!!!!!!!!!!!!!!!!!!");
 //var abc =  parseJwt(localStorage.jwtToken);
 //var roles = (abc.roles[0]);
 //localStorage.setItem("roles",roles);
  return (
      <Alert style={{ backgroundColor: "#343A40", color: "#ffffff80" }}>
        Welcome {localStorage.Admin}
      </Alert>
  );
};


export default Home;