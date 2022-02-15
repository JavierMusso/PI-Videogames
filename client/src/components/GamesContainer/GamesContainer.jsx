import React from "react";
import { useSelector } from "react-redux";
import Game from "../Game/Game";
import styles from "./GamesContainer.module.css";

function GamesContainer() {
  const { pages, currentPage } = useSelector((state) => state);
  return (
    <div className={styles.GamesContainer}>
      {pages.length > 0 &&
        pages[currentPage].map((game) => <Game key={game.id} props={game} />)}
    </div>
  );
}

export default GamesContainer;
