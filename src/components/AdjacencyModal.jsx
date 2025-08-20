import React from 'react';
import { X, ArrowLeft, Target, ChevronRight } from 'lucide-react';
const AdjacencyModal = ({ detection, radio, onClose, knownAds }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative text-white">
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white"><X /></button>
            <h3 className="text-lg font-bold mb-4">Contexto de Emisión</h3>
            <p className="text-sm text-gray-400 mb-6">Anuncio detectado en <span className="font-semibold">{radio?.name}</span> el {new Date(detection.timestamp).toLocaleString('es-CL')}</p>
            <div className="space-y-2">
                <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
                    <ArrowLeft className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                        <p className="text-xs text-gray-500">ANTES</p>
                        <p>{detection.context.before}</p>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-blue-500/20 border border-blue-500 rounded-lg">
                    <Target className="h-5 w-5 mr-3 text-blue-400" />
                    <div>
                        <p className="text-xs text-blue-300">TU ANUNCIO</p>
                        <p className="font-bold">{knownAds.find(ad => ad.adId === detection.adId)?.campaign}</p>
                    </div>
                </div>
                <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
                    <ChevronRight className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                        <p className="text-xs text-gray-500">DESPUÉS</p>
                        <p>{detection.context.after}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
export default AdjacencyModal;
