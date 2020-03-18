import React from "react";

const Welcome = props => {
  return (
    <>
      <h1>Welcome to Reach2Teach</h1>
      <button type="button">Login</button>
      <button
        onClick={() => {
          props.history.push("/register");
        }}
        type="button"
      >
        Register
      </button>
    </>
  );
};

export default Welcome;
