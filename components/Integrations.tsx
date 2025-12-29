
import React from 'react';
import Card from './Card';

const Integrations: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Multi-Channel Integrations</h1>
      <Card title="Module Under Construction" value="" icon={<div />} trend="">
        <p className="text-gray-300 mt-4">This module for managing integrations with various communication channels is currently being developed.</p>
        <p className="text-gray-300 mt-2">Planned integrations include:</p>
        <ul className="list-disc list-inside text-gray-400 mt-2">
            <li><strong>Email:</strong> Automatically create incidents from incoming emails.</li>
            <li><strong>Web Portal:</strong> A self-service portal for users.</li>
            <li><strong>Phone:</strong> CTI integration for call centers.</li>
            <li><strong>WhatsApp/Messaging:</strong> Conversational ticketing and support.</li>
            <li><strong>Monitoring Tools:</strong> Create alerts from systems like Datadog, Splunk, etc.</li>
        </ul>
      </Card>
    </div>
  );
};

export default Integrations;
