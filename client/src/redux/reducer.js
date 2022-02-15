import { BUILD_PAGES, GET_GAMES } from "./actions";

const initialState = {
  games: [],
  pages: [],
  currentPage: 0,
};

let gamesPerPage = 15;

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_GAMES:
      return { ...state, games: [...state.games, ...payload] };

    case BUILD_PAGES:
      let nPages = Math.ceil(state.games.length / gamesPerPage);
      let newPages = [];
      for (let i = 0; i < nPages; i++) {
        newPages.push([
          ...state.games.slice(i * gamesPerPage, (i + 1) * gamesPerPage),
        ]);
      }
      return { ...state, pages: newPages };

    default:
      return state;
  }
};

export default rootReducer;
