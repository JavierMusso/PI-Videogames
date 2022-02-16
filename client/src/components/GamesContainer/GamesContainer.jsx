import React from "react";
import { useSelector } from "react-redux";
import Game from "../Game/Game";
import styles from "./GamesContainer.module.css";

function GamesContainer() {
  const { pages, currentPage, searchResults, showSearchResults } = useSelector(
    (state) => state
  );

  return (
    <div className={styles.GamesContainer}>
      {showSearchResults ? (
        searchResults.length ? (
          typeof searchResults === "string" ? (
            <p>{searchResults}</p>
          ) : (
            searchResults.map((game) => <Game key={game.id} props={game} />)
          )
        ) : (
          <p>Cargando juegos...</p>
        )
      ) : pages.length ? (
        pages[currentPage].map((game) => <Game key={game.id} props={game} />)
      ) : (
        <p>Cargando juegos...</p>
      )}
    </div>
  );
}

export default GamesContainer;