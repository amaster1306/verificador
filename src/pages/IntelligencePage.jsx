import React, { useState, useMemo } from 'react';
import MultiSelectDropdown from '../components/MultiSelectDropdown';
import DonutChart from '../components/DonutChart';
import ShareOfVoiceChart from '../components/ShareOfVoiceChart';
import { Tag, TrendingUp, Radio, MapPin, PlusCircle } from 'lucide-react';
import { initialRadios, initialKnownAds, initialDetections } from '../data/mockData';
const IntelligencePage = () => {
    const today = new Date();
    const fifteenDaysAgo = new Date(today);
    fifteenDaysAgo.setDate(today.getDate() - 15);
    const [startDate, setStartDate] = useState(fifteenDaysAgo.toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(today.toISOString().split('T')[0]);
    const [competitors, setCompetitors] = useState(['Sodimac', 'Lider', 'Ripley', 'Tottus', 'Paris', 'WOM', 'Claro']);
    const [newCompetitor, setNewCompetitor] = useState('');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const handleAddCompetitor = (e) => {
        e.preventDefault();
        if (newCompetitor && !competitors.includes(newCompetitor)) {
            setCompetitors(prev => [...prev, newCompetitor].sort());
            setNewCompetitor('');
        }
    };
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
    };
    const filteredDetections = useMemo(() => {
        if (!startDate || !endDate) return [];
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        return initialDetections.filter(d => {
            const detectionDate = new Date(d.timestamp);
            return detectionDate >= start && detectionDate <= end;
        });
    }, [startDate, endDate]);
    const competitorDetections = useMemo(() => {
        return filteredDetections.filter(detection => {
            const ad = initialKnownAds.find(a => a.adId === detection.adId);
            if (!ad || ad.type !== 'competitor') return false;
            if (selectedBrands.length === 0) return true;
            return selectedBrands.includes(ad.brand);
        });
    }, [filteredDetections, selectedBrands]);
    const analytics = useMemo(() => {
        const classificationData = competitorDetections.reduce((acc, detection) => { acc[detection.classification] = (acc[detection.classification] || 0) + 1; return acc; }, { offer: 0, branding: 0 });
        const radioCounts = competitorDetections.reduce((acc, detection) => { const radio = initialRadios.find(r => r.id === detection.radioId); if (radio) acc[radio.name] = (acc[radio.name] || 0) + 1; return acc; }, {});
        const topCompetitorRadios = Object.entries(radioCounts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 5);
        const regionBrandCounts = competitorDetections.reduce((acc, detection) => { const radio = initialRadios.find(r => r.id === detection.radioId); const ad = initialKnownAds.find(a => a.adId === detection.adId); if (radio && ad) { const regionName = radio.region; const brandName = ad.brand; if (!acc[regionName]) acc[regionName] = {}; acc[regionName][brandName] = (acc[regionName][brandName] || 0) + 1; } return acc; }, {});
        const detectionsByRegion = Object.entries(regionBrandCounts).map(([region, brands]) => ({ name: region, brands: Object.entries(brands).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count), total: Object.values(brands).reduce((sum, count) => sum + count, 0) })).sort((a, b) => b.total - a.total);
        const radioDetails = initialRadios.map(radio => { const detectionsInRadio = competitorDetections.filter(d => d.radioId === radio.id); const count = detectionsInRadio.length; const totalValue = detectionsInRadio.reduce((sum, d) => sum + d.estimatedCost, 0); return { name: radio.name, region: radio.region, count, totalValue }; }).filter(r => r.count > 0).sort((a, b) => b.count - a.count);
        const brandInvestment = competitorDetections.reduce((acc, detection) => {
            const ad = initialKnownAds.find(a => a.adId === detection.adId);
            if (ad) {
                acc[ad.brand] = (acc[ad.brand] || 0) + detection.estimatedCost;
            }
            return acc;
        }, {});
        const totalInvestment = Object.values(brandInvestment).reduce((sum, value) => sum + value, 0);
        const sovData = Object.entries(brandInvestment)
            .map(([name, value]) => ({
                name,
                value,
                percent: totalInvestment > 0 ? (value / totalInvestment) * 100 : 0,
            }))
            .sort((a, b) => b.value - a.value);
        const totalDetectionsInTable = radioDetails.reduce((sum, r) => sum + r.count, 0);
        const totalDetectionsByRegion = detectionsByRegion.reduce((sum, r) => sum + r.total, 0);
        const totalTop5Detections = topCompetitorRadios.reduce((sum, r) => sum + r.count, 0);
        return { 
            classificationData: [{ name: 'Oferta', value: classificationData.offer }, { name: 'Branding', value: classificationData.branding }], 
            topCompetitorRadios, 
            detectionsByRegion, 
            radioDetails, 
            sovData, 
            totalInvestment,
            totalDetectionsInTable,
            totalDetectionsByRegion,
            totalTop5Detections
        };
    }, [competitorDetections]);
    return (
        <div className="flex flex-col gap-6">
            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Análisis de Competencia</h2>
                <div className="flex items-center gap-4 flex-wrap justify-center">
                    <MultiSelectDropdown
                        options={competitors}
                        selectedOptions={selectedBrands}
                        onChange={setSelectedBrands}
                        placeholder="Todos los Competidores"
                    />
                    <div className="flex items-center gap-2">
                        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="px-2 py-1.5 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" title="Fecha de inicio"/>
                        <span className="text-gray-500">a</span>
                        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="px-2 py-1.5 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" title="Fecha de fin"/>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ShareOfVoiceChart 
                    data={analytics.sovData}
                    totalValue={analytics.totalInvestment}
                    formatCurrency={formatCurrency}
                />
                <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><Tag className="mr-2 h-5 w-5 text-purple-500" />Clasificación de Frases</h3>
                    <DonutChart data={analytics.classificationData} colors={["#8b5cf6", "#a855f7"]} title="Frases" />
                </div>
                 <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><TrendingUp className="mr-2 h-5 w-5 text-yellow-500" />Top 5 Radios</h3>
                    <div className="space-y-3">
                        {analytics.topCompetitorRadios.map((radio) => {
                            const maxValue = Math.max(...analytics.topCompetitorRadios.map(r => r.count), 1);
                            const widthPercentage = (radio.count / maxValue) * 100;
                            const percentageOfTotal = analytics.totalTop5Detections > 0 ? (radio.count / analytics.totalTop5Detections) * 100 : 0;
                            return (
                                <div key={radio.name}>
                                    <div className="flex justify-between items-center text-sm mb-1">
                                        <span className="text-gray-300">{radio.name}</span>
                                        <span className="font-semibold text-white">{radio.count} ({percentageOfTotal.toFixed(0)}%)</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${widthPercentage}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><Radio className="mr-2 h-5 w-5 text-blue-500" />Detalle por Radio</h3>
                    <div className="overflow-y-auto max-h-96 pr-2">
                        <table className="w-full text-sm text-left text-gray-400">
                            <thead className="text-xs uppercase bg-gray-700/50 sticky top-0"><tr><th className="px-4 py-2">Radio</th><th className="px-4 py-2 text-center">Frases</th><th className="px-4 py-2 text-center">% Frases</th><th className="px-4 py-2 text-right">Inversión</th></tr></thead>
                            <tbody className="divide-y divide-gray-700">
                                {analytics.radioDetails.map((radio, index) => (
                                    <tr key={index} className="hover:bg-gray-700/50">
                                        <td className="px-4 py-2 font-medium text-white">{radio.name}</td>
                                        <td className="px-4 py-2 text-center">{radio.count}</td>
                                        <td className="px-4 py-2 text-center">{analytics.totalDetectionsInTable > 0 ? ((radio.count / analytics.totalDetectionsInTable) * 100).toFixed(1) : 0}%</td>
                                        <td className="px-4 py-2 text-right">{formatCurrency(radio.totalValue)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center"><MapPin className="mr-2 h-5 w-5 text-green-500" />Presencia por Región</h3>
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {analytics.detectionsByRegion.map((region) => (
                            <div key={region.name}>
                                <div className="flex justify-between items-center text-sm mb-2">
                                    <span className="font-bold text-white">{region.name}</span>
                                    <span className="font-semibold text-gray-300">{region.total} Frases ({analytics.totalDetectionsByRegion > 0 ? ((region.total / analytics.totalDetectionsByRegion) * 100).toFixed(0) : 0}%)</span>
                                </div>
                                <div className="flex flex-wrap gap-2">{region.brands.map(brand => (<span key={brand.name} className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded-full">{brand.name} ({brand.count})</span>))}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Gestionar Competidores</h3>
                <form onSubmit={handleAddCompetitor} className="flex gap-2 max-w-sm">
                    <input type="text" value={newCompetitor} onChange={e => setNewCompetitor(e.target.value)} placeholder="Añadir nueva marca..." className="flex-1 w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"/>
                    <button type="submit" className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><PlusCircle size={20} /></button>
                </form>
            </div>
        </div>
    );
};
export default IntelligencePage;
