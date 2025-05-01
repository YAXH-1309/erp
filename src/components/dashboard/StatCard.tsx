import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'teal';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change,
  color = 'teal' 
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-500',
      icon: 'text-blue-600',
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-500',
      icon: 'text-green-600',
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-500',
      icon: 'text-purple-600',
    },
    orange: {
      bg: 'bg-orange-50',
      text: 'text-orange-500',
      icon: 'text-orange-600',
    },
    teal: {
      bg: 'bg-teal-50',
      text: 'text-teal-500',
      icon: 'text-teal-600',
    },
  };

  const changeColor = change ? 
    change.type === 'increase' ? 'text-green-600' : 
    change.type === 'decrease' ? 'text-red-600' : 
    'text-gray-600'
    : '';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${colorClasses[color].bg} p-3 rounded-full`}>
          <div className={colorClasses[color].icon}>
            {icon}
          </div>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd>
              <div className="text-2xl font-semibold text-gray-900">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
      {change && (
        <div className="mt-4">
          <div className={`flex items-center text-sm ${changeColor}`}>
            {change.type === 'increase' ? (
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            ) : change.type === 'decrease' ? (
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
              </svg>
            ) : (
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
              </svg>
            )}
            <span>
              {change.value} {change.type !== 'neutral' && (change.type === 'increase' ? 'increase' : 'decrease')} from last month
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatCard;