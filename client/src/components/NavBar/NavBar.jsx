import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <div className={styles.NavBar}>
      <div className={styles.content}>
        <h1>LOGO</h1>
        <div>
          <SearchBar />
          <Link to="/create">Create</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
