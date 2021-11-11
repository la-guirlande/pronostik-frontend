import { FC, useContext, useEffect, useState } from 'react';
import { Status, useQuery } from '../../hooks/query-hook';
import { Config } from '../../util/config';
import { LocalStorageKey } from '../../util/local-storage';
import { CreationResponse, RefreshTokenResponse } from '../../util/types/response-types';
import { AuthenticationContext } from '../contexts/authentication-context';
import { ILoginFormData, LoginForm } from './login-form';
import { IRegisterFormData, RegisterForm } from './register-form';

export const AuthenticationContainer: FC = () => {

  const refreshTokenQuery = useQuery<RefreshTokenResponse>();
  const createUserQuery = useQuery<CreationResponse>();
  const { updateAuthUser } = useContext(AuthenticationContext);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    switch (refreshTokenQuery.status) {
      case Status.SUCCESS:
        localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, refreshTokenQuery.response.access_token)
        localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, refreshTokenQuery.response.refresh_token)
        updateAuthUser();
        break;

      case Status.ERROR:
        console.error(refreshTokenQuery.errorResponse.errors)
        break;
      default:
        break;
    }
  }, [refreshTokenQuery.status])

  useEffect(() => {
    switch (createUserQuery.status) {
      case Status.SUCCESS:
        setShowRegister(false);
        break;

      case Status.ERROR:
        console.error(createUserQuery.errorResponse.errors)
        break;
      default:
        break;
    }
  }, [createUserQuery.status])

  const handleLoginSubmit = (data: ILoginFormData) => {
    refreshTokenQuery.post(`${Config.API_URL}/auth/refreshToken`, {
      email: data.email,
      password: data.password
    });
  };

  const handleRegisterSubmit = (data: IRegisterFormData) => {

    if (data.password === data.passwordConfirm) {
      createUserQuery.post(`${Config.API_URL}/users`, {
        email: data.email,
        name: data.name,
        password: data.password
      })
    } else {
      console.error("Les mots de passe de correspondent pas");
    }
  };

  return (
    <div className="flex flex-col justify-between">
      {
        showRegister ? <RegisterForm onSubmit={handleRegisterSubmit} />
          : <LoginForm onSubmit={handleLoginSubmit} />
      }

      <div className="text-sm font-semibold py-6 justify-between flex flex-col">
        <span
          className="text-black font-normal border-b-2 border-gray-200 hover:border-teal-500 text-center">
          {showRegister ? 'Déjà inscrit ?' : 'Pas encore inscrit ?'}
        </span>
        <button className="text-black font-semibold" onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? 'Se connecter' : 'S\'inscrire'}
        </button>

      </div>
    </div>
  );
}
