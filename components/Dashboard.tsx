
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from './Card';
import { IncidentIcon, ProblemIcon, ChangeIcon, AssetIcon } from './icons/Icons';
import type { User } from '../types';

interface DashboardProps {
    currentUser: User;
}

const slaData = [
  { name: 'Incidents', slaMet: 98, slaMissed: 2 },
  { name: 'Requests', slaMet: 95, slaMissed: 5 },
  { name: 'Changes', slaMet: 99, slaMissed: 1 },
  { name: 'Problems', slaMet: 100, slaMissed: 0 },
];

const Dashboard: React.FC<DashboardProps> = ({ currentUser }) => {
  const isAgent = currentUser.role === 'agent';

  if (!isAgent) {
      return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {currentUser.name}</h1>
            <p className="text-gray-400 mb-8">Here is an overview of your requests and assets.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card title="My Open Tickets" value="2" icon={<IncidentIcon />} trend="Waiting for support" />
                <Card title="My Assets" value="3" icon={<AssetIcon />} trend="Devices assigned to you" />
                <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700/50 flex flex-col justify-center items-center text-center cursor-pointer hover:border-red-500 transition-colors">
                    <div className="bg-red-600/20 text-red-500 p-4 rounded-full mb-3">
                         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Report an Issue</h3>
                    <p className="text-gray-400 text-sm mt-1">Submit a new incident ticket</p>
                </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700/50">
                <h2 className="text-xl font-semibold text-white mb-4">My Recent Tickets</h2>
                <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-gray-600 text-gray-400">
                    <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Description</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Updated</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="border-b border-gray-700/50 hover:bg-gray-800/50">
                        <td className="p-3 text-red-500 font-mono">INC001002</td>
                        <td className="p-3">Cannot print to 3rd floor printer</td>
                        <td className="p-3"><span className="bg-purple-500 text-white px-2 py-1 rounded text-xs">In Progress</span></td>
                        <td className="p-3 text-gray-400">Today, 09:45</td>
                    </tr>
                    <tr className="hover:bg-gray-800/50">
                        <td className="p-3 text-red-500 font-mono">INC001006</td>
                        <td className="p-3">Laptop screen is flickering</td>
                        <td className="p-3"><span className="bg-gray-500 text-white px-2 py-1 rounded text-xs">On Hold</span></td>
                        <td className="p-3 text-gray-400">Yesterday, 15:30</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
      )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Executive Dashboard</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Open Incidents" value="42" icon={<IncidentIcon />} trend="+5 this week" />
        <Card title="Unassigned Problems" value="8" icon={<ProblemIcon />} trend="-2 this week" />
        <Card title="Changes Awaiting Approval" value="15" icon={<ChangeIcon />} trend="+3 this week" />
        <Card title="Assets Nearing EOL" value="128" icon={<AssetIcon />} trend="+10 this week" />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700/50">
          <h2 className="text-xl font-semibold text-white mb-4">SLA Compliance (%)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={slaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
              <XAxis dataKey="name" stroke="#A0AEC0" />
              <YAxis stroke="#A0AEC0" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #4A5568' }}
                labelStyle={{ color: '#E2E8F0' }}
              />
              <Legend />
              <Bar dataKey="slaMet" stackId="a" fill="#E53E3E" name="Met" />
              <Bar dataKey="slaMissed" stackId="a" fill="#718096" name="Missed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">Critical Open Incidents</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-600 text-gray-400">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Assigned To</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700/50 hover:bg-gray-800/50">
                    <td className="p-3 text-red-500 font-mono">INC001001</td>
                    <td className="p-3">Email server is down</td>
                    <td className="p-3">Network Team</td>
                  </tr>
                  <tr className="border-b border-gray-700/50 hover:bg-gray-800/50">
                    <td className="p-3 text-red-500 font-mono">INC001003</td>
                    <td className="p-3">CRM application unresponsive</td>
                    <td className="p-3">Application Support</td>
                  </tr>
                  <tr className="hover:bg-gray-800/50">
                    <td className="p-3 text-red-500 font-mono">INC001005</td>
                    <td className="p-3">Main database connection failing</td>
                    <td className="p-3">DBA Team</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
