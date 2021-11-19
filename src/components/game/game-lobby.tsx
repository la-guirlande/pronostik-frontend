import { FC } from 'react'
import { GameData } from '../../util/types/data-types'
import { GameCard } from './game-card'

export interface IGameLobbyProps{
  onSubmit: () => void;
  games: GameData[]
}

export const GameLobby: FC<IGameLobbyProps> = ({onSubmit, games}) => (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col justify-start">
        <div className="font-montserrat text-2xl text-center my-6">
          <span>Vos parties en cours</span>
        </div>
        <div className="w-full flex flex-wrap justify-center">
          {
            games?.map((game, key) => <GameCard key={key} name={game.name} description={game.description} players={game.players} tracks={game.tracks} id={game.id} />
            )
          }
        </div>
        <div className="w-full flex lg:flex-row flex-col justify-evenly">
          <button className="mt-3 text-lg font-normal w-24 lg:w-56 h-12 lg:h-20 self-center bg-gray-800 text-white rounded-sm
                  px-6 py-3 block shadow-xl font-montserrat" 
                  onClick={() => onSubmit()}>
            Créer une partie
          </button>
          <span className="mt-4 text-lg px-6 py-3 block shadow-xl font-montserrat font-bold">
            ou
          </span>
          <button className="mt-3 text-lg font-normal w-24 lg:w-56 h-12 lg:h-20 self-center bg-gray-800 text-white rounded-sm
                  px-6 py-3 block shadow-xl font-montserrat" 
                  onClick={() => onSubmit()}>
            Rejoindre une partie
          </button>
        </div>
        
      </div>
    </div>
  )
