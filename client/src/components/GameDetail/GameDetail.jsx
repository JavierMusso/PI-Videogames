import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { getGameID } from "../../redux/actions";
import styles from "./GameDetail.module.css";
import defaultImg from "../../assets/default-game.jpg";

function GameDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGameID(id));
  }, [dispatch, id]);
  const game = useSelector((state) => state.gameDetail);

  if (!game) {
    return <div className={styles.loading}>CARGANDO...</div>;
  }

  if (typeof game === "string") return <Navigate to="/404" />;

  return (
    <div className={styles.GameDetail}>
      <div className={styles.border}>
        <div className={styles.game}>
          <div className={styles.title}>
            <h1>Game details</h1>
          </div>
          <div className={styles.main}>
            <img src={game.image || defaultImg} alt="" />
            <div>
              <h2>{game.name}</h2>
              <p>{game.description}</p>
            </div>
          </div>
          <div className={styles.misc}>
            <div className={styles.data}>
              <p>
                Released: <span>{game.released}</span>
              </p>
              <p>
                Rating: <span>{game.rating}</span>
              </p>
              <p>
                Genres: <span>{game.genre.join(", ")}</span>
              </p>
              <p>
                Platforms: <span>{game.platforms}</span>
              </p>
            </div>
            <Link className={styles.Back} to={"/home"}>
              <div className={styles.arrow}></div>
              <p>Back?</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetail;
