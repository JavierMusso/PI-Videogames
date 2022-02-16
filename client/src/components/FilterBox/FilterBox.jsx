import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { buildPages, filterSource, sortBy } from "../../redux/actions";

function FilterBox() {
  const dispatch = useDispatch();
  const { genres } = useSelector((state) => state);

  const handlerSelect = (source) => {
    dispatch(filterSource(source));
    dispatch(buildPages());
  };

  const handlerSortBy = (sort) => {
    dispatch(sortBy(sort));
    dispatch(buildPages());
  };

  return (
    <div>
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
          <button onClick={() => handlerSortBy("AZ")}>up</button>
          <button onClick={() => handlerSortBy("ZA")}>down</button>
        </div>
        <div>
          <label>STAR</label>
          <button onClick={() => handlerSortBy("HighRated")}>up</button>
          <button onClick={() => handlerSortBy("LowRated")}>down</button>
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
