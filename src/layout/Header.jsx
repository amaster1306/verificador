import React from 'react';
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
export default Header;
