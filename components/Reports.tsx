
import React from 'react';
import Card from './Card';

const Reports: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Service Level Reports</h1>
      <Card title="Module Under Construction" value="" icon={<div />} trend="">
        <p className="text-gray-300 mt-4">The Reporting module, for generating and visualizing data from all ITSM processes, is currently in development.</p>
        <p className="text-gray-300 mt-2">Features will include:</p>
        <ul className="list-disc list-inside text-gray-400 mt-2">
            <li>Customizable Dashboards</li>
            <li>Scheduled Report Generation</li>
            <li>Performance Analytics and KPIs</li>
            <li>Exporting to various formats (PDF, CSV, etc.)</li>
        </ul>
      </Card>
    </div>
  );
};

export default Reports;
