import React from 'react';
import { Twitter, Linkedin, Facebook } from 'lucide-react';
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
export default Footer;
