import React, { useState } from 'react';
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
export default ProfilePage;
