import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Filter, PlayCircle, Radio, Calendar, Tag, MapPin, PlusCircle, Fingerprint, ArrowLeft, CheckCircle, RadioTower, Target, Upload, Library, Download, FileInput, KeyRound, Server, Clock, HelpCircle, LogIn, Mail, Lock, User, Building, Briefcase, Users, BarChart, X, ChevronRight, Mic, HardDrive, Cpu, FileText as FileTextIcon, Quote, Twitter, Linkedin, Facebook, Bell, Phone, Send, Sun, Moon, CreditCard, Wallet, FileDown, Trash2, Settings, FileText, BarChart2, PieChart, Users2, Inbox, AlertTriangle, Eye, Sliders, LogOut, Share2, MessageSquare, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';

// --- MOCK DATA (EXPANDED) ---
const initialRadios = [
    { id: 1, name: 'Canal 95', region: 'Antofagasta', city: 'Antofagasta' },
    { id: 2, name: 'Cappíssima Multimedial', region: 'Arica y Parinacota', city: 'Arica' },
    { id: 3, name: 'El Conquistador FM (Concepción)', region: 'Biobío', city: 'Concepción' },
    { id: 4, name: 'El Conquistador FM (La Serena)', region: 'Coquimbo', city: 'La Serena' },
    { id: 5, name: 'El Conquistador FM (Valdivia)', region: 'Los Ríos', city: 'Valdivia' },
    { id: 30, name: 'Radio Paloma', region: 'Maule', city: 'Talca' },
    { id: 32, name: 'Radio Polar', region: 'Magallanes', city: 'Punta Arenas' },
    { id: 37, name: 'Radio Sago', region: 'Los Lagos', city: 'Osorno' },
    { id: 44, name: 'Radio Universidad de Chile', region: 'Metropolitana', city: 'Santiago' },
];

const initialKnownAds = [
    // Own Ads
    { adId: 'FAL_CYBER_30s', brand: 'Falabella', campaign: 'Cyber Day 2025 (30s)', type: 'own', isActive: true },
    { adId: 'ESC_CARACTER_30s', brand: 'Escudo', campaign: 'Hecha con Carácter (30s)', type: 'own', isActive: true },
    { adId: 'MOV_PLAN_FAM_25s', brand: 'Movistar', campaign: 'Plan Familia (25s)', type: 'own', isActive: false },
    // Competitor Ads
    { adId: 'SOD_TERRAZA_15s', brand: 'Sodimac', campaign: 'Temporada Terrazas (15s)', type: 'competitor', isActive: true },
    { adId: 'LIDER_OFERTAS_20s', brand: 'Lider', campaign: 'Ofertas de la Semana (20s)', type: 'competitor', isActive: true },
    { adId: 'RIP_CYBER_30s', brand: 'Ripley', campaign: 'Cyber Ripley (30s)', type: 'competitor', isActive: true },
    { adId: 'TOTTUS_PRECIOS_20s', brand: 'Tottus', campaign: 'Precios Bajos (20s)', type: 'competitor', isActive: true },
    { adId: 'PARIS_DECO_15s', brand: 'Paris', campaign: 'Renueva tu Hogar (15s)', type: 'competitor', isActive: true },
    { adId: 'WOM_GIGAS_30s', brand: 'WOM', campaign: 'Pórtate y obtén más Gigas (30s)', type: 'competitor', isActive: true },
    { adId: 'CLARO_5G_25s', brand: 'Claro', campaign: 'La velocidad del 5G (25s)', type: 'competitor', isActive: true },
];

