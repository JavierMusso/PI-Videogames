import React from "react";
import { useSelector } from "react-redux";

function FilterBox() {
  const { genres } = useSelector((state) => state);

  return (
    <div>
      <label htmlFor="source">Show games:</label>
      <select name="source" id="source">
        <option value="all">All</option>
        <option value="created">Created</option>
        <option value="rawg">RAWG</option>
      </select>
      <div>
        <label htmlFor="">Sort by:</label>
        <div>
          <label>A-Z</label> <button>up</button>
          <button>down</button>
        </div>
        <div>
          <label>STAR</label>
          <button>up</button>
          <button>down</button>
        </div>
      </div>
      <div>
        <label htmlFor="genres">Genres</label>
        <div name="genres">
          {genres.length &&
            genres.map((genre) => {
              return (
                <div key={genre.id}>
                  <label htmlFor={genre.name}>{genre.name}</label>
                  <input type="radio" name={genre.name} id={genre.name} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default FilterBox;
