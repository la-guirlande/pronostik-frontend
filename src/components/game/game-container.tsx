import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Status, useQuery } from "../../hooks/query-hook";
import { Config } from "../../util/config";
import { LocalStorageKey } from "../../util/local-storage";
import { GameData } from "../../util/types/data-types";
import { CreationResponse, GamesResponse } from "../../util/types/response-types";
import { AuthenticationContext } from '../contexts/authentication-context';
import { GameContext } from '../contexts/game-context';
import { GameLobby } from "./game-lobby";
import { TrackList } from "./tracklist";

export const GameContainer: React.FC = () => {
  const { authUser } = useContext(AuthenticationContext);
  const { currentGame, updateCurrentGame, resetCurrentGame } = useContext(GameContext);
  const [userGames, setUserGames] = useState<GameData[]>([]);
  const userGamesQuery = useQuery<GamesResponse>();
  const createGameQuery = useQuery<CreationResponse>();

  useEffect(() => {
    switch (userGamesQuery.status) {
      case Status.INIT:
        userGamesQuery.get(`${Config.API_URL}/users/${authUser.id}/games`);
        break;
      case Status.SUCCESS:
        setUserGames(userGamesQuery.response.games);
        break;
      case Status.ERROR:
        console.error(userGamesQuery.errorResponse.errors);
        break;
    }
  }, [userGamesQuery.status]);

  useEffect(() => {
    switch (createGameQuery.status) {
      case Status.SUCCESS:
        updateCurrentGame(createGameQuery.response.id);
        break;
      case Status.ERROR:
        console.error('Could not create game :', createGameQuery.errorResponse.errors);
        break;
    }
  }, [createGameQuery.status]);

  const handleCreateGame = () => {
    createGameQuery.post(`${Config.API_URL}/games`, {
      name: 'Ce cône',
      description: 'J\'espère qu\'il va pas passer le son de merde (celui que Otah a remixé après)'
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)}`
      }
    });
  };

  const handleGameSelect = (game: GameData) => {
    updateCurrentGame(game.id);
  }

  const handleShowUserGames = () => {
    resetCurrentGame();
  }

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
          {currentGame ? (
            <div>
              <button className="font-montserrat font-light" onClick={handleShowUserGames}>
                Vos parties en cours
              </button>
              <TrackList game={currentGame} />
            </div>
          ) : (
            <div>
              <button className="mt-3 text-lg font-normal bg-gray-800 w-34 text-white rounded-sm px-6 py-3 block shadow-xl font-montserrat" onClick={handleCreateGame}>
                  Créer une partie 
              </button>
              <Link className="mt-3 text-lg font-normal bg-gray-800 w-34 text-white rounded-sm px-6 py-3 block shadow-xl font-montserrat" to="/find">
                  Trouver une partie
              </Link>
              <GameLobby games={userGames} onGameSelect={handleGameSelect} />
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  )
}
