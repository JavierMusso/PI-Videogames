import axios from "axios";

export const BUILD_PAGES = "BUILD_PAGES";
export const SET_CURRENT = "SET_CURRENT";
export const GET_GAMES = "GET_GAMES";
export const GET_GAMES_BY_NAME = "GET_GAMES_BY_NAME";
export const GET_GENRES = "GET_GENRES";
export const SHOW_SEARCH = "SHOW_SEARCH";
export const FILTER_SOURCE = "FILTER_SOURCE";
export const SORT_BY = "SORT_BY";

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
