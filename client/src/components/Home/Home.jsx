import React from "react";
import GamesContainer from "../GamesContainer/GamesContainer";
import FilterBox from "../FilterBox/FilterBox";
import { useDispatch } from "react-redux";
import { getGameID } from "../../redux/actions";
import { useEffect } from "react";
import styles from "./Home.module.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import RandomGame from "../RandomGame/RandomGame";

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
          <RandomGame />
          <GamesContainer />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
