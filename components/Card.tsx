
import React from 'react';

interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, icon, trend, children }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700/50 transition-all duration-300 hover:border-red-500/50 hover:shadow-red-500/10">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          {value && <p className="text-3xl font-bold text-white mt-1">{value}</p>}
        </div>
        <div className="bg-red-600/20 text-red-400 p-3 rounded-lg">
          {icon}
        </div>
      </div>
      {trend && <p className="text-sm text-gray-500 mt-2">{trend}</p>}
      {children}
    </div>
  );
};

export default Card;
