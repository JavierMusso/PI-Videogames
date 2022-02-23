import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.NotFound}>
      <h2>404</h2>
      <h1>Game Over</h1>

      <Link to={"/home"}>Continue ?</Link>
    </div>
  );
}

export default NotFound;
