import React from "react";

const Home = props => {
  const justUser = sessionStorage.getItem("credentials").slice(12).split(`"`);

  return (
    <>
      <h1>Welcome to your home page</h1>
      <h1>What would you like to do today {justUser[1]}?</h1>
    </>
  );
};

export default Home;
