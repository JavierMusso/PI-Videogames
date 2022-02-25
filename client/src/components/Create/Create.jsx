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
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    platforms: false,
  });

  const handlerSubmit = async (e) => {
    e.preventDefault();

    let newGame = input;
    console.log(newGame);
    let created = await dispatch(addGame(newGame));

    // this should be a modal pop up
    alert(created);
  };

  const handlerInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    if (errors.hasOwnProperty(e.target.name) && !e.target.value) {
      setErrors({
        ...errors,
        [e.target.name]: true,
      });
    } else if (errors.hasOwnProperty(e.target.name)) {
      setErrors({
        ...errors,
        [e.target.name]: false,
      });
    }
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

    if (errors.hasOwnProperty(e.target.name) && !selecOpts.length) {
      setErrors({
        ...errors,
        [e.target.name]: true,
      });
    } else if (errors.hasOwnProperty(e.target.name)) {
      setErrors({
        ...errors,
        [e.target.name]: false,
      });
    }
  };

  return (
    <div className="Create">
      <h1>Create</h1>
      <small>validacion de algunos datos con javascript</small>

      <div>
        <form action="#" onSubmit={handlerSubmit}>
          <label htmlFor="name">Title:</label>
          <input
            title="Alfanumeric titles only."
            type="text"
            name="name"
            placeholder="FORTNITE 2"
            value={input.name}
            onChange={handlerInputChange}
            required={true}
            pattern="[a-zA-Z0-9]{1-30}"
          />
          {errors.name && <small>A title is required!</small>}
          <label htmlFor="desc">Description:</label>
          <textarea
            name="description"
            cols="30"
            rows="4"
            placeholder="Game description..."
            maxlength="10"
            value={input.description}
            onChange={handlerInputChange}
            required={true}
          ></textarea>
          {errors.description && <small>A description is required!</small>}
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
            max={5}
            min={0}
            step="0.01"
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
            required={true}
          >
            <option value="pc">PC</option>
            <option value="xbox">Xbox</option>
            <option value="playstation">PlayStation</option>
            <option value="mobile">Mobile</option>
            <option value="others">Others</option>
          </select>
          {errors.platforms && (
            <small>At least one platform is required!</small>
          )}
          <input type="submit" value="Create new Game!" />
        </form>
      </div>
    </div>
  );
}

export default Create;
