import { FC, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthenticationContext } from './components/contexts/authentication-context'
import { Sidebar } from './components/sidebar/sidebar'
import { AuthenticationPage } from './pages/authentication-page'
import { GamePage } from './pages/game-page'
import { HomePage } from './pages/home-page'

export const Router: FC = () => {
  const { authUser } = useContext(AuthenticationContext);

  if (!authUser) {
    return (
      <div className="md:flex flex-col md:flex-row md:min-h-screen w-screen">
        <Routes>
            <Route path='/' element={<AuthenticationPage />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="md:flex flex-col md:flex-row md:min-h-screen w-screen">
        <Sidebar /> 
        <Routes>
          <Route path='*' element={<HomePage />} />
          <Route path='play' element={<GamePage />} />
          <Route path='account' element={<HomePage />} />
          <Route path='contact' element={<HomePage />} />
        </Routes>
      </div>
    );
  }
}
