import React, { useEffect, useState } from 'react';
import { Status, useQuery } from '../../hooks/query-hook';
import { Config } from '../../util/config';
import { LocalStorageKey } from '../../util/local-storage';
import { GameData } from '../../util/types/data-types';
import { GameResponse } from '../../util/types/response-types';

/**
 * Game context state.
 */
export type GameContextState = {
  currentGame: GameData;
  updateCurrentGame(gameId?: string): void;
}

/**
 * Game context.
 * 
 * This context is used to manipulate the current game.
 */
export const GameContext = React.createContext<GameContextState>({ currentGame: null, updateCurrentGame: null });

/**
 * Game context provider.
 */
export const GameContextProvider: React.FC = (props) => {
  const [currentGame, setCurrentGame] = useState<GameData>(null);
  const gameQuery = useQuery<GameResponse>();

  useEffect(() => {
    switch (gameQuery.status) {
      case Status.SUCCESS:
        setCurrentGame(gameQuery.response.game);
        break;
      case Status.ERROR:
        console.error(gameQuery.errorResponse.errors);
        break;
    }
  }, [gameQuery.status]);

  const updateCurrentGame = (gameId?: string) => {
    if (gameId != null) {
      gameQuery.get(`${Config.API_URL}/games/${gameId}`, { headers: { Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)}` } });
    } else if (currentGame != null) {
      gameQuery.get(`${Config.API_URL}/games/${currentGame.id}`, { headers: { Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)}` } });
    } else {
      console.warn('Could not update current game because there is not defined current game');
    }
  }

  return <GameContext.Provider value={{ currentGame, updateCurrentGame }}>{props.children}</GameContext.Provider>
}
