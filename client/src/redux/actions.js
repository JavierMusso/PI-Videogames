import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const BUILD_PAGES = "BUILD_PAGES";

// getGames agrega games al estado.
export const getGames = () => async (dispatch) => {
  try {
    let { data } = await axios.get(`http://localhost:3001/videogames`);
    return dispatch({ type: GET_GAMES, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const buildPages = () => {
  return { type: BUILD_PAGES };
};
