import React from 'react';
import { CreditCard, Download } from 'lucide-react';
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
export default BillingPage;
