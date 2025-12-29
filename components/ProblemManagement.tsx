
import React from 'react';
import Card from './Card';

const ProblemManagement: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Problem Management</h1>
      <Card title="Module Under Construction" value="" icon={<div />} trend="">
        <p className="text-gray-300 mt-4">The Problem Management module, aimed at identifying and resolving the root causes of incidents, is currently in development.</p>
        <p className="text-gray-300 mt-2">Features will include:</p>
        <ul className="list-disc list-inside text-gray-400 mt-2">
            <li>Problem Identification from Incidents</li>
            <li>Root Cause Analysis (RCA) Workflows</li>
            <li>Known Error Database (KEDB)</li>
            <li>Proactive Problem Analysis</li>
        </ul>
      </Card>
    </div>
  );
};

export default ProblemManagement;
