import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <div className={styles.NavBar}>
      <div className={styles.content}>
        <Link to="/home">
          <div className={styles.logo}>
            <h1>AtheG</h1>
            <span>All the games, one site.</span>
          </div>
        </Link>
        <SearchBar />
        <div className={styles.links}>
          <Link to="/create" className={styles.create}>
            <div className={styles.arrow}></div>
            <p>CREATE</p>
          </Link>
          <Link to="/about" className={styles.about}>
            <div className={styles.arrow}></div>
            <p>ABOUT</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
