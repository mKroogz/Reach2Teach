import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

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
    <header>
      <nav className="teal lighten-2">
        <a href="#" className="brand-logo">
          <img
            src="https://www.svgrepo.com/show/2873/apple.svg"
            alt="Apple Icon"
            height="64px"
          ></img>
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <div className="center-align">
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
              <Link className="nav-link" to="/milestones">
                Milestones
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
          </div>
          {props.hasUser ? (
          <a className="btn pulse waves-effect waves-light cyan lighten-1" onClick={handleStudentButton}>Student Center</a>
        ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(NavBar);
