import React from 'react';
import type { ChangeRequest } from '../types';

const changes: ChangeRequest[] = [
  { id: 'CHG001', shortDescription: 'Upgrade production database server', type: 'Normal', status: 'Approved', assignedTo: 'DBA Team', plannedStartDate: '2024-08-05' },
  { id: 'CHG002', shortDescription: 'Apply security patch to web servers', type: 'Standard', status: 'In Progress', assignedTo: 'SysAdmin Team', plannedStartDate: '2024-08-01' },
  { id: 'CHG003', shortDescription: 'Emergency fix for CRM outage', type: 'Emergency', status: 'Completed', assignedTo: 'Application Support', plannedStartDate: '2024-07-28' },
  { id: 'CHG004', shortDescription: 'Deploy new marketing website feature', type: 'Normal', status: 'Pending', assignedTo: 'DevOps Team', plannedStartDate: '2024-08-10' },
  { id: 'CHG005', shortDescription: 'Replace failing network switch in London office', type: 'Normal', status: 'Approved', assignedTo: 'Network Team', plannedStartDate: '2024-08-12' },
  { id: 'CHG006', shortDescription: 'Onboard new finance department employees', type: 'Standard', status: 'Rejected', assignedTo: 'Service Desk', plannedStartDate: '2024-07-30' },
];

const StatusBadge: React.FC<{ status: 'Pending' | 'Approved' | 'In Progress' | 'Completed' | 'Rejected' }> = ({ status }) => {
    const styles = {
        'Pending': 'bg-yellow-500 text-black',
        'Approved': 'bg-blue-500 text-white',
        'In Progress': 'bg-purple-500 text-white',
        'Completed': 'bg-green-600 text-white',
        'Rejected': 'bg-gray-500 text-white',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${styles[status]}`}>{status}</span>;
}

const ChangeManagement: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Change Management</h1>
        <button className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            New Change Request
        </button>
      </div>
      
      <div className="bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-700/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="border-b border-gray-600 text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">Number</th>
                <th className="p-4">Short Description</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4">Assigned To</th>
                <th className="p-4">Planned Start Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {changes.map((change) => (
                <tr key={change.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 font-mono text-red-400 hover:underline cursor-pointer">{change.id}</td>
                  <td className="p-4 text-white">{change.shortDescription}</td>
                  <td className="p-4">{change.type}</td>
                  <td className="p-4"><StatusBadge status={change.status} /></td>
                  <td className="p-4">{change.assignedTo}</td>
                  <td className="p-4">{change.plannedStartDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChangeManagement;