import React from "react";
import styles from "./About.module.css";
import profilePic from "../../assets/me.jpg";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className={styles.About}>
      <div className={styles.border}>
        <div className={styles.card}>
          <h1>About Me</h1>
          <div className={styles.content}>
            <img src={profilePic} alt="" />
            <div>
              <h3>
                Hi! I'm{" "}
                <a href="https://www.linkedin.com/in/javier-musso">
                  Javier Musso
                </a>
                , and this app was created to put together what I have learned
                at <a href="https://www.soyhenry.com/">Henry</a>'s bootcamp.
              </h3>
              <p>
                In the making of this project, I've used modern and popular
                stacks, such as React, Express, Sequelize. <br />
                Also, put in practice good design patterns, as the entire app
                follows modular design. <br /> <br />
                Css styles were done in vanilla css, with no frameworks. Using
                Sass as a preprocessor and CSS modules to apply styles to React
                functional components.
              </p>
              <Link className={styles.Back} to={"/home"}>
                <div className={styles.arrow}></div>
                <p>Back?</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
