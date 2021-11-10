/**
 * Base data.
 */
export interface BaseData {
  id: string;
}

/**
 * Error data.
 */
export interface ErrorData {
  error:
  'access_denied'
  | 'network_error';
  error_description: string;
}

/**
 * User data.
 */
export interface UserData extends BaseData {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface GameData extends BaseData {
  name?: string;
  description?: string;
  players: UserData[];
  tracks: GameTrack[];
}

export interface GameTrack {
  name: string;
  artists: string[];
  scores: GameTrackScore[];
  played: boolean;
}

export interface GameTrackScore {
  player: UserData;
  score: number;
}
