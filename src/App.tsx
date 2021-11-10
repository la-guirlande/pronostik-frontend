import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthenticationContextProvider } from './components/contexts/authentication-context';
import { HomePage } from './pages/home-page';

const App: React.FC = () => (
  <AuthenticationContextProvider>
    {/* <WebsocketProvider> */}
    <BrowserRouter>
      <Switch>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
    {/* </WebsocketProvider> */}
  </AuthenticationContextProvider>

)

export default App;
