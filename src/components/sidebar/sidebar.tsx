import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

export const Sidebar: FC = () => {

  const [toggleSidebar, setToggleSidebar] = useState(false);

  return <div className="flex flex-col w-full lg:w-64 text-gray-700 bg-white flex-shrink-0">
    <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
      <Link to="/" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-sm focus:outline-none focus:shadow-outline">Pronostik</Link>
      <button className="rounded-sm lg:hidden focus:outline-none focus:shadow-outline" onClick={() => setToggleSidebar(!toggleSidebar)}>
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
          {
            toggleSidebar ? <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            : <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path> 
          }
        </svg>
      </button>
    </div>
    <nav className={`flex-grow lg:block px-4 pb-4 lg:pb-0 lg:overflow-y-auto ${toggleSidebar ? 'block': 'hidden'}`}>
      <Link className="sidebar-button" to="/">Accueil</Link>
      <Link className="sidebar-button" to="/game">Jouer</Link>
      <Link className="sidebar-button" to="/account">Compte</Link>
      <Link className="sidebar-button" to="/contact">Contact</Link>
    </nav>
  </div>
}
