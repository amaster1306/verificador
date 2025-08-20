
import React from 'react';
import { ChevronRight, Building, Briefcase, Users, Server, Mic, Fingerprint, BarChart, CheckCircle, Quote, Twitter, Linkedin, Facebook } from 'lucide-react';
import Header from '../layout/Header';

const FAQItem = ({ question, children }) => (
  <details className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:bg-gray-700/50 open:bg-gray-700/50">
    <summary className="font-semibold text-lg list-none flex justify-between items-center">
      {question}
      <ChevronRight className="transform transition-transform duration-300 h-5 w-5 details-arrow" />
    </summary>
    <p className="mt-2 text-gray-400">{children}</p>
  </details>
);

const LandingPage = ({ onRegisterClick, onLoginClick }) => (
  <div className="bg-gray-900 text-white min-h-screen overflow-x-hidden">
    <Header onNavigate={() => {}} onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
    <style>{`.details-arrow { transition: transform 0.3s; } details[open] .details-arrow { transform: rotate(90deg); }`}</style>
    {/* Hero Section */}
    <section id="hero" className="relative h-[80vh] flex flex-col items-center justify-center p-4 text-center overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(17, 24, 39, 0) 0%, #111827 80%), repeating-linear-gradient(0deg, rgba(37, 99, 235, 0.1) 0px, rgba(37, 99, 235, 0.1) 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, rgba(37, 99, 235, 0.1) 0px, rgba(37, 99, 235, 0.1) 1px, transparent 1px, transparent 24px)'}}>
      <div className="relative z-10 pt-20">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">Tu Inversión en Radio,<br />AHORA Verificada.</h2>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">Monitoreamos, verificamos y reportamos cada una de tus pautas publicitarias en radios de todo Chile con precisión absoluta.</p>
        <button className="mt-8 inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105" onClick={onRegisterClick}>Comienza Ahora <ChevronRight className="ml-2 h-6 w-6" /></button>
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

    {/* Features Section */}
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

    {/* Service Section */}
    <section id="servicios" className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-2">Nuestro Servicio</h2>
        <div className="max-w-2xl mx-auto mt-12"><div className="bg-gray-900 p-8 rounded-lg border border-gray-700"><Fingerprint className="h-12 w-12 text-blue-500 mx-auto mb-4" /><h3 className="text-2xl font-bold mb-2">Verificación de Anuncios</h3><p className="text-gray-400">Aseguramos con precisión de 99.9% que tus comerciales exactos fueron emitidos en las radios y horarios correctos, utilizando tecnología de Audio Fingerprinting.</p></div></div>
      </div>
    </section>

    {/* Testimonials Section */}
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

    {/* Pricing Section */}
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

    {/* FAQ Section */}
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

    {/* Contact Section */}
    <section id="contacto" className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-2">¿Listo para tener el control total de tu pauta en radio?</h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">Hablemos sobre cómo OndaVerificada puede potenciar tu estrategia de medios.</p>
        <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">Contáctanos</button>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <h3 className="text-xl font-bold text-white mb-2">Onda<span className="text-blue-500">Verificada</span></h3>
        <div className="flex justify-center gap-6 my-6">
          <a href="#" className="hover:text-white transition-colors"><Twitter /></a>
          <a href="#" className="hover:text-white transition-colors"><Linkedin /></a>
          <a href="#" className="hover:text-white transition-colors"><Facebook /></a>
        </div>
        <nav className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-sm mb-6">
          <button className="hover:text-white transition-colors">Servicios</button>
          <button className="hover:text-white transition-colors">Precios</button>
          <button className="hover:text-white transition-colors">Quiénes Somos</button>
          <button className="hover:text-white transition-colors">Términos de Servicio</button>
          <button className="hover:text-white transition-colors">Política de Privacidad</button>
        </nav>
        <p className="text-xs">&copy; {new Date().getFullYear()} OndaVerificada. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
);

export default LandingPage;
