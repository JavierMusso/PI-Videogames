import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.Footer}>
      <p>
        App made by{" "}
        <a href="https://www.linkedin.com/in/javier-musso">Javier Musso</a> at{" "}
        <a href="https://www.soyhenry.com/">Henry</a>, 2022.
      </p>
    </div>
  );
}

export default Footer;
