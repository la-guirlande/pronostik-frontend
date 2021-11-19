import { FC } from 'react'
import { GameData } from '../../util/types/data-types'
import { GameCard } from './game-card'

export interface IGameLobbyProps {
  games: GameData[];
  onGameSelect: (game: GameData) => void;
}

export const GameLobby: FC<IGameLobbyProps> = ({ games, onGameSelect }) => (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col justify-start">
        <div className="font-montserrat text-2xl text-center my-6">
          <span>Vos parties en cours</span>
        </div>
        <div className="w-full flex flex-row justify-center">
          {
            games?.map((game, key) => <GameCard key={key} game={game} onClick={() => onGameSelect(game)} />
            )
          }
        </div>
      </div>
    </div>
  );

