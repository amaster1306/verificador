import React from 'react';
const DonutChart = ({ data, colors, title }) => {
    const size = 120;
    const strokeWidth = 20;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const totalValue = data.reduce((sum, item) => sum + item.value, 0);
    let accumulatedValue = 0;
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
                    {data.map((item, index) => {
                        if (item.value === 0) return null;
                        const dashoffset = circumference - (accumulatedValue / totalValue) * circumference;
                        const dasharray = (item.value / totalValue) * circumference;
                        accumulatedValue += item.value;
                        return (
                            <circle
                                key={index}
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                fill="transparent"
                                stroke={colors[index % colors.length]}
                                strokeWidth={strokeWidth}
                                strokeDasharray={`${dasharray} ${circumference - dasharray}`}
                                strokeDashoffset={dashoffset}
                            />
                        );
                    })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">{totalValue}</span>
                    <span className="text-xs text-gray-400">{title}</span>
                </div>
            </div>
            <div className="space-y-1 text-xs w-full">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: colors[index % colors.length] }}></span>
                            <span className="text-gray-300">{item.name}</span>
                        </div>
                        <span className="font-semibold text-white ml-1.5">{item.value} ({totalValue > 0 ? ((item.value / totalValue) * 100).toFixed(0) : 0}%)</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default DonutChart;
