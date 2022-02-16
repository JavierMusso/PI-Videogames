import React from "react";
import styles from "./Game.module.css";
import defaultGame from "../../assets/default-game.jpg";

function Game({ props }) {
  return (
    <div className={styles.Game}>
      <p>Nombre: {props.name}</p>
      <p>
        Generos:
        {props.genres.map((genre) => genre.name).join(", ")}
      </p>
      <p>Rating: {props.rating}</p>
      <img src={props.image || defaultGame} alt="" />
    </div>
  );
}

export default Game;
