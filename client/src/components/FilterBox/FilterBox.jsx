import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buildPages,
  filterGenre,
  filterSource,
  setGenreInputs,
  sortBy,
} from "../../redux/actions";
import styles from "./FilterBox.module.css";

function FilterBox() {
  const dispatch = useDispatch();
  const { genres, genreInputs } = useSelector((state) => state);
  const [sorted, setSorted] = useState("AZ");

  const handlerSelect = (source) => {
    setSorted();
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
    dispatch(
      setGenreInputs({
        [genre]: !genreInputs[genre],
      })
    );
    dispatch(filterGenre());
    dispatch(buildPages());
  };

  return (
    <div className={styles.FilterBox}>
      <label htmlFor="source">Show games:</label>
      <select
        name="source"
        id="source"
        onInput={(e) => handlerSelect(e.target.value)}
      >
        <option value="all">All</option>
        <option value="created">Created</option>
        <option value="rawg">RAWG</option>
      </select>
      <div>
        <label htmlFor="">Sort by:</label>
        <div>
          <label>A-Z</label>
          <button
            className={
              sorted === "AZ" ? styles.btn_toggleON : styles.btn_toggleOFF
            }
            onClick={() => handlerSortBy("AZ")}
          >
            up
          </button>
          <button
            className={
              sorted === "ZA" ? styles.btn_toggleON : styles.btn_toggleOFF
            }
            onClick={() => handlerSortBy("ZA")}
          >
            down
          </button>
        </div>
        <div>
          <label>STAR</label>
          <button
            className={
              sorted === "HighRated"
                ? styles.btn_toggleON
                : styles.btn_toggleOFF
            }
            onClick={() => handlerSortBy("HighRated")}
          >
            up
          </button>
          <button
            className={
              sorted === "LowRated" ? styles.btn_toggleON : styles.btn_toggleOFF
            }
            onClick={() => handlerSortBy("LowRated")}
          >
            down
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="genres">Genres</label>
        <div name="genres" className={styles.div_genres}>
          {genres.length &&
            genres.map((genre) => {
              return (
                <div key={genre.id}>
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
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default FilterBox;
