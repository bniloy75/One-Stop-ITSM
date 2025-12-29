
import React, { useState, useEffect } from 'react';
import type { Incident, User } from '../types';
import { IncidentStatus, PriorityLevel } from '../types';

interface IncidentFormProps {
  incident: Incident | null;
  onSave: (incidentData: Omit<Incident, 'id' | 'updated' | 'activityLog'>, comment?: string) => void;
  onCancel: () => void;
  currentUser: User;
}

const FormInput: React.FC<{ label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required?: boolean }> = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input 
            type="text" 
            id={props.name}
            className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700"
            {...props}
        />
    </div>
);

const FormSelect: React.FC<{ label: string, name: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, children: React.ReactNode }> = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <select 
            id={props.name}
            className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700"
            {...props}
        />
    </div>
);


const IncidentForm: React.FC<IncidentFormProps> = ({ incident, onSave, onCancel, currentUser }) => {
    const [formData, setFormData] = useState({
        shortDescription: '',
        description: '',
        caller: '',
        assignmentGroup: '',
        status: IncidentStatus.NEW,
        priority: PriorityLevel.LOW,
        resolutionCode: '',
        resolutionNotes: '',
    });
    const [comment, setComment] = useState('');
    
    useEffect(() => {
        if (incident) {
            setFormData({
                shortDescription: incident.shortDescription,
                description: incident.description || '',
                caller: incident.caller,
                assignmentGroup: incident.assignmentGroup,
                status: incident.status,
                priority: incident.priority,
                resolutionCode: incident.resolutionCode || '',
                resolutionNotes: incident.resolutionNotes || '',
            });
        } else {
             setFormData({
                shortDescription: '',
                description: '',
                caller: currentUser.role === 'customer' ? currentUser.name : '',
                assignmentGroup: '',
                status: IncidentStatus.NEW,
                priority: PriorityLevel.LOW,
                resolutionCode: '',
                resolutionNotes: '',
            });
        }
        setComment('');
    }, [incident, currentUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ 
            ...formData, 
            priority: Number(formData.priority) as PriorityLevel 
        }, comment);
    };

    const isResolver = currentUser.role === 'agent' || currentUser.role === 'admin';
    const showResolution = formData.status === IncidentStatus.RESOLVED || formData.status === IncidentStatus.CLOSED;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-white mb-6">
                    {incident ? `Incident ${incident.id}` : 'Create New Incident'}
                </h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700/50">
                        <div className="space-y-6">
                            <FormInput 
                                label="Short Description"
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleChange}
                                required
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                <textarea 
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700"
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput 
                                    label="Caller"
                                    name="caller"
                                    value={formData.caller}
                                    onChange={handleChange}
                                    required
                                />
                                {isResolver && (
                                    <FormInput 
                                        label="Assignment Group"
                                        name="assignmentGroup"
                                        value={formData.assignmentGroup}
                                        onChange={handleChange}
                                    />
                                )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormSelect
                                    label="Priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                >
                                    {Object.entries(PriorityLevel).filter(([key]) => isNaN(Number(key))).map(([key, value]) => (
                                        <option key={value} value={value}>{key.charAt(0) + key.slice(1).toLowerCase()}</option>
                                    ))}
                                </FormSelect>
                                
                                {isResolver ? (
                                    <FormSelect
                                        label="Status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        {Object.values(IncidentStatus).map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </FormSelect>
                                ) : (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                                        <div className="px-3 py-2 bg-gray-800 rounded-lg text-gray-400 border border-gray-700">
                                            {formData.status}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {showResolution && (
                        <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700/50 border-l-4 border-l-green-600">
                             <h3 className="text-lg font-bold text-white mb-4">Resolution Information</h3>
                             <div className="space-y-4">
                                <FormSelect
                                    label="Resolution Code"
                                    name="resolutionCode"
                                    value={formData.resolutionCode}
                                    onChange={handleChange}
                                >
                                    <option value="">-- Select Code --</option>
                                    <option value="Solved (Permanently)">Solved (Permanently)</option>
                                    <option value="Solved (Work Around)">Solved (Work Around)</option>
                                    <option value="Not Solved (Not Reproducible)">Not Solved (Not Reproducible)</option>
                                    <option value="Third Party Resolved">Third Party Resolved</option>
                                </FormSelect>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Resolution Notes (Required)</label>
                                    <textarea 
                                        name="resolutionNotes"
                                        value={formData.resolutionNotes}
                                        onChange={handleChange}
                                        rows={3}
                                        required={showResolution}
                                        className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700"
                                        placeholder="Detailed steps taken to resolve the issue..."
                                    />
                                </div>
                             </div>
                        </div>
                    )}

                    <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700/50">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Work Notes / Comments</label>
                        <textarea 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={3}
                            placeholder="Add a comment or work note..."
                            className="w-full bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-700"
                        />
                    </div>

                    <div className="flex justify-end items-center gap-4">
                        <button type="button" onClick={onCancel} className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300">
                            Cancel
                        </button>
                        <button type="submit" className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300">
                            {incident ? 'Update Incident' : 'Submit Incident'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Activity Stream Side Panel */}
            {incident && (
                <div className="lg:col-span-1">
                     <h2 className="text-xl font-bold text-white mb-6">Activity Stream</h2>
                     <div className="bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-700/50 max-h-[800px] overflow-y-auto">
                        <div className="relative border-l-2 border-gray-700 ml-3 space-y-6">
                            {incident.activityLog?.sort((a,b) => b.timestamp.localeCompare(a.timestamp)).map((log) => (
                                <div key={log.id} className="mb-8 ml-6 relative">
                                    <span className={`absolute -left-9 flex items-center justify-center w-6 h-6 rounded-full ring-4 ring-gray-900 ${
                                        log.type === 'resolution' ? 'bg-green-500' :
                                        log.type === 'comment' ? 'bg-yellow-500' : 'bg-blue-500'
                                    }`}>
                                    </span>
                                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-semibold text-gray-200 text-sm">{log.user}</span>
                                            <span className="text-xs text-gray-500">{log.timestamp.split(' ')[1]}</span>
                                        </div>
                                        <p className="text-gray-400 text-sm">{log.message}</p>
                                        <p className="text-xs text-gray-600 mt-2">{log.timestamp.split(' ')[0]}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                     </div>
                </div>
            )}
        </div>
    );
};

export default IncidentForm;
