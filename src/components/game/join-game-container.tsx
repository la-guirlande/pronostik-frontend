import { FC, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Status, useQuery } from '../../hooks/query-hook';
import { Config } from '../../util/config';
import { LocalStorageKey } from '../../util/local-storage';
import { GameData } from '../../util/types/data-types';
import { CreationResponse, GamesResponse } from '../../util/types/response-types';
import { GameContext } from '../contexts/game-context';
import { GameLobby } from './game-lobby';

export const JoinGameContainer: FC = () => {
  const { updateCurrentGame } = useContext(GameContext);
  const navigate = useNavigate();
  const gamesQuery = useQuery<GamesResponse>();
  const joinGameQuery = useQuery<CreationResponse>();

  useEffect(() => {
    switch (gamesQuery.status) {
      case Status.INIT:
        gamesQuery.get(`${Config.API_URL}/games`);
        break;
      case Status.ERROR:
        console.error(gamesQuery.errorResponse.errors);
        break;
    }
  }, [gamesQuery.status]);

  useEffect(() => {
    switch (joinGameQuery.status) {
      case Status.SUCCESS:
        updateCurrentGame(joinGameQuery.response.id);
        navigate('/play');
        break;
      case Status.ERROR:
        console.error(joinGameQuery.errorResponse.errors);
        break;
    }
  }, [joinGameQuery.status]);

  const handleGameSelect = (game: GameData) => {
    joinGameQuery.put(`${Config.API_URL}/games/${game.id}/join`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)}` }
    });
  }

  return (
    <GameLobby games={gamesQuery?.response?.games || []} onGameSelect={handleGameSelect} />
  );
}
