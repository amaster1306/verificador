import React, { useRef } from 'react';
import { Upload, Trash2 } from 'lucide-react';
const MyAdsPage = ({ knownAds, setKnownAds }) => {
    const fileInputRef = useRef(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const newAd = {
            adId: `OWN_${Date.now()}`,
            brand: 'Mi Marca',
            campaign: file.name.replace(/\.mp3/i, ''),
            type: 'own',
            isActive: true,
        };
        setKnownAds(prev => [newAd, ...prev]);
    };
    const handleToggleAdStatus = (adId) => {
        setKnownAds(prevAds => prevAds.map(ad => 
            ad.adId === adId ? { ...ad, isActive: !ad.isActive } : ad
        ));
    };
    const myOwnAds = knownAds.filter(ad => ad.type === 'own');
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">Mis Frases</h2>
                    <p className="text-gray-400">Gestiona las frases de tus comerciales que el sistema debe rastrear.</p>
                </div>
                <button onClick={() => fileInputRef.current.click()} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <Upload size={18} /> Subir Frase (MP3)
                </button>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".mp3" className="hidden" />
            </div>
            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Frases Activas</h3>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-3">Marca</th>
                                <th className="px-6 py-3">Campaña / Frase</th>
                                <th className="px-6 py-3">Estado</th>
                                <th className="px-6 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myOwnAds.map(ad => (
                                <tr key={ad.adId} className="border-b dark:border-gray-700">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{ad.brand}</td>
                                    <td className="px-6 py-4">{ad.campaign}</td>
                                    <td className="px-6 py-4">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={ad.isActive} onChange={() => handleToggleAdStatus(ad.adId)} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default MyAdsPage;
