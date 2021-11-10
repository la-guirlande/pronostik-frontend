import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthenticationContextProvider } from './components/contexts/authentication-context';
import { AuthenticationPage } from './pages/authentication-page';
import { HomePage } from './pages/home-page';
import { Router } from './router';

const App: React.FC = () => (
  <AuthenticationContextProvider>
    {/* <WebsocketProvider> */}
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    {/* </WebsocketProvider> */}
  </AuthenticationContextProvider>

)

export default App;
