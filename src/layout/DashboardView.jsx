import React, { useState, useEffect, useRef, useMemo } from 'react';
import StatCard from '../components/StatCard';
import AudioPlayerModal from '../components/AudioPlayerModal';
import AdjacencyModal from '../components/AdjacencyModal';
import TagAdModal from '../components/TagAdModal';
import PDFReportModal from '../components/PDFReportModal';
import { initialRadios, initialKnownAds, initialDetections, initialUnidentifiedAds, initialTeamMembers } from '../data/mockData';
import DashboardHomePage from '../pages/DashboardHomePage';
import AdInboxPage from '../pages/AdInboxPage';
import IntelligencePage from '../pages/IntelligencePage';
import TeamPage from '../pages/TeamPage';
import HelpPage from '../pages/HelpPage';
import ProfilePage from '../pages/ProfilePage';
import BillingPage from '../pages/BillingPage';
import MyAdsPage from '../pages/MyAdsPage';
import { BarChart, Library, Inbox, PieChart, Users2, CreditCard, HelpCircle, User, LogOut, Sun, Moon, Bell, Sliders, Eye, RadioTower, Download, Share2, PlayCircle, ChevronRight, X } from 'lucide-react';

const DashboardView = ({ onLogout, theme, toggleTheme, onNavigateToPricing }) => {
	const [activeTab, setActiveTab] = useState('intelligence');
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
export default DashboardView;
