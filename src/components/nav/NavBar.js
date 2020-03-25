import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navbar, NavItem} from 'react-materialize';
// import "./NavBar.css";


const NavBar = props => {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      props.clearUser();
    }
  };

  const handleStudentButton = () => {
    props.history.push("/students");
  };

  return (
    <Navbar
    alignLinks="right"
    brand={<a className="brand-logo" href="#">Logo</a>}
    options={{
      draggable: true,
      edge: 'left',
      inDuration: 250,
      onCloseEnd: null,
      onCloseStart: null,
      onOpenEnd: null,
      onOpenStart: null,
      outDuration: 200,
      preventScrolling: true
    }}
  >
    <NavItem href="">
      Getting started
    </NavItem>
    <NavItem href="components.html">
      Components
    </NavItem>
  </Navbar>
  );
};

export default NavBar;
