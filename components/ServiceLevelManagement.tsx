
import React, { useState } from 'react';
import type { SLA } from '../types';
import Card from './Card';
import { SlaIcon, ReportIcon } from './icons/Icons';

const initialSLAs: SLA[] = [
  { id: 'SLA001', name: 'Priority 1 Resolution', type: 'SLA', duration: '4 Hours', condition: 'Priority is Critical', target: 99.0, actual: 98.2, status: 'Active' },
  { id: 'SLA002', name: 'Priority 2 Resolution', type: 'SLA', duration: '8 Hours', condition: 'Priority is High', target: 95.0, actual: 96.5, status: 'Active' },
  { id: 'SLA003', name: 'General Request Fulfillment', type: 'SLA', duration: '3 Business Days', condition: 'Type is Request', target: 90.0, actual: 94.2, status: 'Active' },
  { id: 'OLA001', name: 'Network Team Response', type: 'OLA', duration: '30 Minutes', condition: 'Assignment Group is Network', target: 98.0, actual: 99.1, status: 'Active' },
  { id: 'UPC001', name: 'ISP Availability', type: 'Underpinning Contract', duration: '99.9% Uptime', condition: 'Vendor is GlobalISP', target: 99.9, actual: 99.5, status: 'Active' },
  { id: 'SLA004', name: 'Password Reset', type: 'SLA', duration: '15 Minutes', condition: 'Category is Access', target: 95.0, actual: 92.0, status: 'Draft' },
];

const ProgressBar: React.FC<{ value: number; target: number }> = ({ value, target }) => {
    const isMeeting = value >= target;
    return (
        <div className="w-full max-w-xs">
            <div className="flex justify-between text-xs mb-1">
                <span className={isMeeting ? "text-green-400" : "text-red-400"}>{value}%</span>
                <span className="text-gray-500">Target: {target}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                    className={`h-2 rounded-full ${isMeeting ? 'bg-green-500' : 'bg-red-500'}`} 
                    style={{ width: `${Math.min(value, 100)}%` }}
                ></div>
            </div>
        </div>
    );
};

const StatusBadge: React.FC<{ status: SLA['status'] }> = ({ status }) => {
    const styles = {
        'Active': 'bg-green-900/50 text-green-400 border border-green-500/30',
        'Retired': 'bg-gray-700/50 text-gray-400 border border-gray-600',
        'Draft': 'bg-yellow-900/50 text-yellow-400 border border-yellow-500/30',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${styles[status]}`}>{status}</span>;
};

const ServiceLevelManagement: React.FC = () => {
  const [slas, setSLAs] = useState<SLA[]>(initialSLAs);
  const [view, setView] = useState<'list' | 'form'>('list');
  const [formData, setFormData] = useState<Partial<SLA>>({
      name: '',
      type: 'SLA',
      duration: '',
      condition: '',
      target: 95.0,
      status: 'Draft'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newSLA: SLA = {
          id: `SLA${String(Math.floor(Math.random() * 9000) + 1000)}`,
          name: formData.name || 'New SLA',
          type: formData.type as SLA['type'],
          duration: formData.duration || '24 Hours',
          condition: formData.condition || 'None',
          target: Number(formData.target),
          actual: 0, // New SLAs start with 0 actual data
          status: formData.status as SLA['status'],
      };
      setSLAs([...slas, newSLA]);
      setView('list');
      setFormData({ name: '', type: 'SLA', duration: '', condition: '', target: 95.0, status: 'Draft' });
  };

  // KPI Calculations
  const activeSLAs = slas.filter(s => s.status === 'Active');
  const avgCompliance = (activeSLAs.reduce((acc, curr) => acc + curr.actual, 0) / (activeSLAs.length || 1)).toFixed(1);
  const breachedCount = activeSLAs.filter(s => s.actual < s.target).length;

  return (
    <div>
      {view === 'list' ? (
        <>
            <h1 className="text-3xl font-bold text-white mb-6">Service Level Management</h1>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card 
                    title="Overall Compliance" 
                    value={`${avgCompliance}%`} 
                    icon={<SlaIcon />} 
                    trend={Number(avgCompliance) > 95 ? "Meeting Targets" : "Needs Attention"} 
                />
                <Card 
                    title="Active Definitions" 
                    value={activeSLAs.length.toString()} 
                    icon={<div className="text-blue-400 font-bold text-xl">#</div>} 
                    trend="SLAs, OLAs, Contracts" 
                />
                 <Card 
                    title="At Risk / Breached" 
                    value={breachedCount.toString()} 
                    icon={<div className="text-red-500 font-bold text-xl">!</div>} 
                    trend="Requires Remediation" 
                />
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">SLA Definitions</h2>
                <button 
                    onClick={() => setView('form')}
                    className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 flex items-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    New Definition
                </button>
            </div>

            <div className="bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-700/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="border-b border-gray-600 text-gray-400 uppercase tracking-wider">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Duration</th>
                                <th className="p-4">Condition</th>
                                <th className="p-4">Performance (Actual vs Target)</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700/50">
                            {slas.map((sla) => (
                                <tr key={sla.id} className="hover:bg-gray-800/50 transition-colors">
                                    <td className="p-4 font-medium text-white">{sla.name}</td>
                                    <td className="p-4">{sla.type}</td>
                                    <td className="p-4 font-mono text-gray-300">{sla.duration}</td>
                                    <td className="p-4 text-gray-400 italic">{sla.condition}</td>
                                    <td className="p-4">
                                        <ProgressBar value={sla.actual} target={sla.target} />
                                    </td>
                                    <td className="p-4">
                                        <StatusBadge status={sla.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
      ) : (
        <>
            <h1 className="text-3xl font-bold text-white mb-6">Create New SLA Definition</h1>
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700/50 max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700"
                            placeholder="e.g., Priority 1 Response Time"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
                            <select 
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700"
                            >
                                <option value="SLA">SLA (Service Level Agreement)</option>
                                <option value="OLA">OLA (Operational Level Agreement)</option>
                                <option value="Underpinning Contract">Underpinning Contract</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                            <select 
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700"
                            >
                                <option value="Draft">Draft</option>
                                <option value="Active">Active</option>
                                <option value="Retired">Retired</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Duration Goal</label>
                            <input 
                                type="text" 
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                                required
                                placeholder="e.g., 4 Hours"
                                className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Target Compliance (%)</label>
                            <input 
                                type="number" 
                                name="target"
                                value={formData.target}
                                onChange={handleInputChange}
                                min="0" max="100" step="0.1"
                                className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Start Condition</label>
                        <input 
                            type="text" 
                            name="condition"
                            value={formData.condition}
                            onChange={handleInputChange}
                            placeholder="e.g., Priority is Critical AND Status is New"
                            className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700"
                        />
                    </div>

                    <div className="flex justify-end items-center gap-4 pt-4 border-t border-gray-700">
                        <button 
                            type="button" 
                            onClick={() => setView('list')} 
                            className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                        >
                            Save Definition
                        </button>
                    </div>
                </form>
            </div>
        </>
      )}
    </div>
  );
};

export default ServiceLevelManagement;
