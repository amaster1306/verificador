import React from 'react';
import { X } from 'lucide-react';
import { initialRadios } from '../data/mockData';
const PDFReportModal = ({ onClose, detections, knownAds }) => {
    const ownDetectionsCount = detections.filter(d => knownAds.find(ad => ad.adId === d.adId)?.type === 'own').length;
    const competitorDetectionsCount = detections.length - ownDetectionsCount;
    const sovData = { 'Falabella': 35, 'Sodimac': 25, 'Lider': 20, 'Ripley': 20 };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-8">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-full flex flex-col">
                <div className="p-4 bg-gray-100 flex justify-between items-center border-b">
                    <h3 className="text-lg font-bold text-gray-800">Vista Previa del Reporte</h3>
                    <div>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X /></button>
                    </div>
                </div>
                <div className="flex-grow p-8 overflow-y-auto text-black">
                    <div className="w-full">
                        <header className="flex justify-between items-center pb-4 border-b-2 border-gray-800">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Reporte de Verificación</h1>
                                <p className="text-gray-500">Periodo: 01/08/2025 - 15/08/2025</p>
                            </div>
                            <h2 className="text-2xl font-bold text-blue-600">OndaVerificada</h2>
                        </header>
                        <section className="my-8">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Resumen Ejecutivo</h3>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">Detecciones Propias</p><p className="text-2xl font-bold text-blue-600">{ownDetectionsCount}</p></div>
                                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">Detecciones Competencia</p><p className="text-2xl font-bold text-yellow-600">{competitorDetectionsCount}</p></div>
                                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">Total Monitoreado</p><p className="text-2xl font-bold">{detections.length}</p></div>
                            </div>
                        </section>
                        <section className="my-8">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Share of Voice (SOV)</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex w-full h-8 rounded-full overflow-hidden">
                                    <div className="bg-blue-500" style={{ width: `${sovData.Falabella}%` }}></div>
                                    <div className="bg-yellow-500" style={{ width: `${sovData.Sodimac}%` }}></div>
                                    <div className="bg-orange-500" style={{ width: `${sovData.Lider}%` }}></div>
                                    <div className="bg-pink-500" style={{ width: `${sovData.Ripley}%` }}></div>
                                </div>
                                <div className="flex justify-around mt-2 text-xs">
                                    {Object.entries(sovData).map(([brand, percent]) => (
                                        <div key={brand} className="flex items-center">
                                            <span className={`w-2 h-2 rounded-full mr-1.5 ${brand === 'Falabella' ? 'bg-blue-500' : brand === 'Sodimac' ? 'bg-yellow-500' : brand === 'Lider' ? 'bg-orange-500' : 'bg-pink-500'}`}></span>
                                            <span>{brand}: {percent}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                        <section className="my-8">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">Detalle de Detecciones</h3>
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                    <tr><th className="px-4 py-2">Fecha/Hora</th><th className="px-4 py-2">Radio</th><th className="px-4 py-2">Marca</th><th className="px-4 py-2">Campaña</th></tr>
                                </thead>
                                <tbody>
                                    {detections.map((d) => {
                                        const radio = initialRadios.find(r => r.id === d.radioId);
                                        const adInfo = knownAds.find(ad => ad.adId === d.adId);
                                        return (
                                            <tr key={d.id} className="border-b hover:bg-gray-50">
                                                <td className="px-4 py-2">{new Date(d.timestamp).toLocaleString('es-CL')}</td>
                                                <td className="px-4 py-2">{radio?.name}</td>
                                                <td className={`px-4 py-2 font-medium ${adInfo?.type === 'own' ? 'text-blue-600' : 'text-yellow-600'}`}>{adInfo?.brand}</td>
                                                <td className="px-4 py-2">{adInfo?.campaign}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </section>
                        <footer className="text-center text-xs text-gray-400 pt-4 mt-8 border-t">
                            Reporte generado por OndaVerificada el {new Date().toLocaleDateString('es-CL')} | Página 1 de 1
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PDFReportModal;
