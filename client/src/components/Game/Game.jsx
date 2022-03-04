import React from "react";
import styles from "./Game.module.css";
import { Link } from "react-router-dom";

function Game({ props }) {
  return (
    <div className={styles.Game}>
      <div className={styles.title}>
        <Link to={`/game/${props.id}`}>{props.name}</Link>
      </div>
      <img src={props.image} alt="" />
      <div className={styles.data}>
        <small>{props.genres.join(", ")}</small>
        <span
          style={
            props.rating < 1
              ? { backgroundColor: "red" }
              : props.rating < 4
              ? { backgroundColor: "orange" }
              : { backgroundColor: "green" }
          }
        >
          {props.rating}
        </span>
      </div>
    </div>
  );
}

export default Game;
