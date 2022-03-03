import React, { useEffect, useState } from "react";
import styles from "./RandomGame.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function RandomGame() {
  const randomGames = useSelector((state) => state.randomGames);
  const [current, setCurrent] = useState({});

  useEffect(() => {
    if (randomGames.length) setCurrent(randomGames[0]);
  }, [randomGames]);
  if (randomGames.length) {
    return (
      <div className={styles.RandomGame}>
        <h2>Popular games this week</h2>
        <div>
          <Link to={`/game/${current.id}`}>
            <img src={current.image} alt="" />
            <div className={styles.current}>
              <p>{current.name}</p>
              <small>{current.genres ? current.genres.join(", ") : ""}</small>
            </div>
          </Link>
          <div className={styles.pagination}>
            {randomGames &&
              randomGames.map((game, i) => {
                return (
                  <button
                    className={
                      randomGames.indexOf(current) === i
                        ? styles.currentPage
                        : ""
                    }
                    key={i}
                    onClick={() => setCurrent(randomGames[i])}
                  ></button>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
  return "";
}

export default RandomGame;
