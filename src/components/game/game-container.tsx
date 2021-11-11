import { useEffect, useState } from "react";
import { Status, useQuery } from "../../hooks/query-hook";
import { Config } from "../../util/config";
import { LocalStorageKey } from "../../util/local-storage";
import { GameData } from "../../util/types/data-types";
import { GameResponse } from "../../util/types/response-types";
import { GameLobby } from "./game-lobby";
import { TrackList } from "./tracklist";

export const GameContainer: React.FC = () => {
  const [game, setGame] = useState<GameData>();
  const [gameId, setGameId] = useState<string>("");
  const getGameQuery = useQuery<GameResponse>();
  const createGameQuery = useQuery<GameResponse>();

  useEffect(() => {
    switch (getGameQuery.status) {
      case Status.INIT:
        getGameQuery.get(`${Config.API_URL}/games/${localStorage.getItem(LocalStorageKey.GAME_ID)}`);
        break;
      case Status.SUCCESS:
        setGame(getGameQuery.response.game);
        console.log(getGameQuery.response.game);
        break;
      case Status.ERROR:
        console.error(getGameQuery.errorResponse.errors);
        break;
      default: break;
    }
  }, [getGameQuery.status]);

  useEffect(() => {
    switch (createGameQuery.status) {
      case Status.SUCCESS:
        setGameId(createGameQuery.response.game.id);
        localStorage.setItem('game-id', createGameQuery.response.game.id);
        break;
      case Status.ERROR:
        console.error(createGameQuery.errorResponse.errors);
        break;
      default: break;
    }
  }, [createGameQuery.status]);

  const handleCreateGame = () => {
    createGameQuery.post(`${Config.API_URL}/games`,{
      name: 'Ce cône',
      description: 'J\'espère qu\'il va pas passer le son de merde (celui que Otah a remixé après)'
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)}`
      }
    })
  };

  return (
    <>
      <div className="flex flex-row justify-center h-screen w-full">
        <div className="flex flex-col justify-start w-full">
          <div className="text-center self-center mt-12">
            <span className="font-light  font-montserrat text-4xl text-gray-700">
              Pronostik
            </span>
          </div>
          <div className="h-full mt-36 w-full self-center">
            {
              game ? <TrackList game={game} />
                                : <GameLobby onSubmit={handleCreateGame}/>
            }
           
          </div>

        </div>
      </div>
    </>
  )
}
