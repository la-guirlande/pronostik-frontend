import { FC, useContext, useEffect } from 'react';
import { Status, useQuery } from '../../hooks/query-hook';
import { Config } from '../../util/config';
import { LocalStorageKey } from '../../util/local-storage';
import { AccessTokenResponse } from '../../util/types/response-types';
import { AuthenticationContext } from '../contexts/authentication-context';
import { ILoginFormData, LoginForm } from './login-form';

export const AuthenticationContainer: FC = () => {

    const refreshTokenQuery = useQuery<AccessTokenResponse>();
    const { updateAuthUser } = useContext(AuthenticationContext);

    const handleLoginSubmit = (data: ILoginFormData) => {
        refreshTokenQuery.post(`${Config.API_URL}/auth/refreshToken`, {
            email: data.email,
            password: data.password
        });
    };

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

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <LoginForm onSubmit={handleLoginSubmit} />
            </div>
        </div>
    )
}
