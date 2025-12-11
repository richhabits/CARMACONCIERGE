'use client';

interface ChartProps {
  title: string;
  data: { label: string; value: number }[];
}

export function Chart({ title, data }: ChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div>
      <h3 className="text-xl font-bold text-uk-dark mb-6">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-uk-dark">{item.label}</span>
              <span className="text-sm font-bold text-uk-blue-500">{item.value}</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-uk-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
