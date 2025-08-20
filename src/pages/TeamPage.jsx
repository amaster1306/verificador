import React, { useState } from 'react';
import { Trash2, PlusCircle } from 'lucide-react';
import { initialTeamMembers } from '../data/mockData';
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
export default TeamPage;
