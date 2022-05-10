import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../services/index";

const NavigationBar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  const guestLinks = (
      <>
        <div className="mr-auto"></div>
        <Nav className="navbar-right">
          <Link to={"register"} className="nav-link">
            <FontAwesomeIcon icon={faUserPlus}/> Register
          </Link>
          <Link to={"login"} className="nav-link">
            <FontAwesomeIcon icon={faSignInAlt}/> Login
          </Link>
        </Nav>
      </>
  );
  const userLinks = (
      <>
        <Nav className="mr-auto">
          <Link to={"add"} className="nav-link">
            Add Certificate
          </Link>
          <Link to={"list"} className="nav-link">
            Certificate List
          </Link>
          <Link to={"users"} className="nav-link">
            User List
          </Link>
          <Link to={"tags"} className="nav-link">
            Tag List
          </Link>
        </Nav>
        <Nav className="navbar-right">
          <Link to={"logout"} className="nav-link" onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt}/> Logout
          </Link>
        </Nav>
      </>
  );


    const adminLinks = (
        <>
            <Nav className="mr-auto">
                <Link to={"list"} className="nav-link">
                    Certificate List
                </Link>
                <Link to={"tags"} className="nav-link">
                    Tag List
                </Link>
            </Nav>
            <Nav className="navbar-right">
                <Link to={"logout"} className="nav-link" onClick={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt}/> Logout
                </Link>
            </Nav>
        </>
    );




  console.log(auth);


  if ( localStorage.roles ==="ROLE_ADMIN") {
    return (
        <Navbar bg="dark" variant="dark">
          <Link to={auth.isLoggedIn ? "home" : ""} className="navbar-brand">
            <img
                src="http://s1.iconbird.com/ico/2014/1/625/w512h5121390855581ticket512.png"
                width="25"
                height="25"
                alt="brand"
            />{" "}
            Certificate Store
          </Link>

          { userLinks}
          {/*{auth.isLoggedIn ? userLinks : guestLinks}*/}
        </Navbar>
    );
  }
  else if ( localStorage.roles ==="ROLE_USER"){
      return (
          <Navbar bg="dark" variant="dark">
              <Link to={auth.isLoggedIn ? "home" : ""} className="navbar-brand">
                  <img
                      src="http://s1.iconbird.com/ico/2014/1/625/w512h5121390855581ticket512.png"
                      width="25"
                      height="25"
                      alt="brand"
                  />{" "}
                  Certificate Store
              </Link>


              { adminLinks}
          </Navbar>
      );



  }
  else {
    return (
        <Navbar bg="dark" variant="dark">
          <Link to={auth.isLoggedIn ? "home" : ""} className="navbar-brand">
            <img
                src="http://s1.iconbird.com/ico/2014/1/625/w512h5121390855581ticket512.png"
                width="25"
                height="25"
                alt="brand"
            />{" "}
            Certificate Store
          </Link>


          { guestLinks}
        </Navbar>
    );
  }
};

export default NavigationBar;
