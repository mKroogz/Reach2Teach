import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = props => {
  const handleLogout = () => {
    if(window.confirm("Are you sure you want to log out?")){
    props.clearUser();
    }
  };

  const handleStudentButton = () => {
    props.history.push("/students");
  };

  return (
    <header>
      <img
        src="https://www.svgrepo.com/show/2873/apple.svg"
        alt="Apple Icon"
      ></img>
      <h1 className="site-title">Reach2Teach</h1>
      <nav>
        <ul className="container">
          {props.hasUser ? (
            <li>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
          ) : (
            <li>
              <Link className="nav-link" to="/">
                Welcome
              </Link>
            </li>
          )}
          {props.hasUser ? (
            <li>
              <Link className="nav-link" to="/lessons">
                Lessons
              </Link>
            </li>
          ) : null}
          {props.hasUser ? (
            <li>
              <Link className="nav-link" to="/notes">
                Notes
              </Link>
            </li>
          ) : null}
          {props.hasUser ? (
            <li>
              <Link className="nav-link" to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          ) : null}
          {props.hasUser ? (
            <li>
              <button type="button" onClick={handleStudentButton}>
                Student Center
              </button>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(NavBar);
