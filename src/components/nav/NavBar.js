import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import "./NavBar.css"


const NavBar = props => {
  const handleLogout = () => {
    props.clearUser();
    props.history.push("/");
  };

  return (
    <header>
      <img
        src="https://www.svgrepo.com/show/2873/apple.svg"
        alt="Acorn Icon"
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
                Reach2Teach
              </Link>
            </li>
          )}
          {props.hasUser ? (
            <li>
              <Link className="nav-link" to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(NavBar);
