
import React, { useState } from 'react';
import type { User, UserRole, ResolverGroup } from '../types';

const initialUsers: User[] = [
    { id: 'USR001', name: 'Admin User', email: 'admin@example.com', role: 'admin', groups: ['System Administrators'] },
    { id: 'USR002', name: 'John Doe', email: 'john@example.com', role: 'agent', groups: ['Network Team'] },
    { id: 'USR003', name: 'Jane Smith', email: 'jane@example.com', role: 'customer' },
    { id: 'USR004', name: 'Vendor Support', email: 'support@globalisp.com', role: 'vendor', groups: ['GlobalISP'] },
];

const initialGroups: ResolverGroup[] = [
    { id: 'GRP001', name: 'Service Desk', description: 'L1 Support', lead: 'Sarah Connor' },
    { id: 'GRP002', name: 'Network Team', description: 'Network Infrastructure', lead: 'John Doe' },
    { id: 'GRP003', name: 'Database Admins', description: 'DB Maintenance', lead: 'Oracle Jones' },
    { id: 'GRP004', name: 'GlobalISP', description: '3rd Party Internet Vendor', lead: 'Vendor Support' },
    { id: 'GRP005', name: 'System Administrators', description: 'Platform Admins', lead: 'Admin User' },
];

const Administration: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'users' | 'groups' | 'roles'>('users');
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [groups, setGroups] = useState<ResolverGroup[]>(initialGroups);

    // User Modal State
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [userFormData, setUserFormData] = useState<Partial<User>>({});

    // User Handlers
    const handleAddUser = () => {
        setEditingUser(null);
        setUserFormData({ role: 'agent', groups: [] });
        setIsUserModalOpen(true);
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setUserFormData({ ...user });
        setIsUserModalOpen(true);
    };

    const handleDeleteUser = (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(u => u.id !== userId));
        }
    };

    const handleUserFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGroupToggle = (groupName: string) => {
        const currentGroups = userFormData.groups || [];
        const newGroups = currentGroups.includes(groupName)
            ? currentGroups.filter(g => g !== groupName)
            : [...currentGroups, groupName];
        setUserFormData(prev => ({ ...prev, groups: newGroups }));
    };

    const handleSaveUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userFormData.name || !userFormData.email) return;

        if (editingUser) {
            // Update existing
            setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userFormData } as User : u));
        } else {
            // Create new
            const newUser: User = {
                id: `USR${Date.now()}`,
                name: userFormData.name!,
                email: userFormData.email!,
                role: userFormData.role as UserRole || 'customer',
                groups: userFormData.groups || [],
                avatar: `https://ui-avatars.com/api/?name=${userFormData.name}&background=${userFormData.role === 'agent' ? 'EF4444' : '3B82F6'}&color=fff`
            };
            setUsers([...users, newUser]);
        }
        setIsUserModalOpen(false);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">System Administration</h1>
            
            {/* Tabs */}
            <div className="flex border-b border-gray-700 mb-6">
                <button 
                    onClick={() => setActiveTab('users')}
                    className={`pb-4 px-6 text-sm font-medium transition-colors ${activeTab === 'users' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
                >
                    Users & Vendors
                </button>
                <button 
                    onClick={() => setActiveTab('groups')}
                    className={`pb-4 px-6 text-sm font-medium transition-colors ${activeTab === 'groups' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
                >
                    Resolver Groups
                </button>
                <button 
                    onClick={() => setActiveTab('roles')}
                    className={`pb-4 px-6 text-sm font-medium transition-colors ${activeTab === 'roles' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}
                >
                    Access Control (RBAC)
                </button>
            </div>

            {/* Tab Content */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700/50">
                
                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">User Management</h2>
                            <button 
                                onClick={handleAddUser}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-bold flex items-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                Add User
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-300">
                                <thead className="bg-gray-800 text-gray-400 uppercase font-medium">
                                    <tr>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Email</th>
                                        <th className="p-3">Role</th>
                                        <th className="p-3">Groups</th>
                                        <th className="p-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {users.map(user => (
                                        <tr key={user.id} className="hover:bg-gray-800/50">
                                            <td className="p-3 font-medium text-white flex items-center">
                                                <img src={user.avatar} alt="" className="w-6 h-6 rounded-full mr-2" />
                                                {user.name}
                                            </td>
                                            <td className="p-3">{user.email}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase 
                                                    ${user.role === 'admin' ? 'bg-purple-900 text-purple-300' : 
                                                      user.role === 'agent' ? 'bg-blue-900 text-blue-300' : 
                                                      user.role === 'vendor' ? 'bg-orange-900 text-orange-300' : 'bg-gray-700 text-gray-300'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="p-3 text-xs">{user.groups?.join(', ') || '-'}</td>
                                            <td className="p-3 text-right">
                                                <button onClick={() => handleEditUser(user)} className="text-blue-400 hover:text-blue-300 font-medium mr-3">Edit</button>
                                                <button onClick={() => handleDeleteUser(user.id)} className="text-red-400 hover:text-red-300 font-medium">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Groups Tab */}
                {activeTab === 'groups' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">Resolver Groups</h2>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-bold">New Group</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-300">
                                <thead className="bg-gray-800 text-gray-400 uppercase font-medium">
                                    <tr>
                                        <th className="p-3">Group Name</th>
                                        <th className="p-3">Description</th>
                                        <th className="p-3">Team Lead</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {groups.map(group => (
                                        <tr key={group.id} className="hover:bg-gray-800/50">
                                            <td className="p-3 font-medium text-white">{group.name}</td>
                                            <td className="p-3">{group.description}</td>
                                            <td className="p-3">{group.lead}</td>
                                            <td className="p-3">
                                                <button className="text-blue-400 hover:underline">Members</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Roles Tab (RBAC Matrix) */}
                {activeTab === 'roles' && (
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">Role-Based Access Control (RBAC) Definitions</h2>
                        <p className="text-gray-400 mb-6">
                            Define privileges for each user role in accordance with ITIL best practices.
                        </p>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-center text-sm border border-gray-700">
                                <thead className="bg-gray-800 text-gray-400 font-medium">
                                    <tr>
                                        <th className="p-4 text-left">Permission / Feature</th>
                                        <th className="p-4 w-32 bg-purple-900/20 text-purple-300">Admin</th>
                                        <th className="p-4 w-32 bg-blue-900/20 text-blue-300">Agent</th>
                                        <th className="p-4 w-32 bg-gray-700/20 text-gray-300">Customer</th>
                                        <th className="p-4 w-32 bg-orange-900/20 text-orange-300">Vendor</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700 text-gray-300">
                                    <tr>
                                        <td className="p-3 text-left pl-4">Create Incidents</td>
                                        <td className="p-3 text-green-500">✓</td>
                                        <td className="p-3 text-green-500">✓</td>
                                        <td className="p-3 text-green-500">✓</td>
                                        <td className="p-3 text-red-500">✗</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 text-left pl-4">Edit Incidents (Assigned)</td>
                                        <td className="p-3 text-green-500">✓</td>
                                        <td className="p-3 text-green-500">✓</td>
                                        <td className="p-3 text-red-500">✗</td>
                                        <td className="p-3 text-green-500">✓</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 text-left pl-4">Assign/Reassign Groups</td>
                                        <td className="p-3 text-green-500">✓</td>
                                        <td className="p-3 text-green-500">✓</td>
                                        <td className="p-3 text-red-500">✗</td>
                                        <td className="p-3 text-red-500">✗</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 text-left pl-4">Close Incidents</td>
                                        <td className="p-3 text-green-500">✓</td>
                                        <td className="p-3 text-green-500">✓</td>
                                        <td className="p-3 text-green-500">✓ (Self)</td>
                                        <td className="p-3 text-red-500">✗</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 text-left pl-4">Define SLAs</td>
                                        <td className="p-3 text-green-500">✓</td>
                                        <td className="p-3 text-red-500">✗</td>
                                        <td className="p-3 text-red-500">✗</td>
                                        <td className="p-3 text-red-500">✗</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 text-left pl-4">Manage Users & Groups</td>
                                        <td className="p-3 text-green-500">✓</td>
                                        <td className="p-3 text-red-500">✗</td>
                                        <td className="p-3 text-red-500">✗</td>
                                        <td className="p-3 text-red-500">✗</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 text-left pl-4">View Analytics</td>
                                        <td className="p-3 text-green-500">✓</td>
                                        <td className="p-3 text-green-500">✓</td>
                                        <td className="p-3 text-red-500">✗</td>
                                        <td className="p-3 text-red-500">✗</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* User Edit/Add Modal */}
            {isUserModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-lg overflow-hidden animate-fade-in">
                        <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-800">
                            <h3 className="text-xl font-bold text-white">{editingUser ? 'Edit User' : 'Add New User'}</h3>
                            <button onClick={() => setIsUserModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <form onSubmit={handleSaveUser} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={userFormData.name || ''}
                                    onChange={handleUserFormChange}
                                    className="w-full bg-gray-900 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700"
                                    placeholder="e.g. Alice Wonderland"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={userFormData.email || ''}
                                    onChange={handleUserFormChange}
                                    className="w-full bg-gray-900 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700"
                                    placeholder="e.g. alice@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                                <select 
                                    name="role"
                                    value={userFormData.role || 'customer'}
                                    onChange={handleUserFormChange}
                                    className="w-full bg-gray-900 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700"
                                >
                                    <option value="customer">Customer</option>
                                    <option value="agent">Agent</option>
                                    <option value="admin">Admin</option>
                                    <option value="vendor">Vendor</option>
                                </select>
                            </div>
                            
                            {(userFormData.role === 'agent' || userFormData.role === 'admin' || userFormData.role === 'vendor') && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Resolver Groups</label>
                                    <div className="bg-gray-900 rounded-lg border border-gray-700 p-3 max-h-32 overflow-y-auto space-y-2">
                                        {groups.map(group => (
                                            <label key={group.id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-800 p-1 rounded">
                                                <input 
                                                    type="checkbox" 
                                                    checked={(userFormData.groups || []).includes(group.name)}
                                                    onChange={() => handleGroupToggle(group.name)}
                                                    className="form-checkbox h-4 w-4 text-red-600 rounded focus:ring-red-500 bg-gray-700 border-gray-600"
                                                />
                                                <span className="text-sm text-gray-300">{group.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end pt-4 gap-3">
                                <button 
                                    type="button" 
                                    onClick={() => setIsUserModalOpen(false)} 
                                    className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-bold shadow-lg shadow-red-600/20 transition-all"
                                >
                                    {editingUser ? 'Save Changes' : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Administration;
