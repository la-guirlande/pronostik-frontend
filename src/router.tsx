import { FC, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthenticationContext } from './components/contexts/authentication-context'
import { AuthenticationPage } from './pages/authentication-page'
import { HomePage } from './pages/home-page'

export const Router: FC = () => {

  const { authUser } = useContext(AuthenticationContext);

  return (
    <div>
      <Routes>
        {
          !authUser ? <Route path='/' element={<AuthenticationPage />} />
            : <Route path='/' element={<HomePage />} />
        }

      </Routes>
    </div>
  )
}
