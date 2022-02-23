import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

function Landing() {
  return (
    <div className={styles.Landing}>
      <div className={styles.border}>
        <div>
          <h1>
            Welcome, Player1 <br /> <span>Find what to play next... </span>
          </h1>
          <Link to="/home">Let's Go!</Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
