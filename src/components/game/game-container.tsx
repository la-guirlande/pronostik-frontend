import { useEffect, useState } from "react";
import { Status, useQuery } from "../../hooks/query-hook";
import { Config } from "../../util/config";
import { GameData } from "../../util/types/data-types";
import { GameResponse } from "../../util/types/response-types";
import { TrackList } from "./tracklist";

export const GameContainer: React.FC = () => {
  const [game, setGame] = useState<GameData>();
  const gameQuery = useQuery<GameResponse>();

  useEffect(() => {
    switch (gameQuery.status) {
      case Status.INIT:
        gameQuery.get(`${Config.API_URL}/game`)
        break;
      case Status.SUCCESS:
        setGame(gameQuery.response.game);
        console.log(gameQuery.response.game);
        break;
      case Status.ERROR:
        console.error(gameQuery.errorResponse.errors);
        break;
      default: break;
    }
  })
  return (
    <>
      <TrackList tracks={game?.tracks} />
    </>
  )
}
