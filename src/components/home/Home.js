import React from "react";

const loginInfo = sessionStorage.getItem("credentials").slice(12);
const justUser = loginInfo.split(`"`);

const Home = () => {
  return (
    <>
      <h1>Welcome to your home page</h1>
      <h1>What would you like to do today {justUser[1]}?</h1>
    </>
  );
};

export default Home;