const generateDetections = (count) => {
    const detections = [];
    const competitorAds = initialKnownAds.filter(ad => ad.type === 'competitor');
    for (let i = 0; i < count; i++) {
        const randomAd = competitorAds[Math.floor(Math.random() * competitorAds.length)];
        const randomRadio = initialRadios[Math.floor(Math.random() * initialRadios.length)];
        const randomTimestamp = new Date(Date.now() - Math.floor(Math.random() * 15 * 24 * 60 * 60 * 1000)); // Last 15 days
        detections.push({
            id: 200 + i,
            radioId: randomRadio.id,
            adId: randomAd.adId,
            timestamp: randomTimestamp,
            audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(i % 16) + 1}.mp3`,
            classification: Math.random() > 0.4 ? 'offer' : 'branding',
            estimatedCost: 50000 + Math.floor(Math.random() * 50000),
            context: { before: 'Música', after: 'Noticias' }
        });
    }
    return detections;
};

const initialDetections = [
    { id: 101, radioId: 1, adId: 'FAL_CYBER_30s', timestamp: new Date('2025-08-15T08:15:30.000Z'), audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', classification: 'offer', estimatedCost: 75000, context: { before: 'Mención del Tiempo', after: 'Anuncio Lider' } },
    { id: 102, radioId: 3, adId: 'RIP_CYBER_30s', timestamp: new Date('2025-08-15T08:16:00.000Z'), audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', classification: 'offer', estimatedCost: 80000, context: { before: 'Anuncio Falabella', after: 'Canción: "Blinding Lights"' } },
    { id: 103, radioId: 4, adId: 'SOD_TERRAZA_15s', timestamp: new Date('2025-08-15T10:30:00.000Z'), audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', classification: 'branding', estimatedCost: 60000, context: { before: 'Canción: "Levitating"', after: 'Jingle de la Radio' } },
    { id: 104, radioId: 1, adId: 'LIDER_OFERTAS_20s', timestamp: new Date('2025-08-15T11:45:12.000Z'), audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', classification: 'offer', estimatedCost: 65000, context: { before: 'Noticias', after: 'Anuncio Movistar' } },
    ...generateDetections(100) // Generate 100 more detections for a total of 104
];


const initialUnidentifiedAds = [
    { clusterId: 'CLUSTER_001', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', detectionCount: 15, firstSeen: new Date('2025-08-14T00:00:00.000Z'), lastSeen: new Date(), radios: [1, 4, 44] },
    { clusterId: 'CLUSTER_002', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', detectionCount: 8, firstSeen: new Date('2025-08-13T00:00:00.000Z'), lastSeen: new Date(), radios: [3, 30] },
];

const initialTeamMembers = [
    { id: 1, name: 'Daniel Fuentes', email: 'daniel.fuentes@example.com', role: 'Administrador' },
    { id: 2, name: 'Ana Rojas', email: 'ana.rojas@example.com', role: 'Analista' },
];

// --- UTILITY & HELPER COMPONENTS ---
const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center">
        <div className={`p-3 rounded-full mr-4 ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

// --- MODAL COMPONENTS ---
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
                <audio ref={audioRef} controls src={detection.audioUrl} className="w-full">
                    Tu navegador no soporta el elemento de audio.
                </audio>
                <p className="text-xs text-gray-500 mt-2">La reproducción comenzará en el segundo {detection.start}.</p>
            </div>
        </div>
    );
};

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

const TagAdModal = ({ adCluster, onClose, onTag }) => {
    const [brand, setBrand] = useState('');
    const [campaign, setCampaign] = useState('');
    // El código ha sido migrado a la carpeta src. Usar src/App.jsx como punto de entrada.
    export { default } from './src/App.jsx';
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


// --- PAGE/VIEW COMPONENTS ---
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
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {ad.detectionCount} detecciones en {ad.radios.length} radios.
                                    </p>
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

const MultiSelectDropdown = ({ options, selectedOptions, onChange, placeholder = "Seleccionar Marcas..." }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleOptionToggle = (option) => {
        const newSelection = selectedOptions.includes(option)
            ? selectedOptions.filter(item => item !== option)
            : [...selectedOptions, option];
        onChange(newSelection);
    };

    const handleSelectAll = () => {
        if (selectedOptions.length === options.length) {
            onChange([]); // Deselect all
        } else {
            onChange(options); // Select all
        }
    };

    const displayValue = selectedOptions.length > 0
        ? `${selectedOptions.length} marca(s) seleccionada(s)`
        : placeholder;

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="w-full md:w-64 px-3 py-1.5 border border-gray-600 rounded-lg bg-gray-700 flex justify-between items-center text-sm">
                <span>{displayValue}</span>
                <ChevronRight className={`transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} size={16} />
            </button>
            {isOpen && (
                <div className="absolute z-10 top-full mt-1 w-full md:w-64 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <div className="p-2 border-b border-gray-600">
                        <label className="flex items-center space-x-2 px-2 py-1 text-sm hover:bg-gray-700 rounded cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedOptions.length === options.length}
                                onChange={handleSelectAll}
                                className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-500 rounded focus:ring-blue-500"
                            />
                            <span>Seleccionar Todo</span>
                        </label>
                    </div>
                    <div className="p-1">
                        {options.map(option => (
                            <label key={option} className="flex items-center space-x-2 px-3 py-1.5 text-sm hover:bg-gray-700 rounded cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => handleOptionToggle(option)}
                                    className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-500 rounded focus:ring-blue-500"
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const ShareOfVoiceChart = ({ data, totalValue, formatCurrency }) => {
    // A simple hash function to get a consistent color for a brand string
    const stringToColor = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xFF;
            // Make colors brighter to ensure visibility on dark background
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
            {/* Row 1: Filters */}
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

            {/* Row 2: KPIs */}
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
            
            {/* Row 3: Detail Tables */}
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

            {/* Row 4: Form */}
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

const TeamPage = () => {
    const [team, setTeam] = useState(initialTeamMembers);
    return (
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Equipo</h2>
                    <p className="text-gray-500 dark:text-gray-400">Gestiona los miembros de tu equipo y sus permisos.</p>
                </div>
                <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <PlusCircle size={18} /> Invitar Miembro
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3">Correo Electrónico</th>
                            <th className="px-6 py-3">Rol</th>
                            <th className="px-6 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.map(member => (
                            <tr key={member.id} className="border-b dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{member.name}</td>
                                <td className="px-6 py-4">{member.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${member.role === 'Administrador' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-300'}`}>
                                        {member.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-white"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const HelpPage = () => {
    const HelpCard = ({ icon, title, children }) => (
        <div className="bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <div className="flex items-center mb-3">
                <div className="p-2 bg-blue-500/20 rounded-full mr-4">
                    {React.cloneElement(icon, { className: "h-6 w-6 text-blue-400" })}
                </div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
            <p className="text-gray-400">{children}</p>
        </div>
    );

    return (
        <div>
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white">Centro de Ayuda</h2>
                <p className="text-lg text-gray-400 mt-2">Tu guía para dominar OndaVerificada.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <HelpCard icon={<Upload />} title="Sube tus Anuncios: Tu Único Paso Manual">
                    Ve a la sección 'Mis Frases' y sube los archivos de audio (MP3) de tus comerciales. Esta es la única vez que necesitas 'enseñarle' algo al sistema. Al hacerlo, nuestra IA sabrá exactamente qué buscar y lo rastreará por ti.
                </HelpCard>
                <HelpCard icon={<Cpu />} title="La IA Reconoce a Todos Automáticamente">
                    Nuestro sistema no solo busca tus anuncios. Gracias a una extensa biblioteca, la IA reconoce y clasifica automáticamente los comerciales de miles de marcas, incluyendo a toda tu competencia. No necesitas buscarlos ni escucharlos.
                </HelpCard>
                <HelpCard icon={<Inbox />} title="Verificación: Control de Calidad (Opcional)">
                     Esta sección es solo para casos muy raros (menos del 1%) donde la IA tiene dudas. No es una tarea diaria. Si lo deseas, puedes revisar y confirmar estas pocas detecciones para perfeccionar el sistema.
                </HelpCard>
                <HelpCard icon={<BarChart2 />} title="Dashboard e Inteligencia: Todo Automático">
                    Toda la información, tanto de tus anuncios como los de la competencia, alimenta automáticamente tu Dashboard y la sección de Inteligencia. Observa tu 'Share of Voice' y analiza las estrategias del mercado sin ningún trabajo manual.
                </HelpCard>
            </div>
        </div>
    );
};

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState({
        name: 'Daniel', 
        lastName: 'Fuentes', 
        email: 'daniel.fuentes@example.com', 
        phone: '+56 9 1234 5678',
        company: 'Empresa Demo S.A.',
        position: 'Jefe de Marketing',
    });

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setUserProfile(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Mi Perfil</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
                    <input type="text" id="name" name="name" value={userProfile.name} onChange={handleProfileChange} className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-400 mb-1">Apellido</label>
                    <input type="text" id="lastName" name="lastName" value={userProfile.lastName} onChange={handleProfileChange} className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Correo Electrónico</label>
                    <input type="email" id="email" name="email" value={userProfile.email} readOnly className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-600 cursor-not-allowed text-gray-300" />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">Teléfono</label>
                    <input type="tel" id="phone" name="phone" value={userProfile.phone} onChange={handleProfileChange} className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
                </div>
                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-1">Empresa</label>
                    <input type="text" id="company" name="company" value={userProfile.company} onChange={handleProfileChange} className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
                </div>
                <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-400 mb-1">Cargo</label>
                    <input type="text" id="position" name="position" value={userProfile.position} onChange={handleProfileChange} className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
                </div>
            </div>
            <div className="mt-6 text-right">
                <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">Guardar Cambios</button>
            </div>
        </div>
    );
};

const BillingPage = ({ onNavigateToPricing }) => {
    const invoices = [
        { id: 'INV-2025-08', date: '01/08/2025', amount: '$499.990', status: 'Pagada' },
        { id: 'INV-2025-07', date: '01/07/2025', amount: '$499.990', status: 'Pagada' },
        { id: 'INV-2025-06', date: '01/06/2025', amount: '$499.990', status: 'Pagada' },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Plan Actual</h3>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-2xl font-bold text-blue-400">Profesional</p>
                            <p className="text-gray-400">Próxima facturación: 01/09/2025</p>
                        </div>
                        <button onClick={onNavigateToPricing} className="font-semibold text-sm py-2 px-4 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">Cambiar Plan</button>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6">
                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Método de Pago</h3>
                     <div className="flex items-center">
                        <CreditCard className="h-8 w-8 text-gray-400 mr-4"/>
                        <div>
                            <p className="font-semibold text-white">Visa terminada en 4242</p>
                            <p className="text-sm text-gray-500">Expira 12/2028</p>
                        </div>
                     </div>
                </div>
            </div>
             <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Opciones de Pago</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="border border-gray-700 rounded-lg p-4">
                        <h4 className="font-bold text-white">Mercado Pago (Pago Automático)</h4>
                        <p className="text-sm text-gray-400">Paga al inicio de tu ciclo de facturación de forma segura y automática.</p>
                        <button className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">Configurar</button>
                    </div>
                       <div className="border border-gray-700 rounded-lg p-4">
                        <h4 className="font-bold text-white">Facturación Mensual (Línea de Crédito)</h4>
                        <p className="text-sm text-gray-400">Recibe una factura y paga el día 30 de cada mes. (Sujeto a aprobación).</p>
                        <button className="mt-4 w-full bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700">Solicitar</button>
                    </div>
                </div>
            </div>
             <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Historial de Facturas</h3>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-3">ID Factura</th>
                                <th className="px-6 py-3">Fecha</th>
                                <th className="px-6 py-3">Monto</th>
                                <th className="px-6 py-3">Estado</th>
                                <th className="px-6 py-3 text-right"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map(invoice => (
                                <tr key={invoice.id} className="border-b dark:border-gray-700">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{invoice.id}</td>
                                    <td className="px-6 py-4">{invoice.date}</td>
                                    <td className="px-6 py-4">{invoice.amount}</td>
                                    <td className={`px-6 py-4`}><span className={`px-2 py-1 text-xs font-medium rounded-full ${invoice.status === 'Pagada' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{invoice.status}</span></td>
                                    <td className="px-6 py-4 text-right"><button className="font-medium text-blue-400 hover:underline inline-flex items-center gap-1"><Download size={14}/> Descargar</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const MyAdsPage = ({ knownAds, setKnownAds }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        // Mock processing
        const newAd = {
            adId: `OWN_${Date.now()}`,
            brand: 'Mi Marca', // Placeholder
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


// --- MAIN DASHBOARD VIEW ---
const DashboardView = ({ onLogout, theme, toggleTheme, onNavigateToPricing }) => {
    const [activeTab, setActiveTab] = useState('intelligence'); // Default to intelligence
    const [detections, setDetections] = useState(initialDetections);
    const [knownAds, setKnownAds] = useState(initialKnownAds);
    const [unidentifiedAds, setUnidentifiedAds] = useState(initialUnidentifiedAds);
    const [selectedDetection, setSelectedDetection] = useState(null);
    const [contextDetection, setContextDetection] = useState(null);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const notificationsRef = useRef(null);
    const [filters, setFilters] = useState({ startDate: '', endDate: '' });

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredDetections = useMemo(() => {
        return detections.filter(d => {
            if (!filters.startDate && !filters.endDate) return true;
            const detectionDate = new Date(d.timestamp);
            detectionDate.setHours(0,0,0,0);
            
            if (filters.startDate) {
                const startDate = new Date(filters.startDate);
                startDate.setHours(0,0,0,0);
                if (detectionDate < startDate) return false;
            }
            if (filters.endDate) {
                const endDate = new Date(filters.endDate);
                endDate.setHours(0,0,0,0);
                if (detectionDate > endDate) return false;
            }
            return true;
        });
    }, [detections, filters]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                setIsNotificationsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [notificationsRef]);

    const handleTagAd = (taggedAd) => {
        const newAd = {
            adId: `${taggedAd.brand.toUpperCase()}_${Date.now()}`,
            brand: taggedAd.brand,
            campaign: taggedAd.campaign,
            type: taggedAd.type,
            isActive: true,
        };
        setKnownAds(prev => [newAd, ...prev]);

        const newDetections = taggedAd.radios.map((radioId, i) => ({
            id: Date.now() + i,
            radioId: radioId,
            adId: newAd.adId,
            timestamp: new Date(Date.now() - Math.random() * 86400000),
            audioUrl: taggedAd.audioUrl,
            start: 0,
            end: 30,
            context: { before: 'Contenido genérico', after: 'Contenido genérico' }
        }));
        setDetections(prev => [...prev, ...newDetections].sort((a,b) => b.timestamp - a.timestamp));
        setUnidentifiedAds(prev => prev.filter(ad => ad.clusterId !== taggedAd.clusterId));
    };
    
    const NavItem = ({ icon, label, name }) => (
        <button onClick={() => setActiveTab(name)} className={`w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === name ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}>
            {icon}
            <span className="ml-3">{label}</span>
        </button>
    );
    
    const pageTitles = {
        dashboard: 'Dashboard',
        'mis-frases': 'Mis Frases',
        verificacion: 'Verificación',
        intelligence: 'Inteligencia',
        team: 'Equipo',
        billing: 'Facturación',
        help: 'Ayuda',
        profile: 'Mi Perfil'
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardHomePage detections={filteredDetections} onPlay={setSelectedDetection} onShowContext={setContextDetection} knownAds={knownAds} onDownloadReport={() => setIsReportModalOpen(true)} filters={filters} handleFilterChange={handleFilterChange} />;
            case 'mis-frases':
                return <MyAdsPage knownAds={knownAds} setKnownAds={setKnownAds} />;
            case 'verificacion':
                return <AdInboxPage unidentifiedAds={unidentifiedAds} onTagAd={handleTagAd} />;
            case 'intelligence':
                return <IntelligencePage />;
            case 'team':
                return <TeamPage />;
            case 'help':
                return <HelpPage />;
            case 'profile':
                return <ProfilePage />;
            case 'billing':
                return <BillingPage onNavigateToPricing={onNavigateToPricing} />;
            default:
                return <DashboardHomePage detections={filteredDetections} onPlay={setSelectedDetection} onShowContext={setContextDetection} knownAds={knownAds} onDownloadReport={() => setIsReportModalOpen(true)} filters={filters} handleFilterChange={handleFilterChange} />;
        }
    };

    return (
        <div className={`${theme} transition-colors duration-300`}>
            <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen flex">
                <aside className="w-64 bg-white dark:bg-gray-800/50 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 flex flex-col p-4">
                    <h1 className="text-2xl font-bold tracking-tighter px-2 mb-8">Onda<span className="text-blue-500">Verificada</span></h1>
                    <nav className="flex-grow space-y-2">
                        <NavItem icon={<BarChart size={20} />} label="Dashboard" name="dashboard" />
                        <NavItem icon={<Library size={20} />} label="Mis Frases" name="mis-frases" />
                        <NavItem icon={<Inbox size={20} />} label="Verificación" name="verificacion" />
                        <NavItem icon={<PieChart size={20} />} label="Inteligencia" name="intelligence" />
                        <NavItem icon={<Users2 size={20} />} label="Equipo" name="team" />
                        <NavItem icon={<CreditCard size={20} />} label="Facturación" name="billing" />
                    </nav>
                    <div className="mt-auto">
                         <NavItem icon={<HelpCircle size={20} />} label="Ayuda" name="help" />
                         <NavItem icon={<User size={20} />} label="Mi Perfil" name="profile" />
                         <button onClick={onLogout} className="w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-400 hover:bg-red-500/20 hover:text-red-400">
                             <LogOut size={20} />
                             <span className="ml-3">Cerrar Sesión</span>
                         </button>
                    </div>
                </aside>
                
                <div className="flex-1 flex flex-col">
                    <header className="bg-white dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                        <div className="flex justify-between items-center h-16 px-8">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">{pageTitles[activeTab] || activeTab}</h2>
                            <div className="flex items-center gap-4">
                                <div className="relative" ref={notificationsRef}>
                                    <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="relative text-gray-500 dark:text-gray-400 hover:text-white">
                                        <Bell size={20} />
                                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800/50"></span>
                                    </button>
                                    {isNotificationsOpen && (
                                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                            <div className="p-3 font-semibold text-sm text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">Notificaciones</div>
                                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                                <li className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50"><p className="text-sm text-gray-800 dark:text-gray-200">Nuevo anuncio de <span className="font-bold">Sodimac</span> detectado.</p><p className="text-xs text-gray-500">hace 5 minutos</p></li>
                                                <li className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50"><p className="text-sm text-gray-800 dark:text-gray-200">Tu reporte mensual está listo para descargar.</p><p className="text-xs text-gray-500">hace 2 horas</p></li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 hover:text-white">
                                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                </button>
                            </div>
                        </div>
                    </header>
                    <main className="flex-grow p-8 overflow-y-auto">
                        {renderContent()}
                    </main>
                </div>

                {selectedDetection && <AudioPlayerModal detection={selectedDetection} radio={initialRadios.find(r => r.id === selectedDetection.radioId)} onClose={() => setSelectedDetection(null)} knownAds={knownAds} />}
                {contextDetection && <AdjacencyModal detection={contextDetection} radio={initialRadios.find(r => r.id === contextDetection.radioId)} onClose={() => setContextDetection(null)} knownAds={knownAds} />}
                {isReportModalOpen && <PDFReportModal onClose={() => setIsReportModalOpen(false)} detections={filteredDetections} knownAds={knownAds} />}
            </div>
        </div>
    );
};

// --- PUBLIC PAGES ---
const Header = ({ onNavigate, onLoginClick, onRegisterClick }) => (
    <header className="absolute top-0 left-0 right-0 z-20 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <button onClick={() => onNavigate('home')} className="text-2xl font-bold tracking-tighter">Onda<span className="text-blue-500">Verificada</span></button>
            <nav className="hidden md:flex items-center space-x-6">
                <button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition-colors">Quiénes Somos</button>
                <button onClick={() => onNavigate('home', '#servicios')} className="hover:text-blue-400 transition-colors">Servicios</button>
                <button onClick={() => onNavigate('home', '#como-funciona')} className="hover:text-blue-400 transition-colors">Cómo Funciona</button>
                <button onClick={() => onNavigate('home', '#precios')} className="hover:text-blue-400 transition-colors">Precios</button>
                <button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition-colors">Contacto</button>
            </nav>
            <div className="flex items-center gap-2">
                <button onClick={onLoginClick} className="text-sm font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">Ingresar</button>
                <button onClick={onRegisterClick} className="text-sm font-semibold py-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">Registrarse</button>
            </div>
        </div>
    </header>
);

const Footer = ({ onNavigate }) => (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
            <h3 className="text-xl font-bold text-white mb-2">Onda<span className="text-blue-500">Verificada</span></h3>
            <div className="flex justify-center gap-6 my-6">
                <a href="#" className="hover:text-white transition-colors"><Twitter /></a>
                <a href="#" className="hover:text-white transition-colors"><Linkedin /></a>
                <a href="#" className="hover:text-white transition-colors"><Facebook /></a>
            </div>
            <nav className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-sm mb-6">
                   <button onClick={() => onNavigate('home', '#servicios')} className="hover:text-white transition-colors">Servicios</button>
                   <button onClick={() => onNavigate('home', '#precios')} className="hover:text-white transition-colors">Precios</button>
                   <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">Quiénes Somos</button>
                   <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Términos de Servicio</button>
                   <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Política de Privacidad</button>
            </nav>
            <p className="text-xs">&copy; {new Date().getFullYear()} OndaVerificada. Todos los derechos reservados.</p>
        </div>
    </footer>
);

const AboutUsPage = ({ onNavigate, onLoginClick, onRegisterClick }) => {
    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
               <Header onNavigate={onNavigate} onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
            <main className="pt-24 pb-12 flex-grow flex items-center">
                   <section className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold mb-4">Quiénes Somos</h2>
                        <p className="text-gray-400 max-w-3xl mx-auto text-lg">En OndaVerificada, combinamos nuestra pasión por la tecnología y los medios para ofrecer una solución de vanguardia. Nuestro equipo está compuesto por ingenieros y analistas de medios dedicados a entregar datos precisos y accionables que potencien las estrategias de nuestros clientes.</p>
                </section>
            </main>
            <Footer onNavigate={onNavigate} />
        </div>
    );
};

const LegalPage = ({ pageType, onNavigate, onLoginClick, onRegisterClick }) => {
    const content = {
        terms: {
            title: "Términos y Condiciones del Servicio",
            lastUpdated: "15 de agosto de 2025",
            body: (
                <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-4">
                    <p>¡Bienvenido a OndaVerificada! Estos términos y condiciones ("Términos") rigen el uso de nuestro sitio web, servicios y plataforma (en conjunto, el "Servicio"), operado por OndaVerificada SPA ("nosotros", "nuestro"). Al acceder o utilizar nuestro Servicio, aceptas estar sujeto a estos Términos. Si no estás de acuerdo con alguna parte de los términos, no podrás acceder al Servicio.</p>
                    <h4 className="text-gray-200">1. Cuentas de Usuario</h4>
                    <p><strong>Creación de Cuenta:</strong> Para acceder a la mayoría de las funciones del Servicio, debes registrarte y crear una cuenta. Debes proporcionar información precisa, completa y actualizada durante el proceso de registro.</p>
                    <p><strong>Responsabilidad de la Cuenta:</strong> Eres responsable de salvaguardar la contraseña que utilizas para acceder al Servicio y de cualquier actividad o acción que se realice con tu contraseña. Te comprometes a notificar a OndaVerificada inmediatamente sobre cualquier uso no autorizado de tu cuenta.</p>
                    <h4 className="text-gray-200">2. Contenido del Usuario</h4>
                    <p><strong>Tus Anuncios:</strong> Eres el propietario de los archivos de audio de tus anuncios y cualquier otro contenido que subas a la plataforma ("Contenido de Usuario").</p>
                    <p><strong>Licencia para Operar:</strong> Al subir Contenido de Usuario, nos otorgas una licencia mundial, no exclusiva y libre de regalías para usar, procesar, analizar y mostrar dicho contenido con el único propósito de proporcionarte el Servicio. Esto nos permite generar las huellas digitales de tus anuncios y buscar coincidencias en las transmisiones de radio.</p>
                    <h4 className="text-gray-200">3. Terminación</h4>
                    <p>Podemos suspender o terminar tu acceso al Servicio de inmediato, sin previo aviso ni responsabilidad, si incumples estos Términos. Tras la terminación, tu derecho a utilizar el Servicio cesará inmediatamente.</p>
                </div>
            )
        },
        privacy: {
            title: "Política de Privacidad",
            lastUpdated: "15 de agosto de 2025",
            body: (
                <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-4">
                    <p>OndaVerificada SPA se compromete a proteger tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y salvaguardamos tu información cuando utilizas nuestro Servicio.</p>
                    <h4 className="text-gray-200">1. Información que Recopilamos</h4>
                    <p>Podemos recopilar: <strong>Datos Personales</strong> (nombre, email, etc.), <strong>Datos de la Empresa</strong>, <strong>Datos de Uso</strong> (IP, tipo de navegador) y <strong>Contenido de Audio</strong> (tus anuncios).</p>
                    <h4 className="text-gray-200">2. ¿Cómo Usamos tu Información?</h4>
                    <p>Usamos tu información para crear y gestionar tu cuenta, operar el Servicio, procesar tus audios, generar reportes y comunicarnos contigo.</p>
                    <h4 className="text-gray-200">3. Seguridad de tu Información</h4>
                    <p>Utilizamos medidas de seguridad administrativas, técnicas y físicas para proteger tu información personal y tu contenido de audio. Si bien hemos tomado medidas razonables, ningún sistema de seguridad es impenetrable.</p>
                    <h4 className="text-gray-200">4. Contacto</h4>
                    <p>Si tienes preguntas o comentarios sobre esta Política de Privacidad, por favor contáctanos en: <strong>privacidad@ondaverificada.cl</strong>.</p>
                </div>
            )
        }
    };

    const selectedContent = content[pageType];

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
               <Header onNavigate={onNavigate} onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
            <main className="pt-24 pb-12 flex-grow">
                   <section className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-4xl font-bold mb-2">{selectedContent.title}</h2>
                        <p className="text-sm text-gray-500 mb-8">Última actualización: {selectedContent.lastUpdated}</p>
                        {selectedContent.body}
                </section>
            </main>
            <Footer onNavigate={onNavigate} />
        </div>
    );
};

const ContactPage = ({ onNavigate, onLoginClick, onRegisterClick }) => {
    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
            <Header onNavigate={onNavigate} onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
            <main className="pt-24 pb-12 flex-grow flex items-center">
                <section className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-5xl font-bold">Hablemos</h2>
                        <p className="text-lg text-gray-400 mt-2">Estamos aquí para ayudarte. Contáctanos.</p>
                    </div>
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 bg-gray-800/50 border border-gray-700 rounded-xl p-8">
                        <div className="flex flex-col justify-center space-y-6">
                             <div>
                                <h3 className="text-2xl font-semibold mb-2">Información de Contacto</h3>
                                <p className="text-gray-400">Llena el formulario y nuestro equipo se pondrá en contacto contigo dentro de 24 horas.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-blue-500" /><span>+56 9 1234 5678</span></div>
                                <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-blue-500" /><span>contacto@ondaverificada.cl</span></div>
                            </div>
                        </div>
                        <form className="space-y-4">
                            <div><label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Nombre</label><input type="text" id="name" className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                            <div><label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Correo</label><input type="email" id="email" className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                            <div><label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Mensaje</label><textarea id="message" rows="4" className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea></div>
                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">Enviar Mensaje <Send className="h-4 w-4" /></button>
                        </form>
                    </div>
                </section>
            </main>
            <Footer onNavigate={onNavigate} />
        </div>
    );
};

const LandingPage = ({ onLoginClick, onRegisterClick, onNavigate }) => {
    const FAQItem = ({ question, children }) => (
        <details className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:bg-gray-700/50 open:bg-gray-700/50">
            <summary className="font-semibold text-lg list-none flex justify-between items-center">
                {question}
                <ChevronRight className="transform transition-transform duration-300 h-5 w-5 details-arrow" />
            </summary>
            <p className="mt-2 text-gray-400">{children}</p>
        </details>
    );

    return (
        <div className="bg-gray-900 text-white min-h-screen overflow-x-hidden">
            <style>{`.details-arrow { transition: transform 0.3s; } details[open] .details-arrow { transform: rotate(90deg); }`}</style>
            <Header onNavigate={onNavigate} onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />

            <main className="bg-gray-900">
                <section id="hero" className="relative h-[80vh] flex flex-col items-center justify-center p-4 text-center overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(17, 24, 39, 0) 0%, #111827 80%), repeating-linear-gradient(0deg, rgba(37, 99, 235, 0.1) 0px, rgba(37, 99, 235, 0.1) 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, rgba(37, 99, 235, 0.1) 0px, rgba(37, 99, 235, 0.1) 1px, transparent 1px, transparent 24px)'}}>
                    <div className="relative z-10 pt-20">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">Tu Inversión en Radio,<br />AHORA Verificada.</h2>
                        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">Monitoreamos, verificamos y reportamos cada una de tus pautas publicitarias en radios de todo Chile con precisión absoluta.</p>
                        <button onClick={onRegisterClick} className="mt-8 inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105">Comienza Ahora <ChevronRight className="ml-2 h-6 w-6" /></button>
                        <div className="mt-12">
                            <p className="text-sm text-gray-500 mb-4">Confían en nosotros:</p>
                            <div className="flex justify-center items-center gap-8 opacity-60">
                                <Building className="h-8 w-8" title="Empresa A"/>
                                <Briefcase className="h-8 w-8" title="Agencia B"/>
                                <Users className="h-8 w-8" title="Grupo C"/>
                                <Server className="h-8 w-8" title="Medios D"/>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="como-funciona" className="py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold mb-2">¿Cómo Funciona?</h2>
                        <div className="relative flex flex-col md:flex-row justify-between items-center w-full max-w-5xl mx-auto mt-16">
                            <div className="flex flex-col items-center text-center z-10 md:w-1/3"><div className="bg-gray-800 rounded-full p-6 border-2 border-blue-500"><Mic className="h-10 w-10 text-blue-500" /></div><h3 className="text-xl font-bold mt-4 mb-2">1. Monitoreo Continuo</h3><p className="text-gray-400 max-w-xs">Grabamos el contenido de cientos de radios a lo largo de todo Chile, 24/7.</p></div>
                            <div className="flex flex-col items-center text-center z-10 md:w-1/3 my-12 md:my-0"><div className="bg-gray-800 rounded-full p-6 border-2 border-blue-500"><Fingerprint className="h-10 w-10 text-blue-500" /></div><h3 className="text-xl font-bold mt-4 mb-2">2. Análisis con IA</h3><p className="text-gray-400 max-w-xs">Nuestra IA identifica tus anuncios mediante huellas digitales de audio únicas.</p></div>
                            <div className="flex flex-col items-center text-center z-10 md:w-1/3"><div className="bg-gray-800 rounded-full p-6 border-2 border-blue-500"><BarChart className="h-10 w-10 text-blue-500" /></div><h3 className="text-xl font-bold mt-4 mb-2">3. Reportes Detallados</h3><p className="text-gray-400 max-w-xs">Visualiza todas las detecciones y exporta informes completos desde tu panel.</p></div>
                        </div>
                    </div>
                </section>

                <section id="servicios" className="py-20 bg-gray-800/50">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold mb-2">Nuestro Servicio</h2>
                        <div className="max-w-2xl mx-auto mt-12"><div className="bg-gray-900 p-8 rounded-lg border border-gray-700"><Fingerprint className="h-12 w-12 text-blue-500 mx-auto mb-4" /><h3 className="text-2xl font-bold mb-2">Verificación de Anuncios</h3><p className="text-gray-400">Aseguramos con precisión de 99.9% que tus comerciales exactos fueron emitidos en las radios y horarios correctos, utilizando tecnología de Audio Fingerprinting.</p></div></div>
                    </div>
                </section>
                
                <section id="testimonios" className="py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold mb-12">Lo que dicen nuestros clientes</h2>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 text-left">
                                <Quote className="h-8 w-8 text-blue-500 mb-4 transform -scale-x-100" />
                                <p className="text-gray-300 mb-4">"Gracias a OndaVerificada, optimizamos nuestra pauta y confirmamos que nuestra inversión publicitaria está funcionando exactamente como la planeamos."</p>
                                <p className="font-bold">Jefa de Marketing</p>
                                <p className="text-sm text-gray-500">Empresa de Retail</p>
                            </div>
                               <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 text-left">
                                <Quote className="h-8 w-8 text-blue-500 mb-4 transform -scale-x-100" />
                                <p className="text-gray-300 mb-4">"La plataforma es increíblemente fácil de usar y los reportes son claros. Nos ahorra horas de trabajo manual cada semana."</p>
                                <p className="font-bold">Director de Medios</p>
                                <p className="text-sm text-gray-500">Agencia de Publicidad</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="precios" className="py-20 bg-gray-800/50">
                       <div className="container mx-auto px-4 text-center">
                            <h2 className="text-4xl font-bold mb-2">Planes y Precios</h2>
                               <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
                                   <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 flex flex-col"><h3 className="text-2xl font-bold mb-2">Básico</h3><p className="text-5xl font-bold my-4">$149.990<span className="text-lg font-normal text-gray-400">/mes</span></p><ul className="text-left space-y-2 text-gray-400 mb-6"><li><CheckCircle className="inline h-5 w-5 text-green-500 mr-2"/>Hasta 20 radios</li><li><CheckCircle className="inline h-5 w-5 text-green-500 mr-2"/>Verificación de Anuncios</li></ul><button className="mt-auto w-full bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700">Elegir Plan</button></div>
                                   <div className="bg-blue-600 p-8 rounded-lg border-2 border-blue-400 text-white relative flex flex-col"><div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-blue-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Más Popular</div><h3 className="text-2xl font-bold mb-2">Profesional</h3><p className="text-5xl font-bold my-4">$499.990<span className="text-lg font-normal">/mes</span></p><ul className="text-left space-y-2 mb-6"><li><CheckCircle className="inline h-5 w-5 mr-2"/>Hasta 100 radios</li><li><CheckCircle className="inline h-5 w-5 mr-2"/>Inteligencia Competitiva</li></ul><button className="mt-auto w-full bg-white text-blue-600 font-bold py-2 px-4 rounded-lg hover:bg-gray-200">Elegir Plan</button></div>
                                   <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 flex flex-col"><h3 className="text-2xl font-bold mb-2">Corporativo</h3><p className="text-5xl font-bold my-4">A Medida</p><ul className="text-left space-y-2 text-gray-400 mb-6"><li><CheckCircle className="inline h-5 w-5 text-green-500 mr-2"/>Radios ilimitadas</li><li><CheckCircle className="inline h-5 w-5 text-green-500 mr-2"/>Todas las funcionalidades</li></ul><button className="mt-auto w-full bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700">Solicitar Demo</button></div>
                               </div>
                        </div>
                </section>
                
                <section id="faq" className="py-20">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <h2 className="text-4xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
                        <div className="space-y-4">
                            <FAQItem question="¿Qué radios monitorean?">Monitoreamos una amplia red de radios a lo largo de todo Chile, cubriendo las principales capitales regionales y ciudades.</FAQItem>
                            <FAQItem question="¿Qué tan preciso es el sistema?">Nuestro sistema utiliza tecnología de huella digital acústica (Audio Fingerprinting), lo que nos permite alcanzar una precisión superior al 99.9%.</FAQItem>
                            <FAQItem question="¿Puedo verificar anuncios de mi competencia?">Sí. La plataforma te permite identificar y rastrear cualquier anuncio emitido, ideal para análisis competitivos.</FAQItem>
                        </div>
                    </div>
                </section>
                 <section id="contacto" className="py-20 bg-gray-800/50">
                       <div className="container mx-auto px-4 text-center">
                            <h2 className="text-4xl font-bold mb-2">¿Listo para tener el control total de tu pauta en radio?</h2>
                            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Hablemos sobre cómo OndaVerificada puede potenciar tu estrategia de medios.</p>
                            <button onClick={() => onNavigate('contact')} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">Contáctanos</button>
                        </div>
                </section>
            </main>
            <Footer onNavigate={onNavigate} />
        </div>
    );
};

// --- ROOT APP COMPONENT ---
export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authMode, setAuthMode] = useState(null);
    const [currentPage, setCurrentPage] = useState('home');
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };
    
    const handleNavigate = (page, section) => {
        setCurrentPage(page);
        if (page === 'home' && section) {
            setTimeout(() => {
                const element = document.querySelector(section);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 0);
        } else {
            window.scrollTo(0, 0);
        }
    };
    
    const handleNavigateToPricing = () => {
        setIsLoggedIn(false);
        handleNavigate('home', '#precios');
    };

    if (isLoggedIn) {
        return <DashboardView onLogout={() => setIsLoggedIn(false)} theme={theme} toggleTheme={toggleTheme} onNavigateToPricing={handleNavigateToPricing} />;
    }

    const onLoginClick = () => setAuthMode('login');
    const onRegisterClick = () => setAuthMode('register');

    const renderPublicPage = () => {
        switch (currentPage) {
            case 'about':
                return <AboutUsPage onNavigate={handleNavigate} onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />;
            case 'terms':
                return <LegalPage pageType="terms" onNavigate={handleNavigate} onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />;
            case 'privacy':
                return <LegalPage pageType="privacy" onNavigate={handleNavigate} onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />;
            case 'contact':
                return <ContactPage onNavigate={handleNavigate} onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />;
            case 'home':
            default:
                return <LandingPage onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} onNavigate={handleNavigate} />;
        }
    };

    return (
        <div className={`${theme} transition-colors duration-300`}>
            {renderPublicPage()}
            {authMode && (
                <AuthModal 
                    mode={authMode}
                    onClose={() => setAuthMode(null)}
                    onLoginSuccess={() => {
                        setAuthMode(null);
                        setIsLoggedIn(true);
                    }}
                />
            )}
        </div>
    );
}
