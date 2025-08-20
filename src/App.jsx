import React, { useState } from 'react';
import DashboardView from './layout/DashboardView';
import AuthModal from './components/AuthModal';
import LandingPage from './pages/LandingPage';
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
    return (
        <div className={`${theme} transition-colors duration-300`}>
            <LandingPage 
                onRegisterClick={() => setAuthMode('register')}
                onLoginClick={() => setAuthMode('login')}
            />
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
