
import React from 'react';
import type { ViewType } from '../App';
import type { User } from '../types';
import { DashboardIcon, IncidentIcon, SlaIcon, AssetIcon, ChangeIcon, ProblemIcon, ReleaseIcon, ReportIcon, VendorIcon, IntegrationIcon, AdminIcon } from './icons/Icons';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  currentUser: User;
  onLogout: () => void;
}

const NavItem: React.FC<{
  view: ViewType;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  icon: React.ReactNode;
  label: string;
}> = ({ view, activeView, setActiveView, icon, label }) => {
  const isActive = activeView === view;
  return (
    <li>
      <button
        onClick={() => setActiveView(view)}
        className={`flex items-center w-full p-3 my-1 rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-red-600 text-white shadow-lg'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        {icon}
        <span className="ml-3 font-medium">{label}</span>
      </button>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, currentUser, onLogout }) => {
    const allNavItems = [
        { view: 'dashboard' as ViewType, icon: <DashboardIcon />, label: 'Dashboard', roles: ['agent', 'customer', 'admin'] },
        { view: 'incidents' as ViewType, icon: <IncidentIcon />, label: 'Incident Management', roles: ['agent', 'customer', 'admin'] },
        { view: 'assets' as ViewType, icon: <AssetIcon />, label: 'Asset Management', roles: ['agent', 'customer', 'admin'] },
        { view: 'slm' as ViewType, icon: <SlaIcon />, label: 'Service Level Mgmt', roles: ['agent', 'admin'] },
        { view: 'changes' as ViewType, icon: <ChangeIcon />, label: 'Change Management', roles: ['agent', 'admin'] },
        { view: 'problems' as ViewType, icon: <ProblemIcon />, label: 'Problem Management', roles: ['agent', 'admin'] },
        { view: 'releases' as ViewType, icon: <ReleaseIcon />, label: 'Release Management', roles: ['agent', 'admin'] },
        { view: 'reports' as ViewType, icon: <ReportIcon />, label: 'Service Level Reports', roles: ['agent', 'admin'] },
        { view: 'vendors' as ViewType, icon: <VendorIcon />, label: 'Vendor Management', roles: ['agent', 'admin'] },
        { view: 'integrations' as ViewType, icon: <IntegrationIcon />, label: 'Multi-channel', roles: ['agent', 'admin'] },
        { view: 'administration' as ViewType, icon: <AdminIcon />, label: 'Administration', roles: ['admin'] },
    ];

    const navItems = allNavItems.filter(item => item.roles.includes(currentUser.role));
    
  return (
    <aside className="w-64 flex-shrink-0 bg-gray-900 border-r border-gray-700/50 p-4 flex flex-col h-full overflow-y-auto">
      <div className="flex items-center mb-8">
        <div className="bg-red-600 p-2 rounded-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </div>
        <h1 className="text-2xl font-bold text-white ml-3">One Stop</h1>
      </div>
      <div className="px-2 mb-4">
        <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">
            {currentUser.role === 'customer' ? 'Self Service' : 'Service Console'}
        </span>
      </div>
      <nav className="flex-1">
        <ul>
          {navItems.map(item => (
            <NavItem key={item.view} {...item} activeView={activeView} setActiveView={setActiveView} />
          ))}
        </ul>
      </nav>
       <div className="mt-8 pt-4 border-t border-gray-700">
        <button 
            onClick={onLogout}
            className="flex items-center w-full p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          <span className="ml-3">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
