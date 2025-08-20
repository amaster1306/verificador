import React, { useState } from 'react';
import TagAdModal from '../components/TagAdModal';
import { PlayCircle, Tag } from 'lucide-react';
const AdInboxPage = ({ unidentifiedAds, onTagAd }) => {
    const [adToTag, setAdToTag] = useState(null);
    return (
        <>
            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verificación</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Aquí aparecen anuncios donde la IA tiene baja confianza. Ayúdanos a verificar estas raras excepciones para perfeccionar tus reportes.</p>
                <div className="space-y-4">
                    {unidentifiedAds.map(ad => (
                        <div key={ad.clusterId} className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center mb-4 md:mb-0">
                                <button onClick={() => setAdToTag(ad)} className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 mr-4"><PlayCircle /></button>
                                <div>
                                    <p className="font-bold text-gray-800 dark:text-gray-200">Anuncio por Verificar</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{ad.detectionCount} detecciones en {ad.radios.length} radios.</p>
                                </div>
                            </div>
                            <button onClick={() => setAdToTag(ad)} className="w-full md:w-auto bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                <Tag className="h-4 w-4" /> Verificar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {adToTag && <TagAdModal adCluster={adToTag} onClose={() => setAdToTag(null)} onTag={onTagAd} />}
        </>
    );
};
export default AdInboxPage;
