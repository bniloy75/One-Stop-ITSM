
import React, { useState } from 'react';
import type { UserRole } from '../types';

interface LoginProps {
  onLogin: (username: string, role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>('agent');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
        setError('Please enter both username and password.');
        return;
    }
    // Mock authentication
    if (password === 'password' || password === 'admin' || password === 'user') {
        onLogin(username, role);
    } else {
        setError('Invalid credentials. Try "password".');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center p-4">
      <div className="mb-8 text-center">
        <div className="inline-block bg-red-600 p-3 rounded-xl mb-4 shadow-lg shadow-red-600/20">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">One Stop ITSM</h1>
        <p className="text-gray-400 mt-2">Enterprise Service Management</p>
      </div>

      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
        <div className="flex border-b border-gray-700">
            <button 
                onClick={() => setRole('agent')}
                className={`flex-1 py-4 text-sm font-semibold transition-colors ${role === 'agent' ? 'bg-gray-800 text-red-500 border-b-2 border-red-500' : 'bg-gray-900/50 text-gray-400 hover:text-white'}`}
            >
                Agent Login
            </button>
            <button 
                onClick={() => setRole('customer')}
                className={`flex-1 py-4 text-sm font-semibold transition-colors ${role === 'customer' ? 'bg-gray-800 text-red-500 border-b-2 border-red-500' : 'bg-gray-900/50 text-gray-400 hover:text-white'}`}
            >
                Customer Portal
            </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                    {error}
                </div>
            )}
            
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={role === 'agent' ? 'admin' : 'jane.smith'}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
            </div>

            <button 
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-4 rounded-lg hover:from-red-500 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all transform active:scale-95"
            >
                {role === 'agent' ? 'Sign In to Console' : 'Login to Portal'}
            </button>

            <div className="text-center">
                <p className="text-xs text-gray-500">
                    Demo credentials: Use <span className="text-gray-300">password</span> for any user.
                </p>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
