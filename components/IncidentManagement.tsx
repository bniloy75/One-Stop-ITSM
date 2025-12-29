
import React, { useState } from 'react';
import type { Incident, User } from '../types';
import { IncidentStatus, PriorityLevel } from '../types';
import IncidentForm from './IncidentForm';

interface IncidentManagementProps {
    currentUser: User;
}

const initialIncidents: Incident[] = [
  { 
      id: 'INC001001', 
      shortDescription: 'Email server is down', 
      caller: 'John Doe', 
      assignmentGroup: 'Network Team', 
      status: IncidentStatus.NEW, 
      priority: PriorityLevel.CRITICAL, 
      updated: '2024-07-29 10:00',
      activityLog: [
          { id: '1', timestamp: '2024-07-29 10:00', user: 'John Doe', type: 'system', message: 'Incident created' }
      ]
  },
  { 
      id: 'INC001002', 
      shortDescription: 'Cannot print to 3rd floor printer', 
      caller: 'Jane Smith', 
      assignmentGroup: 'Service Desk', 
      status: IncidentStatus.IN_PROGRESS, 
      priority: PriorityLevel.MODERATE, 
      updated: '2024-07-29 09:45',
      activityLog: [
          { id: '1', timestamp: '2024-07-29 09:30', user: 'Jane Smith', type: 'system', message: 'Incident created' },
          { id: '2', timestamp: '2024-07-29 09:45', user: 'Admin User', type: 'system', message: 'Status changed to In Progress' }
      ]
  },
  { 
      id: 'INC001003', 
      shortDescription: 'CRM application unresponsive', 
      caller: 'Peter Jones', 
      assignmentGroup: 'Application Support', 
      status: IncidentStatus.NEW, 
      priority: PriorityLevel.CRITICAL, 
      updated: '2024-07-29 09:30',
      activityLog: [
          { id: '1', timestamp: '2024-07-29 09:30', user: 'Peter Jones', type: 'system', message: 'Incident created' }
      ]
  },
  { 
      id: 'INC001004', 
      shortDescription: 'Password reset for new hire', 
      caller: 'HR Bot', 
      assignmentGroup: 'Service Desk', 
      status: IncidentStatus.RESOLVED, 
      priority: PriorityLevel.LOW, 
      updated: '2024-07-29 09:15',
      resolutionCode: 'Solved (Permanently)',
      resolutionNotes: 'Password reset via AD tool.',
      activityLog: [
          { id: '1', timestamp: '2024-07-29 09:00', user: 'HR Bot', type: 'system', message: 'Incident created' },
          { id: '2', timestamp: '2024-07-29 09:15', user: 'Admin User', type: 'resolution', message: 'Incident Resolved: Password reset via AD tool.' }
      ]
  },
  { 
      id: 'INC001005', 
      shortDescription: 'Main database connection failing', 
      caller: 'System Alert', 
      assignmentGroup: 'DBA Team', 
      status: IncidentStatus.IN_PROGRESS, 
      priority: PriorityLevel.CRITICAL, 
      updated: '2024-07-29 09:00',
      activityLog: [
          { id: '1', timestamp: '2024-07-29 09:00', user: 'System Alert', type: 'system', message: 'Incident created via Monitoring' }
      ]
  },
  { 
      id: 'INC001006', 
      shortDescription: 'Laptop screen is flickering', 
      caller: 'Jane Smith', 
      assignmentGroup: 'Hardware Support', 
      status: IncidentStatus.ON_HOLD, 
      priority: PriorityLevel.MODERATE, 
      updated: '2024-07-28 15:30',
      activityLog: [
          { id: '1', timestamp: '2024-07-28 15:00', user: 'Jane Smith', type: 'system', message: 'Incident created' },
          { id: '2', timestamp: '2024-07-28 15:30', user: 'Admin User', type: 'system', message: 'Status changed to On Hold. Waiting for parts.' }
      ]
  },
];

const PriorityBadge: React.FC<{ priority: PriorityLevel }> = ({ priority }) => {
    const styles = {
        [PriorityLevel.CRITICAL]: 'bg-red-500 text-white',
        [PriorityLevel.HIGH]: 'bg-orange-500 text-white',
        [PriorityLevel.MODERATE]: 'bg-yellow-500 text-black',
        [PriorityLevel.LOW]: 'bg-green-500 text-white',
    };
    const text = {
        [PriorityLevel.CRITICAL]: '1 - Critical',
        [PriorityLevel.HIGH]: '2 - High',
        [PriorityLevel.MODERATE]: '3 - Moderate',
        [PriorityLevel.LOW]: '4 - Low',
    }
    return <span className={`px-2 py-1 text-xs font-bold rounded-full ${styles[priority]}`}>{text[priority]}</span>;
}

