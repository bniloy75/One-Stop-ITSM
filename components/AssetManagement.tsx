import React from 'react';
import type { Asset } from '../types';

const assets: Asset[] = [
  { id: 'ASSET001', name: 'Dell Latitude 7420', category: 'Laptop', assignedTo: 'John Doe', status: 'In Use', purchaseDate: '2023-01-15' },
  { id: 'ASSET002', name: 'HP LaserJet Pro M404dn', category: 'Printer', assignedTo: '3rd Floor Office', status: 'In Use', purchaseDate: '2022-11-20' },
  { id: 'ASSET003', name: 'Apple MacBook Pro 16"', category: 'Laptop', assignedTo: 'Jane Smith', status: 'In Use', purchaseDate: '2023-03-10' },
  { id: 'ASSET004', name: 'Cisco Catalyst 9300', category: 'Network Switch', assignedTo: 'Data Center Rack 5', status: 'In Use', purchaseDate: '2022-09-01' },
  { id: 'ASSET005', name: 'Dell UltraSharp U2721DE', category: 'Monitor', assignedTo: 'John Doe', status: 'In Stock', purchaseDate: '2023-01-15' },
  { id: 'ASSET006', name: 'Adobe Creative Cloud', category: 'Software', assignedTo: 'Marketing Team', status: 'In Use', purchaseDate: '2024-01-01' },
  { id: 'ASSET007', name: 'Lenovo ThinkPad X1', category: 'Laptop', assignedTo: '', status: 'Retired', purchaseDate: '2020-05-20' },
];

const StatusBadge: React.FC<{ status: 'In Use' | 'In Stock' | 'Retired' }> = ({ status }) => {
    const styles = {
        'In Use': 'bg-green-500 text-white',
        'In Stock': 'bg-blue-500 text-white',
        'Retired': 'bg-gray-500 text-white',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${styles[status]}`}>{status}</span>;
}

const AssetManagement: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Asset Management</h1>
        <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            New Asset
        </button>
      </div>
      
      <div className="bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-700/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="border-b border-gray-600 text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">Asset ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Assigned To</th>
                <th className="p-4">Status</th>
                <th className="p-4">Purchase Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 font-mono text-red-400 hover:underline cursor-pointer">{asset.id}</td>
                  <td className="p-4 text-white">{asset.name}</td>
                  <td className="p-4">{asset.category}</td>
                  <td className="p-4">{asset.assignedTo || 'N/A'}</td>
                  <td className="p-4"><StatusBadge status={asset.status} /></td>
                  <td className="p-4">{asset.purchaseDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetManagement;