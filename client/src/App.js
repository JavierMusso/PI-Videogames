import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";
import Create from "./components/Create/Create";
import GameDetail from "./components/GameDetail/GameDetail";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import NotFound from "./components/NotFound/NotFound";
import { buildPages, getGames, getGenres, sortBy } from "./redux/actions";
import About from "./components/About/About";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(getGenres());
      await dispatch(getGames());
      dispatch(sortBy("AZ"));
      dispatch(buildPages());
    })();
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game/:id" element={<GameDetail />} />
        <Route path="/create" element={<Create />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
