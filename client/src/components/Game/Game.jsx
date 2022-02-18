import React from "react";
import styles from "./Game.module.css";
import defaultGame from "../../assets/default-game.jpg";
import { Link } from "react-router-dom";

function Game({ props }) {
  return (
    <div className={styles.Game}>
      <Link to={`/game/${props.id}`}>
        <p>Nombre: {props.name}</p>
      </Link>
      <p>
        Generos:
        {props.genres.join(", ")}
      </p>
      <p>Rating: {props.rating}</p>
      <img src={props.image || defaultGame} alt="" />
    </div>
  );
}

export default Game;
