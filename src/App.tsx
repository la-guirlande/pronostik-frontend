import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthenticationContextProvider } from './components/contexts/authentication-context';
import { GameContextProvider } from './components/contexts/game-context';
import { Router } from './router';

const App: React.FC = () => (
  <AuthenticationContextProvider>
    <GameContextProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </GameContextProvider>
  </AuthenticationContextProvider>

)

export default App;
