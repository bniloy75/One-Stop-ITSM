
import React from 'react';
import type { User } from '../types';

interface HeaderProps {
    currentUser: User;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  return (
    <header className="bg-gray-900 border-b border-gray-700/50 p-4 flex justify-between items-center flex-shrink-0">
      <div className="relative w-full max-w-md">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input
          type="text"
          placeholder={currentUser.role === 'agent' ? "Search for incidents, assets, changes..." : "Search knowledge base..."}
          className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center">
            <img 
                src={currentUser.avatar || "https://picsum.photos/40"} 
                alt="User" 
                className="w-10 h-10 rounded-full border-2 border-red-500" 
            />
            <div className="ml-3 hidden md:block">
                <p className="text-sm font-semibold text-white">{currentUser.name}</p>
                <p className="text-xs text-gray-400 capitalize">{currentUser.role === 'agent' ? 'System Administrator' : 'Standard User'}</p>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
