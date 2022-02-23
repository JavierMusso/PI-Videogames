import React from "react";
import { useSelector } from "react-redux";
import Game from "../Game/Game";
import PaginationBar from "../PaginationBar/PaginationBar";
import styles from "./GamesContainer.module.css";

function GamesContainer() {
  const { pages, currentPage, searchResults, showSearchResults } = useSelector(
    (state) => state
  );

  return (
    <div className={styles.GamesContainer}>
      <PaginationBar />
      <div className={styles.games}>
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
          typeof pages === "string" ? (
            <p>{pages}</p>
          ) : (
            pages[currentPage].map((game) => (
              <Game key={game.id} props={game} />
            ))
          )
        ) : (
          <p>Cargando juegos...</p>
        )}
      </div>
    </div>
  );
}

export default GamesContainer;
