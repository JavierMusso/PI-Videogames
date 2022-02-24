import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { getGameID } from "../../redux/actions";

function GameDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGameID(id));
  }, [dispatch, id]);
  const game = useSelector((state) => state.gameDetail);

  if (!game) {
    return <div>CARGANDO...</div>;
  }

  if (typeof game === "string") return <Navigate to="/404" />;

  return (
    <div className="GameDetail">
      <h1>GameDetail</h1>
      <div>
        <img src={game.image} alt="" />
        <p>name: {game.name}</p>
        <p>genres: {game.genres}</p>
        <p>description: {game.description}</p>
        <p>release: {game.release}</p>
        <p>rating: {game.rating}</p>
        <p>Platforms: {game.platforms}</p>
      </div>
    </div>
  );
}

export default GameDetail;
