import React from "react";
import GamesContainer from "../GamesContainer/GamesContainer";
import SearchBar from "../SearchBar/SearchBar";
import FilterBox from "../FilterBox/FilterBox";
import PaginationBar from "../PaginationBar/PaginationBar";

function Home() {
  return (
    <div className="Home">
      <h1>HOME</h1>
      <FilterBox />
      <SearchBar />
      <PaginationBar />
      <GamesContainer />
    </div>
  );
}

export default Home;
