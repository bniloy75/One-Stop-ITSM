
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import IncidentManagement from './components/IncidentManagement';
import ServiceLevelManagement from './components/ServiceLevelManagement';
import AssetManagement from './components/AssetManagement';
import ChangeManagement from './components/ChangeManagement';
import ProblemManagement from './components/ProblemManagement';
import ReleaseManagement from './components/ReleaseManagement';
import Reports from './components/Reports';
import VendorManagement from './components/VendorManagement';
import Integrations from './components/Integrations';
import Administration from './components/Administration';
import Login from './components/Login';
import type { User, UserRole } from './types';

export type ViewType =
  | 'dashboard'
  | 'incidents'
  | 'slm'
  | 'assets'
  | 'changes'
  | 'problems'
  | 'releases'
  | 'reports'
  | 'vendors'
  | 'integrations'
  | 'administration';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<ViewType>('dashboard');

  const handleLogin = (username: string, role: UserRole) => {
    // Mock user data creation
    const user: User = {
        id: role === 'agent' ? 'USR_ADMIN' : 'USR_CUST',
        name: role === 'agent' ? (username || 'Admin User') : (username || 'Jane Smith'),
        email: `${username || 'user'}@example.com`,
        role: role,
        avatar: `https://ui-avatars.com/api/?name=${username || 'User'}&background=${role === 'agent' ? 'EF4444' : '3B82F6'}&color=fff`
    };
    // Force admin role for the demo agent login to show all features
    if (role === 'agent') {
        user.role = 'admin';
    }
    
    setCurrentUser(user);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView('dashboard');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard currentUser={currentUser!} />;
      case 'incidents':
        return <IncidentManagement currentUser={currentUser!} />;
      case 'slm':
        return <ServiceLevelManagement />;
      case 'assets':
          return <AssetManagement />;
      case 'changes':
          return <ChangeManagement />;
      case 'problems':
          return <ProblemManagement />;
      case 'releases':
          return <ReleaseManagement />;
      case 'reports':
          return <Reports />;
      case 'vendors':
          return <VendorManagement />;
      case 'integrations':
          return <Integrations />;
      case 'administration':
          return <Administration />;
      default:
        return <Dashboard currentUser={currentUser!} />;
    }
  };

  if (!currentUser) {
      return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
      <Layout 
        activeView={activeView} 
        setActiveView={setActiveView} 
        currentUser={currentUser}
        onLogout={handleLogout}
      >
        {renderContent()}
      </Layout>
    </div>
  );
};

export default App;
