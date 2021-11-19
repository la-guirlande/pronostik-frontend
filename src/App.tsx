import React from 'react';
import { AuthenticationContextProvider } from './components/contexts/authentication-context';
import { GameContextProvider } from './components/contexts/game-context';
import { Router } from './router';

const App: React.FC = () => (
  <AuthenticationContextProvider>
    <GameContextProvider>
      <Router />
    </GameContextProvider>
  </AuthenticationContextProvider>

)

export default App;
