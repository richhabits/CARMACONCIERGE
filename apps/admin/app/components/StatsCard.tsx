'use client';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
}

export function StatsCard({ title, value, change, icon }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-uk-lg p-6 border-t-4 border-uk-blue-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-uk-dark mb-2">{value}</p>
          {change !== undefined && (
            <p
              className={`text-sm font-semibold ${
                change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
            </p>
          )}
        </div>
        {icon && <div className="text-4xl text-uk-blue-500 opacity-80">{icon}</div>}
      </div>
    </div>
  );
}
