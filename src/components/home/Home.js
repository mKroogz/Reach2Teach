import React from "react";

const Home = props => {
  const justUser = sessionStorage
    .getItem("credentials")
    .slice(12)
    .split(`"`);

  return (
    <>
      <h1 className="center">
        Welcome Home
        <a href="#" className="brand-logo">
          <img
            src="https://www.svgrepo.com/show/243314/childhood-home.svg"
            alt="Home Icon"
            height="64px"
          ></img>
        </a>
      </h1>
      <div className="row">
        <h1 className="col offset-s2">
          What's the plan for today {justUser[1]}?
        </h1>
      </div>
    </>
  );
};

export default Home;
