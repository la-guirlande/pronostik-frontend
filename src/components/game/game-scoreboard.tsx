import { FC, useEffect } from 'react';
import { Status, useQuery } from '../../hooks/query-hook';
import { Config } from '../../util/config';
import { GameData } from '../../util/types/data-types';
import { GameScoreboardResponse } from '../../util/types/response-types';

export interface GameScoreboardProps {
  game: GameData;
}

export const GameScoreboard: FC<GameScoreboardProps> = ({ game }) => {
  const scoreboardQuery = useQuery<GameScoreboardResponse>();

  useEffect(() => {
    switch (scoreboardQuery.status) {
      case Status.INIT:
        scoreboardQuery.get(`${Config.API_URL}/games/${game.id}/scoreboard`);
        break;
      case Status.ERROR:
        console.error(scoreboardQuery.errorResponse.errors);
        break;
    }
  }, [scoreboardQuery.status]);

  return (
    <div>
      <h2>Scoreboard</h2>
      {scoreboardQuery.status === Status.SUCCESS && scoreboardQuery.response.scoreboard.board.map((board, i) => (
        <div key={i}>
          <p>{i + 1}{i === 0 ? 'er' : 'ème'} - {board.player.name} : {board.score} points</p>
        </div>
      ))}
    </div>
  );
}
