import {
  BUILD_PAGES,
  GET_GAMES,
  GET_GAMES_BY_NAME,
  GET_GENRES,
  SET_CURRENT,
  SHOW_SEARCH,
} from "./actions";

const initialState = {
  games: [],
  genres: [],
  pages: [],
  currentPage: 0,
  searchResults: [],
  showSearchResults: false,
};

let gamesPerPage = 15;

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case BUILD_PAGES:
      let nPages = Math.ceil(state.games.length / gamesPerPage);
      let newPages = [];
      for (let i = 0; i < nPages; i++) {
        newPages.push([
          ...state.games.slice(i * gamesPerPage, (i + 1) * gamesPerPage),
        ]);
      }
      return { ...state, pages: newPages };

    case SET_CURRENT:
      return {
        ...state,
        currentPage: payload,
        searchResults: [],
        showSearchResults: false,
      };

    case SHOW_SEARCH:
      return { ...state, showSearchResults: payload, searchResults: [] };

    case GET_GAMES:
      return { ...state, games: [...state.games, ...payload] };

    case GET_GAMES_BY_NAME:
      return { ...state, searchResults: payload };

    case GET_GENRES:
      return { ...state, genres: payload };
    default:
      return state;
  }
};

export default rootReducer;
