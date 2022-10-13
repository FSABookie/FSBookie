import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function GamePage(props) {
  const { game } = useSelector((state) => state.selectedGame);

  useEffect(() => {
    console.log(game);
  }, [game]);
  return <div>hello</div>;
}

export default GamePage;
