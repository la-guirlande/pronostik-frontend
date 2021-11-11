import React from 'react';
import { Sidebar } from '../components/sidebar/sidebar';
import { GamePage } from './game-page';

export const HomePage: React.FC = () => {
  return (
    <div className="md:flex flex-col md:flex-row md:min-h-screen w-screen">
      <Sidebar />
      <GamePage />
    </div>
  )
}
