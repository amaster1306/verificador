import React from 'react';
import { Wallet } from 'lucide-react';
const ShareOfVoiceChart = ({ data, totalValue, formatCurrency }) => {
    const stringToColor = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xFF;
            const brighterValue = Math.min(255, value + 70);
            color += ('00' + brighterValue.toString(16)).substr(-2);
        }
        return color;
    };
    return (
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                <Wallet className="mr-2 h-5 w-5 text-green-500" /> Share of Voice (Inversión)
            </h3>
            <p className="text-3xl font-bold text-white">{formatCurrency(totalValue)}</p>
            <p className="text-sm text-gray-400 mb-4">Inversión total estimada</p>
            <div className="flex w-full h-6 rounded-md overflow-hidden my-2">
                {data.map((brand) => (
                    <div
                        key={brand.name}
                        className="h-full transition-all duration-300 flex items-center justify-center"
                        style={{
                            width: `${brand.percent}%`,
                            backgroundColor: stringToColor(brand.name),
                        }}
                        title={`${brand.name}: ${brand.percent.toFixed(1)}%`}
                    >
                        {brand.percent > 10 && (
                            <span className="text-white text-xs font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
                                {brand.percent.toFixed(0)}%
                            </span>
                        )}
                    </div>
                ))}
            </div>
            <div className="space-y-2 text-sm mt-2 overflow-y-auto flex-grow">
                {data.map((brand) => (
                    <div key={brand.name} className="flex justify-between items-center">
                        <div className="flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: stringToColor(brand.name) }}></span>
                            <span className="text-gray-300">{brand.name}</span>
                        </div>
                        <div className="font-semibold text-white text-right">
                            {formatCurrency(brand.value)}
                            <span className="ml-2 text-xs text-gray-400 w-16 inline-block text-left">({brand.percent.toFixed(0)}%)</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ShareOfVoiceChart;
