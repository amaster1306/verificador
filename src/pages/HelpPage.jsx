import React from 'react';
import { Upload, Cpu, Inbox, BarChart2 } from 'lucide-react';
const HelpCard = ({ icon, title, children }) => (
    <div className="bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <div className="flex items-center mb-3">
            <div className="p-2 bg-blue-500/20 rounded-full mr-4">{React.cloneElement(icon, { className: "h-6 w-6 text-blue-400" })}</div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-400">{children}</p>
    </div>
);
const HelpPage = () => (
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
export default HelpPage;
