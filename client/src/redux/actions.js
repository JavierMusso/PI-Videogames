import axios from "axios";

export const BUILD_PAGES = "BUILD_PAGES";
export const SET_CURRENT = "SET_CURRENT";
export const GET_GAMES = "GET_GAMES";
export const GET_GAMES_BY_NAME = "GET_GAMES_BY_NAME";
export const GET_GAME_BY_ID = "GET_GAME_BY_ID";
export const GET_GENRES = "GET_GENRES";
export const ADD_GAME = "ADD_GAME";
export const SHOW_SEARCH = "SHOW_SEARCH";
export const FILTER_SOURCE = "FILTER_SOURCE";
export const SORT_BY = "SORT_BY";
export const FILTER_GENRE = "FILTER_GENRE";
export const SET_GENRE_INPUTS = "SET_GENRE_INPUTS";

// armo las paginas, lo llamo cada vez que cambio la cantidad de juegos
export const buildPages = () => {
  return { type: BUILD_PAGES };
};

// setCurrent lo uso para updatear la pagina que quiero mostrar
export const setCurrentPage = (payload) => {
  return { type: SET_CURRENT, payload: payload };
};

export const showSearch = (bool) => {
  return { type: SHOW_SEARCH, payload: bool };
};

// getGames agrega games al estado.
export const getGames = (game) => async (dispatch) => {
  if (game) {
    try {
      let { data } = await axios.get(`http://localhost:3001/api/videogames`, {
        params: { name: game },
      });
      return dispatch({ type: GET_GAMES_BY_NAME, payload: data });
    } catch (err) {
      console.log(err);
    }
  }
  try {
    let { data } = await axios.get(`http://localhost:3001/api/videogames`);
    return dispatch({ type: GET_GAMES, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const getGameID = (ID) => async (dispatch) => {
  if (!ID) return dispatch({ type: GET_GAME_BY_ID });
  try {
    let { data } = await axios.get(
      `http://localhost:3001/api/videogames/${ID}`
    );
    return dispatch({ type: GET_GAME_BY_ID, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const addGame = (newGame) => async (dispatch) => {
  try {
    let { data } = await axios.post(
      `http://localhost:3001/api/videogames`,
      newGame
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getGenres = () => async (dispatch) => {
  try {
    let { data } = await axios.get(`http://localhost:3001/api/genres`);
    return dispatch({ type: GET_GENRES, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const filterSource = (source) => {
  return { type: FILTER_SOURCE, payload: source };
};

export const sortBy = (sort) => {
  return { type: SORT_BY, payload: sort };
};

export const setGenreInputs = (genreInputs) => {
  return { type: SET_GENRE_INPUTS, payload: genreInputs };
};

export const filterGenre = () => {
  return { type: FILTER_GENRE };
};
