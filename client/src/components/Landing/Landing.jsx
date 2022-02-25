import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

function Landing() {
  return (
    <div className={styles.Landing}>
      <div className={styles.border}>
        <div className={styles.content}>
          <h1>
            Welcome, Player1 <br /> <span>Find what to play next. </span>
          </h1>
          <Link to={"/home"}>
            <div className={styles.arrow}></div>
            <p>Start!</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
