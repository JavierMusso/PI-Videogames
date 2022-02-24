import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGames, setCurrentPage, showSearch } from "../../redux/actions";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (input) {
      dispatch(showSearch(true));
      dispatch(getGames(input));
    } else {
      dispatch(setCurrentPage(0));
      dispatch(showSearch(false));
    }
    setInput("");
  };

  return (
    <div className={styles.SearchBar}>
      <form action="#" onSubmit={handlerSubmit}>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="search"
          placeholder="Search for game names..."
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}

export default SearchBar;
