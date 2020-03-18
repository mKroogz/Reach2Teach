import React from "react";

const Home = props => {
  let justUser = ["", ""];

  if (props.hasUser) {
    const loginInfo = sessionStorage.getItem("credentials").slice(12);
    justUser = loginInfo.split(`"`);
  }

  return (
    <>
      <h1>Welcome to your home page</h1>
      <h1>What would you like to do today {justUser[1]}?</h1>
    </>
  );
};

export default Home;
