import { Routes, Route } from "react-router-dom";
import "./App.css";
import Create from "./components/Create/Create";
import GameDetail from "./components/GameDetail/GameDetail";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/game/:id" element={<GameDetail />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
