import React from "react";

function FilterBox() {
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
          <label htmlFor="action">Action</label>{" "}
          <input type="radio" name="action" id="" />
        </div>
      </div>
    </div>
  );
}

export default FilterBox;
