import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buildPages,
  filterGenre,
  filterSource,
  setGenreInputs,
  setPageSize,
  showSearch,
  sortBy,
} from "../../redux/actions";
import styles from "./FilterBox.module.css";
import arrowDown from "../../assets/chevron-down.svg";
import arrowUp from "../../assets/chevron-up.svg";

function FilterBox() {
  const dispatch = useDispatch();
  const { genres, genreInputs } = useSelector((state) => state);
  const [sorted, setSorted] = useState("AZ");
  const [source, setSource] = useState("all");

  const handlerSelect = (source) => {
    setSorted();
    setSource(source);
    dispatch(filterSource(source));
    dispatch(setGenreInputs());
    dispatch(buildPages());
  };

  const handlerSortBy = (sort) => {
    setSorted(sort);
    dispatch(sortBy(sort));
    dispatch(buildPages());
  };

  const handlerGenres = (genre) => {
    dispatch(showSearch(false));
    dispatch(
      setGenreInputs({
        [genre]: !genreInputs[genre],
      })
    );
    dispatch(filterGenre());
    dispatch(buildPages());
  };

  const handlerPageSize = (size) => {
    dispatch(setPageSize(size));
    dispatch(buildPages());
  };

  return (
    <div className={styles.FilterBox}>
      <div className={styles.source}>
        <label htmlFor="source">Games source</label>
        <div name="source">
          <button
            className={source === "all" ? styles.btn_toggleON : undefined}
            onClick={() => handlerSelect("all")}
          >
            All
          </button>
          <button
            className={source === "created" ? styles.btn_toggleON : undefined}
            onClick={() => handlerSelect("created")}
          >
            Created
          </button>
          <button
            className={source === "rawg" ? styles.btn_toggleON : undefined}
            onClick={() => handlerSelect("rawg")}
          >
            RAWG
          </button>
        </div>
      </div>
      <div className={styles.sort}>
        <label htmlFor="sort">Sort by</label>
        <div name="sort" className={styles.name}>
          <label>Name</label>
          <button
            className={
              sorted === "AZ" ? styles.btn_toggleON : styles.btn_toggleOFF
            }
            onClick={() => handlerSortBy("AZ")}
          >
            <img src={arrowUp} alt="" />
          </button>
          <button
            className={
              sorted === "ZA" ? styles.btn_toggleON : styles.btn_toggleOFF
            }
            onClick={() => handlerSortBy("ZA")}
          >
            <img src={arrowDown} alt="" />
          </button>
        </div>
        <div>
          <label>Rating</label>
          <button
            className={
              sorted === "HighRated"
                ? styles.btn_toggleON
                : styles.btn_toggleOFF
            }
            onClick={() => handlerSortBy("HighRated")}
          >
            <img src={arrowUp} alt="" />
          </button>
          <button
            className={
              sorted === "LowRated" ? styles.btn_toggleON : styles.btn_toggleOFF
            }
            onClick={() => handlerSortBy("LowRated")}
          >
            <img src={arrowDown} alt="" />
          </button>
        </div>
      </div>
      <div className={styles.genres}>
        <label htmlFor="genres">Genres</label>
        <div name="genres">
          {genres.length &&
            genres.map((genre) => {
              return (
                <button
                  key={genre.id}
                  onClick={() => handlerGenres(genre.name)}
                  className={
                    genreInputs[genre.name]
                      ? styles.btn_toggleON
                      : styles.btn_toggleOFF
                  }
                >
                  {genre.name}
                </button>
              );
            })}
        </div>
      </div>
      <div className={styles.pageSize}>
        <label htmlFor="pageSize">Games per page</label>
        <select
          name="pageSize"
          onChange={(e) => handlerPageSize(e.target.value)}
          defaultValue="15"
        >
          <option value="6">6</option>
          <option value="15">15</option>
          <option value="21">21</option>
          <option value="27">27</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBox;
