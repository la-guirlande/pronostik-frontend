import { FC } from 'react'
import { GameData } from '../../util/types/data-types'
import { GameCard } from './game-card'

export interface IGameLobbyProps{
  onSubmit: () => void;
  games: GameData[];
  onGameSelect: (game: GameData) => void;
}

export const GameLobby: FC<IGameLobbyProps> = ({ onSubmit, games, onGameSelect }) => (
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
        <button className="mt-3 text-lg font-normal
                bg-gray-800 w-34 text-white rounded-sm
                px-6 py-3 block shadow-xl font-montserrat" 
                onClick={() => onSubmit()}>
          Créer une partie 
        </button>
      </div>
    </div>
  );

