import React from "react";
import GamesContainer from "../GamesContainer/GamesContainer";
import FilterBox from "../FilterBox/FilterBox";
import { useDispatch } from "react-redux";
import { getGameID } from "../../redux/actions";
import { useEffect } from "react";
import styles from "./Home.module.css";
import NavBar from "../NavBar/NavBar";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGameID());
  }, [dispatch]);

  return (
    <div className={styles.Home}>
      <div className={styles.content}>
        <NavBar />
        <FilterBox />
        <div className={styles.Filter}>
          <GamesContainer />
        </div>
      </div>
    </div>
  );
}

export default Home;
