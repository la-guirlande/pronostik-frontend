import { FC } from 'react'

export interface IGameLobbyProps{
  onSubmit: () => void;
}

export const GameLobby: FC<IGameLobbyProps> = ({onSubmit}) => {
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-row justify-center">
        <button className="mt-3 text-lg font-normal
                bg-gray-800 w-34 text-white rounded-sm
                px-6 py-3 block shadow-xl font-montserrat" 
                onClick={() => onSubmit()}>
          Créer une partie 
        </button>
      </div>
    </div>
  )
}
