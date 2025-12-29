
import React from 'react';
import type { ViewType } from '../App';
import type { User } from '../types';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  currentUser: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, currentUser, onLogout }) => {
  return (
    <div className="flex h-screen w-full bg-gray-900">
      <Sidebar activeView={activeView} setActiveView={setActiveView} currentUser={currentUser} onLogout={onLogout} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header currentUser={currentUser} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800/50 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
