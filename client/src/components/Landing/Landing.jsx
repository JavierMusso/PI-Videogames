import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="Landing">
      <h1>Welcome Lorem ipsum dolor sit amet.</h1>
      <Link to="/home">Start</Link>
    </div>
  );
}

export default Landing;
