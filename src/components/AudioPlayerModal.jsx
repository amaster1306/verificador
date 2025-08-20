import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
const AudioPlayerModal = ({ detection, radio, onClose, knownAds }) => {
    const adInfo = knownAds.find(ad => ad.adId === detection.adId);
    const audioRef = useRef(null);
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = detection.start;
            audioRef.current.play().catch(e => console.error("Error al reproducir audio:", e));
        }
    }, [detection.start]);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6 relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white"><X /></button>
                <h3 className="text-lg font-bold text-white mb-2">{adInfo?.brand} - {adInfo?.campaign}</h3>
                <p className="text-sm text-gray-400 mb-4">Detectado en <span className="font-semibold">{radio?.name}</span> el {new Date(detection.timestamp).toLocaleString('es-CL')}</p>
                <audio ref={audioRef} controls src={detection.audioUrl} className="w-full">Tu navegador no soporta el elemento de audio.</audio>
                <p className="text-xs text-gray-500 mt-2">La reproducción comenzará en el segundo {detection.start}.</p>
            </div>
        </div>
    );
};
export default AudioPlayerModal;
