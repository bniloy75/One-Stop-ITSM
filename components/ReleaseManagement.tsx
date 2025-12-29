
import React from 'react';
import Card from './Card';

const ReleaseManagement: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Release Management</h1>
      <Card title="Module Under Construction" value="" icon={<div />} trend="">
        <p className="text-gray-300 mt-4">The Release Management module, for planning, scheduling, and controlling the build, test, and deployment of releases, is being built.</p>
        <p className="text-gray-300 mt-2">Features will include:</p>
        <ul className="list-disc list-inside text-gray-400 mt-2">
            <li>Release Planning and Scheduling</li>
            <li>Integration with Change and CI/CD Pipelines</li>
            <li>Deployment Automation and Rollback Plans</li>
            <li>Post-Release Verification</li>
        </ul>
      </Card>
    </div>
  );
};

export default ReleaseManagement;
