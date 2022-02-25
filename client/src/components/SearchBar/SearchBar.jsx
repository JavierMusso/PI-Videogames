import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getGames,
  setCurrentPage,
  setSearchInput,
  showSearch,
} from "../../redux/actions";
import styles from "./SearchBar.module.css";
import searchIcon from "../../assets/search-icon.svg";

function SearchBar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (input) {
      dispatch(setSearchInput(input));
      dispatch(showSearch(true));
      dispatch(getGames(input));
    } else {
      dispatch(setCurrentPage(0));
      dispatch(showSearch(false));
    }
    setInput("");
  };

  return (
    <form className={styles.SearchBar} onSubmit={handlerSubmit}>
      <input
        className={styles.input}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        type="search"
        placeholder="Search games..."
      />
      <button type="submit" className={styles.submit}>
        <img src={searchIcon} alt="asd" />
      </button>
    </form>
  );
}

export default SearchBar;
