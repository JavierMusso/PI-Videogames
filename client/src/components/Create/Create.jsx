import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGame } from "../../redux/actions";

function Create() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
    images: "",
  });

  const handlerSubmit = (e) => {
    e.preventDefault();

    let newGame = input;
    console.log(newGame);
    dispatch(addGame(newGame));
  };

  const handlerInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handlerSelecChange = (e) => {
    let options = e.target.options;
    let selecOpts = [];
    for (const option of options) {
      if (option.selected) {
        selecOpts.push(option.value);
      }
    }

    if (e.target.name === "platforms") {
      selecOpts = selecOpts.join(", ");
    }

    setInput({
      ...input,
      [e.target.name]: selecOpts,
    });
  };

  return (
    <div className="Create">
      <h1>Create</h1>
      <small>validacion de algunos datos con javascript</small>

      <div>
        <form action="#" onSubmit={handlerSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="FORTNITE 2"
            value={input.name}
            onChange={handlerInputChange}
          />
          <label htmlFor="desc">Description:</label>
          <input
            type="text"
            name="description"
            placeholder="A game about forts and nites..."
            value={input.description}
            onChange={handlerInputChange}
          />
          <label htmlFor="released">Release date:</label>
          <input
            type="text"
            name="released"
            placeholder="2000-1-1"
            value={input.released}
            onChange={handlerInputChange}
          />
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            name="rating"
            placeholder="0-5"
            value={input.rating}
            onChange={handlerInputChange}
          />
          <label htmlFor="genres">Genres:</label>
          <select name="genres" multiple={true} onChange={handlerSelecChange}>
            {genres.map((genre) => {
              return (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              );
            })}
          </select>
          <label htmlFor="platforms">Platforms:</label>
          <select
            name="platforms"
            multiple={true}
            onChange={handlerSelecChange}
          >
            <option value="pc">PC</option>
            <option value="xbox">Xbox</option>
            <option value="playstation">PlayStation</option>
            <option value="mobile">Mobile</option>
            <option value="others">Others</option>
          </select>
          <input type="submit" value="Create new Game!" />
        </form>
      </div>
    </div>
  );
}

export default Create;
