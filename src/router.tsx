import { FC, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthenticationContext } from './components/contexts/authentication-context'
import { Sidebar } from './components/sidebar/sidebar'
import { AuthenticationPage } from './pages/authentication-page'
import { GamePage } from './pages/game-page'
import { HomePage } from './pages/home-page'

export const Router: FC = () => {

  const { authUser } = useContext(AuthenticationContext);
  const geee = false;

  //TODO: Remove this boolean later

  if (!authUser) {
    return <div className="md:flex flex-col md:flex-row md:min-h-screen w-screen">
      <Routes>
          <Route path='/' element={<AuthenticationPage />} />
      </Routes>
    </div>
  }else {
    return <div className="lg:flex flex-col md:flex-row lg:min-h-screen w-screen">
      <Sidebar /> 
      <Routes>
          
        geee? <Route path='/game' element={<GamePage />} />: <Route path='/home' element={<HomePage />} />
            
      </Routes>
    </div>
    
    
    
  }
}
