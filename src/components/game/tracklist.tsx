import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import { Status, useQuery } from '../../hooks/query-hook';
import { Config } from '../../util/config';
import { LocalStorageKey } from '../../util/local-storage';
import { GameTrack } from "../../util/types/data-types";
import { CreationResponse } from '../../util/types/response-types';
import { AuthenticationContext } from "../contexts/authentication-context";
import { GameContext } from '../contexts/game-context';
import { AddTrackForm, AddTrackFormData } from './add-track-form';
import { PronosticForm, PronosticFormData } from './pronostic-form';

export const TrackList: React.FC = () => {
  const { authUser } = useContext(AuthenticationContext);
  const { currentGame, updateCurrentGame } = useContext(GameContext);
  const addTrackQuery = useQuery<CreationResponse>();
  const pronosticRegisterQuery = useQuery<CreationResponse>();
  const playedTrackQuery = useQuery<CreationResponse>();
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    switch (addTrackQuery.status) {
      case Status.SUCCESS:
        updateCurrentGame();
        break;
      case Status.ERROR:
        console.error(addTrackQuery.errorResponse.errors);
        break;
    }
  }, [addTrackQuery.status]);

  useEffect(() => {
    switch (pronosticRegisterQuery.status) {
      case Status.SUCCESS:
        updateCurrentGame();
        break;
      case Status.ERROR:
        console.error(pronosticRegisterQuery.errorResponse.errors);
        break;
    }
  }, [pronosticRegisterQuery.status]);

  useEffect(() => {
    switch (playedTrackQuery.status) {
      case Status.SUCCESS:
        updateCurrentGame();
        break;
      case Status.ERROR:
        console.error(playedTrackQuery.errorResponse.errors);
        break;
    }
  }, [playedTrackQuery.status]);

  const filteredTracks = useMemo(() => {
    return currentGame.tracks.filter(track => track.name.toLowerCase().includes(filter.toLowerCase()));
  }, [filter, currentGame.tracks]);

  const handleAddTrack = ({ name, artists }: AddTrackFormData) => {
    addTrackQuery.post(`${Config.API_URL}/games/${currentGame.id}/tracks`, { name, artists: artists.map(artist => artist.name) });
  }

  const handlePronosticRegister = (track: GameTrack, { score }: PronosticFormData) => {
    pronosticRegisterQuery.put(`${Config.API_URL}/games/${currentGame.id}/tracks/${track.id}/score`, { score }, {
      headers: { Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)}` }
    });
  }

  const handleTrackPlayed = (track: GameTrack) => {
    playedTrackQuery.put(`${Config.API_URL}/games/${currentGame.id}/tracks/${track.id}/played`);
  }

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  }

  return (
    <section className=" w-full p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden ">
        <div className="font-montserrat text-2xl text-center my-8 ">
          <span className="border-b-2 border-gray-700">Votre partie en cours</span>
        </div>
        <div className="font-montserrat text-xl text-center mb-1 font-bold">
          <span>{currentGame.name}</span>
        </div>
        <div className="font-montserrat text-xl text-center mb-16 text-gray-600">
          <span>{currentGame.description}</span>
        </div>
        <div className="w-full overflow-x-auto rounded-lg shadow-lg">
          <input placeholder="Filtrer..." onChange={handleFilter} />
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide  text-gray-900 bg-gray-100 uppercase border-b border-gray-600 text-center">
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Artiste</th>
                <th className="px-4 py-3">Jouée</th>
        
                {
                  
                  currentGame?.players.map((player, key) => (
                    <th className="px-4 py-3" key={key}>{player.name}</th>
                  ))
                }
              </tr>
            </thead>

            <tbody className="bg-white">
              {filteredTracks ?
                filteredTracks.sort((a, b) => {
                  if (a.name < b.name) {
                    return -1;
                  } else if (a.name > b.name) {
                    return 1;
                  } else {
                    return 0;
                  }
                }).map((track: GameTrack, key) => (
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
                      <button className={`p-4 rounded-lg ${track.played ? 'bg-green-700' : 'bg-red-700 '} rounded-sm`} onClick={() => handleTrackPlayed(track)} ></button>
                    </td>

                    {

                      currentGame?.players.map((player, key) => {
                        const currentScore = track.scores.find(score => score.player.id === player.id)
                        return currentScore ? (
                          <td className="px-4 py-3 text-sm border " key={key}>
                            <span>{currentScore.score}</span>
                          </td>
                        ) : (
                            <td className="px-4 py-3 text-sm border" key={key}>
                              {player.id === authUser.id ? (
                                <PronosticForm onSubmit={(data) => handlePronosticRegister(track, data)} />
                              ) : (
                                <span>•</span>
                              )}
                            </td>
                        );
                      })
                    }
                  </tr>
                )) :
                <></>
              }

            </tbody>
          </table>
          <AddTrackForm onSubmit={handleAddTrack} />
        </div>
      </div>
    </section>
  )
}

TrackList.defaultProps = {}
