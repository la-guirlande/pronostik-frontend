import { useContext } from "react";
import { GameData, GameTrack } from "../../util/types/data-types";
import { AuthenticationContext } from "../contexts/authentication-context";

interface TrackListProps {
  game: GameData;
}
export const TrackList: React.FC<TrackListProps> = ({ game }) => {

  const { authUser } = useContext(AuthenticationContext);

  return (
    <section className=" w-full p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Artiste</th>
                <th className="px-4 py-3">Jouée</th>
        
                {
                  
                  game?.players.map((player, key) => (
                    <th className="px-4 py-3" key={key}>{player.name}</th>
                  ))
                }
              </tr>
            </thead>

            <tbody className="bg-white">
              {game?.tracks ?
                game?.tracks.map((track: GameTrack, key) => (
                  <tr className="text-gray-700" key={key}>
                    <td className="px-4 py-3 border">
                      <div className="flex items-center text-sm">
                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                          <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                          <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-black">{track.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">{track.artists.join(', ')}</td>
                    <td className="px-4 py-3 text-xs border text-center">
                      <span className={`w-12 px-2 py-1 font-semibold leading-tight ${track.played ? 'bg-green-700' : 'bg-red-700 '} rounded-sm`} ></span>
                    </td>

                    {

                      game?.players.map((player, key) => {
                        const currentScore = track.scores.find(score => score.player.id === player.id)
                        return currentScore ? <td className="px-4 py-3 text-sm border " key={key}>
                        {
                          <span>{currentScore.score}</span>
                        }
                      </td> : <td className="px-4 py-3 text-sm border" key={key}></td>
                      })
                    }
                  </tr>
                )) :
                <></>
              }

            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

TrackList.defaultProps = {}
