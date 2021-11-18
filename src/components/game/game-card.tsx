import { FC } from 'react'
import { GameData } from '../../util/types/data-types'

export const GameCard: FC<GameData> = ({name, description}) => {
    
    return (<div className="mx-6 bg-gray-100 flex justify-center items-center">
            <div className="container w-80 mx-auto  bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 duration-500">
            <img className="w-full" src="https://i.ytimg.com/vi/SU2PTRY7HUE/maxresdefault.jpg" alt="" />
            <div className="text-center relative py-14">
                <span className="absolute transform -translate-x-10 -translate-y-24 z-50 text-green-500 bg-white rounded-full hover:text-green-400 transition-all duration-200 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                </span>
                <h1 className="mb-1 text-2xl font-sans font-semibold text-gray-700 hover:text-gray-900 cursor-pointer">{name}</h1>
                <span className="text-lg text-gray-700 hover:text-gray-900">{description}</span>
            </div>
            </div>
        </div>);
}
