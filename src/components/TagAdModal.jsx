import React, { useState } from 'react';
import { X, Tag } from 'lucide-react';
const TagAdModal = ({ adCluster, onClose, onTag }) => {
    const [brand, setBrand] = useState('');
    const [campaign, setCampaign] = useState('');
    const [type, setType] = useState('competitor');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!brand || !campaign) return;
        onTag({ ...adCluster, brand, campaign, type });
        onClose();
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6 relative text-white">
                <button type="button" onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white"><X /></button>
                <h3 className="text-lg font-bold mb-4">Verificar Anuncio</h3>
                <p className="text-sm text-gray-400 mb-4">La IA tiene baja confianza en esta detección. Por favor, confirma los datos.</p>
                <audio controls src={adCluster.audioUrl} className="w-full mb-4">Tu navegador no soporta el elemento de audio.</audio>
                <div className="space-y-4">
                    <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="Marca (ej: Sodimac)" required className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="text" value={campaign} onChange={e => setCampaign(e.target.value)} placeholder="Campaña (ej: Temporada Terrazas)" required className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <div className="flex gap-4">
                        <label className={`flex-1 p-3 border rounded-lg cursor-pointer text-center ${type === 'own' ? 'bg-blue-600 border-blue-500' : 'border-gray-600'}`}>
                            <input type="radio" name="type" value="own" checked={type === 'own'} onChange={e => setType(e.target.value)} className="sr-only" />
                            Mi Anuncio
                        </label>
                        <label className={`flex-1 p-3 border rounded-lg cursor-pointer text-center ${type === 'competitor' ? 'bg-blue-600 border-blue-500' : 'border-gray-600'}`}>
                            <input type="radio" name="type" value="competitor" checked={type === 'competitor'} onChange={e => setType(e.target.value)} className="sr-only" />
                            Competencia
                        </label>
                    </div>
                </div>
                <button type="submit" className="mt-6 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">Confirmar Etiqueta</button>
            </form>
        </div>
    );
};
export default TagAdModal;
