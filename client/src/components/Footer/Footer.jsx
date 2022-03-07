import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.Footer}>
      <p>
        App made by{" "}
        <a
          href="https://www.linkedin.com/in/javier-musso"
          target="_blank"
          rel="noreferrer"
        >
          Javier Musso
        </a>{" "}
        at{" "}
        <a href="https://www.soyhenry.com/" target="_blank" rel="noreferrer">
          Henry
        </a>
        , 2022.
      </p>
    </div>
  );
}

export default Footer;
