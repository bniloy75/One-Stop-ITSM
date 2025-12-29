
import React from 'react';
import Card from './Card';

const VendorManagement: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Vendor Management</h1>
      <Card title="Module Under Construction" value="" icon={<div />} trend="">
        <p className="text-gray-300 mt-4">The Vendor Management module, for managing third-party vendor information, contracts, and performance, is in development.</p>
        <p className="text-gray-300 mt-2">Features will include:</p>
        <ul className="list-disc list-inside text-gray-400 mt-2">
            <li>Vendor Information Repository</li>
            <li>Contract Management and Renewals</li>
            <li>Vendor Performance Scorecards</li>
            <li>Integration with Asset and Service Level Management</li>
        </ul>
      </Card>
    </div>
  );
};

export default VendorManagement;
