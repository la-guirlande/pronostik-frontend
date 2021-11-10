import { ErrorData, GameData, UserData } from './data-types';
/**
 * Base response.
 */
export interface Response {}

/**
 * Error response.
 * 
 * Returned when any error occurs.
 */
export interface ErrorResponse extends Response {
  errors: ErrorData[];
}

/**
 * Creation response.
 * 
 * Returned after some POST requests.
 */
export interface CreationResponse extends Response {
  id: string;
}

/**
 * User information response.
 * 
 * Returned by `GET /users/info`.
 */
export interface UserInfoResponse extends Response {
  user: UserData;
}

/**
 * Users response data interface.
 * 
 * This API response is returned by `GET /users`.
 */
 export interface UsersResponse extends Response {
  users: UserData[];
}

/**
 * User response data interface.
 * 
 * This API response is returned by `GET /users/:id`.
 */
export interface UserResponse extends Response {
  user: UserData;
}

/**
 * Refresh token response.
 * 
 * Returned by `POST /auth/refreshToken`
 */
export interface AccessTokenResponse extends Response {
  refresh_token: string;
  access_token: string;
}

/**
 * Game response.
 * 
 * Returned by `GET /game/:id`
 */
export interface GameResponse extends Response {
  game: GameData;
}
