import React, { useState } from 'react';
import { X, User, Mail, Lock } from 'lucide-react';
const AuthModal = ({ mode = 'login', onClose, onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(mode === 'login');
    const handleSubmit = (e) => {
        e.preventDefault();
        onLoginSuccess();
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{isLogin ? 'Ingresar' : 'Registrarse'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white"><X className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {!isLogin && (
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input type="text" placeholder="Nombre Completo" className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                        )}
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input type="email" placeholder="Correo Electrónico" required className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input type="password" placeholder="Contraseña" required className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                    </div>
                    <button type="submit" className="mt-6 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">{isLogin ? 'Ingresar' : 'Crear Cuenta'}</button>
                    <div className="my-4 flex items-center">
                        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                        <span className="mx-4 text-sm text-gray-500">O</span>
                        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <button type="button" onClick={onLoginSuccess} className="w-full flex items-center justify-center gap-2 py-3 px-4 border rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                        <span>Ingresar con Google</span>
                    </button>
                    <p className="text-center text-sm mt-6 text-gray-500">
                        {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
                        <button type="button" onClick={() => setIsLogin(!isLogin)} className="font-semibold text-blue-600 hover:underline ml-1">{isLogin ? 'Regístrate' : 'Ingresa'}</button>
                    </p>
                </form>
            </div>
        </div>
    );
};
export default AuthModal;
