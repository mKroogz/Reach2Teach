import { Route, Redirect } from "react-router-dom";
import React from "react";
import Home from "./home/Home";
import Welcome from "./welcome/Welcome"
import Login from "./auth/Login";
import Registration from "./registration/Registration"

const ApplicationViews = props => {
    const setUser = props.setUser;
    const hasUser = props.hasUser;
    return (
      <React.Fragment>
        <Route
          path="/login"
          render={props => {
            return <Login setUser={setUser} {...props} />;
          }}
        />
        <Route
          path="/register"
          render={props => {
            return <Registration setUser={setUser} {...props} />;
          }}
        />
        <Route
          exact
          path="/"
          render={props => {
            return hasUser ? <Home /> : <Welcome {...props} />;
          }}
        />
    </React.Fragment>
  );
};

export default ApplicationViews;
  