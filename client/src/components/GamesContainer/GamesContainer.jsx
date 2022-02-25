import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { buildPages, showSearch } from "../../redux/actions";
import Game from "../Game/Game";
import PaginationBar from "../PaginationBar/PaginationBar";
import styles from "./GamesContainer.module.css";

function GamesContainer() {
  const dispatch = useDispatch();
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
              <p
                className={styles.loading}
                onClick={() => dispatch(showSearch(false))}
              >
                {searchResults}
              </p>
            ) : (
              searchResults.map((game) => <Game key={game.id} props={game} />)
            )
          ) : (
            <p className={styles.loading}>Loading...</p>
          )
        ) : pages.length ? (
          typeof pages === "string" ? (
            <p className={styles.loading}>{pages}</p>
          ) : (
            pages[currentPage].map((game) => (
              <Game key={game.id} props={game} />
            ))
          )
        ) : (
          <p className={styles.loading}>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default GamesContainer;
