import React from 'react';
import StatCard from '../components/StatCard';
import { RadioTower, Eye, Sliders, BarChart, PlayCircle, Share2, Download } from 'lucide-react';
import { initialRadios } from '../data/mockData';
const DashboardHomePage = ({ detections, onPlay, onShowContext, knownAds, onDownloadReport, filters, handleFilterChange }) => {
    const totalDetections = detections.length;
    const ownDetections = detections.filter(d => knownAds.find(ad => ad.adId === d.adId)?.type === 'own').length;
    const competitorDetections = totalDetections - ownDetections;
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Mis Detecciones (Hoy)" value={ownDetections} icon={<RadioTower size={24} />} color="bg-blue-500/20 text-blue-400" />
                <StatCard title="Detecciones Competencia (Hoy)" value={competitorDetections} icon={<Eye size={24} />} color="bg-yellow-500/20 text-yellow-400" />
                <StatCard title="Radios Monitoreadas" value={initialRadios.length} icon={<Sliders size={24} />} color="bg-green-500/20 text-green-400" />
            </div>
            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold flex items-center text-gray-900 dark:text-white"><BarChart className="mr-2 h-5 w-5 text-blue-500" />Reportes</h2>
                    <div className="flex items-center gap-2">
                         <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="px-2 py-1.5 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" title="Fecha de inicio"/>
                         <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="px-2 py-1.5 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm" title="Fecha de fin"/>
                        <button onClick={onDownloadReport} className="font-semibold text-sm py-2 px-4 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"><Download size={16}/> Descargar Reporte</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-3">Fecha/Hora</th>
                                <th className="px-6 py-3">Radio</th>
                                <th className="px-6 py-3">Región</th>
                                <th className="px-6 py-3">Comuna</th>
                                <th className="px-6 py-3">Marca</th>
                                <th className="px-6 py-3">Campaña</th>
                                <th className="px-6 py-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detections.map((d) => {
                                const radio = initialRadios.find(r => r.id === d.radioId);
                                const adInfo = knownAds.find(ad => ad.adId === d.adId);
                                if (!adInfo) return null;
                                return (
                                    <tr key={d.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="px-6 py-4">{new Date(d.timestamp).toLocaleString('es-CL')}</td>
                                        <td className="px-6 py-4">{radio?.name}</td>
                                        <td className="px-6 py-4">{radio?.region}</td>
                                        <td className="px-6 py-4">{radio?.city}</td>
                                        <td className={`px-6 py-4 font-medium ${adInfo.type === 'own' ? 'text-blue-400' : 'text-yellow-400'}`}>{adInfo.brand}</td>
                                        <td className="px-6 py-4">{adInfo.campaign}</td>
                                        <td className="px-6 py-4 text-center space-x-4 whitespace-nowrap">
                                            <button onClick={() => onPlay(d)} className="font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"><PlayCircle className="mr-1 h-4 w-4" />Reproducir</button>
                                            <button onClick={() => onShowContext(d)} className="font-medium text-gray-500 dark:text-gray-400 hover:underline inline-flex items-center"><Share2 className="mr-1 h-4 w-4" />Contexto</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
export default DashboardHomePage;