const StatusBadge: React.FC<{ status: IncidentStatus }> = ({ status }) => {
    const styles = {
        [IncidentStatus.NEW]: 'bg-blue-500 text-white',
        [IncidentStatus.IN_PROGRESS]: 'bg-purple-500 text-white',
        [IncidentStatus.ON_HOLD]: 'bg-gray-500 text-white',
        [IncidentStatus.RESOLVED]: 'bg-green-600 text-white',
        [IncidentStatus.CLOSED]: 'bg-gray-700 text-gray-300',
    };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${styles[status]}`}>{status}</span>;
}


const IncidentManagement: React.FC<IncidentManagementProps> = ({ currentUser }) => {
    const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
    const [view, setView] = useState<'list' | 'form'>('list');
    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

    const displayIncidents = currentUser.role === 'customer' 
        ? incidents.filter(i => i.caller === currentUser.name)
        : incidents;

    const handleNewIncident = () => {
        setSelectedIncident(null);
        setView('form');
    };

    const handleEditIncident = (incident: Incident) => {
        setSelectedIncident(incident);
        setView('form');
    };
    
    const handleSaveIncident = (incidentData: any, comment?: string) => {
        const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
        const userName = currentUser.name;

        if (selectedIncident) {
            // Update existing incident
            const updatedLog = [...selectedIncident.activityLog];
            
            // Check for changes to generate system logs
            if (incidentData.status !== selectedIncident.status) {
                updatedLog.push({
                    id: Date.now().toString() + '1',
                    timestamp,
                    user: userName,
                    type: incidentData.status === IncidentStatus.RESOLVED ? 'resolution' : 'system',
                    message: `Status changed from ${selectedIncident.status} to ${incidentData.status}`
                });
            }
            if (incidentData.assignmentGroup !== selectedIncident.assignmentGroup) {
                 updatedLog.push({
                    id: Date.now().toString() + '2',
                    timestamp,
                    user: userName,
                    type: 'system',
                    message: `Assignment Group changed to ${incidentData.assignmentGroup || 'Unassigned'}`
                });
            }
            if (incidentData.priority !== selectedIncident.priority) {
                 updatedLog.push({
                    id: Date.now().toString() + '3',
                    timestamp,
                    user: userName,
                    type: 'system',
                    message: `Priority changed`
                });
            }
            // Add user comment if present
            if (comment) {
                updatedLog.push({
                    id: Date.now().toString() + '4',
                    timestamp,
                    user: userName,
                    type: 'comment',
                    message: comment
                });
            }

            const updatedIncident = { 
                ...selectedIncident, 
                ...incidentData, 
                updated: timestamp,
                activityLog: updatedLog.sort((a, b) => b.timestamp.localeCompare(a.timestamp)) // Newest first
            };
            setIncidents(incidents.map(i => i.id === updatedIncident.id ? updatedIncident : i));
        } else {
            // Create new incident
            const newIncident: Incident = {
                ...incidentData,
                id: `INC${String(Math.floor(Math.random() * 900000) + 100000)}`,
                updated: timestamp,
                caller: currentUser.role === 'customer' ? currentUser.name : incidentData.caller,
                activityLog: [
                    {
                        id: Date.now().toString(),
                        timestamp,
                        user: userName,
                        type: 'system',
                        message: 'Incident created'
                    },
                    ...(comment ? [{
                        id: Date.now().toString() + '2',
                        timestamp,
                        user: userName,
                        type: 'comment',
                        message: comment
                    } as any] : [])
                ]
            };
            setIncidents([newIncident, ...incidents]);
        }
        setView('list');
        setSelectedIncident(null);
    };

    const handleCancel = () => {
        setView('list');
        setSelectedIncident(null);
    };

  return (
    <div>
        {view === 'list' ? (
            <>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        {currentUser.role === 'customer' ? 'My Incidents' : 'Incident Management'}
                    </h1>
                    <button onClick={handleNewIncident} className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        {currentUser.role === 'customer' ? 'Report Issue' : 'New Incident'}
                    </button>
                </div>
                
                <div className="bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-700/50">
                    <div className="overflow-x-auto">
                    {displayIncidents.length > 0 ? (
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="border-b border-gray-600 text-gray-400 uppercase tracking-wider">
                            <tr>
                                <th className="p-4">Number</th>
                                <th className="p-4">Priority</th>
                                <th className="p-4">Short Description</th>
                                <th className="p-4">Caller</th>
                                <th className="p-4">Assignment Group</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Updated</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700/50">
                            {displayIncidents.map((incident) => (
                                <tr key={incident.id} className="hover:bg-gray-800/50 transition-colors">
                                <td className="p-4 font-mono text-red-400">
                                    <button onClick={() => handleEditIncident(incident)} className="hover:underline">
                                        {incident.id}
                                    </button>
                                </td>
                                <td className="p-4"><PriorityBadge priority={incident.priority} /></td>
                                <td className="p-4 text-white max-w-xs truncate" title={incident.shortDescription}>{incident.shortDescription}</td>
                                <td className="p-4">{incident.caller}</td>
                                <td className="p-4">{incident.assignmentGroup}</td>
                                <td className="p-4"><StatusBadge status={incident.status} /></td>
                                <td className="p-4">{incident.updated}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            No incidents found. {currentUser.role === 'customer' ? 'Great news!' : ''}
                        </div>
                    )}
                    </div>
                </div>
            </>
        ) : (
            <IncidentForm 
                incident={selectedIncident} 
                onSave={handleSaveIncident} 
                onCancel={handleCancel}
                currentUser={currentUser}
            />
        )}
    </div>
  );
};

export default IncidentManagement;
