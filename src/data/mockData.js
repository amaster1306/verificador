// Datos y constantes compartidas
export const initialRadios = [
    { id: 1, name: 'Canal 95', region: 'Antofagasta', city: 'Antofagasta' },
    { id: 2, name: 'Cappíssima Multimedial', region: 'Arica y Parinacota', city: 'Arica' },
    { id: 3, name: 'El Conquistador FM (Concepción)', region: 'Biobío', city: 'Concepción' },
    { id: 4, name: 'El Conquistador FM (La Serena)', region: 'Coquimbo', city: 'La Serena' },
    { id: 5, name: 'El Conquistador FM (Valdivia)', region: 'Los Ríos', city: 'Valdivia' },
    { id: 30, name: 'Radio Paloma', region: 'Maule', city: 'Talca' },
    { id: 32, name: 'Radio Polar', region: 'Magallanes', city: 'Punta Arenas' },
    { id: 37, name: 'Radio Sago', region: 'Los Lagos', city: 'Osorno' },
    { id: 44, name: 'Radio Universidad de Chile', region: 'Metropolitana', city: 'Santiago' },
];

export const initialKnownAds = [
    { adId: 'FAL_CYBER_30s', brand: 'Falabella', campaign: 'Cyber Day 2025 (30s)', type: 'own', isActive: true },
    { adId: 'ESC_CARACTER_30s', brand: 'Escudo', campaign: 'Hecha con Carácter (30s)', type: 'own', isActive: true },
    { adId: 'MOV_PLAN_FAM_25s', brand: 'Movistar', campaign: 'Plan Familia (25s)', type: 'own', isActive: false },
    { adId: 'SOD_TERRAZA_15s', brand: 'Sodimac', campaign: 'Temporada Terrazas (15s)', type: 'competitor', isActive: true },
    { adId: 'LIDER_OFERTAS_20s', brand: 'Lider', campaign: 'Ofertas de la Semana (20s)', type: 'competitor', isActive: true },
    { adId: 'RIP_CYBER_30s', brand: 'Ripley', campaign: 'Cyber Ripley (30s)', type: 'competitor', isActive: true },
    { adId: 'TOTTUS_PRECIOS_20s', brand: 'Tottus', campaign: 'Precios Bajos (20s)', type: 'competitor', isActive: true },
    { adId: 'PARIS_DECO_15s', brand: 'Paris', campaign: 'Renueva tu Hogar (15s)', type: 'competitor', isActive: true },
    { adId: 'WOM_GIGAS_30s', brand: 'WOM', campaign: 'Pórtate y obtén más Gigas (30s)', type: 'competitor', isActive: true },
    { adId: 'CLARO_5G_25s', brand: 'Claro', campaign: 'La velocidad del 5G (25s)', type: 'competitor', isActive: true },
];

export const generateDetections = (count) => {
    const detections = [];
    const competitorAds = initialKnownAds.filter(ad => ad.type === 'competitor');
    for (let i = 0; i < count; i++) {
        const randomAd = competitorAds[Math.floor(Math.random() * competitorAds.length)];
        const randomRadio = initialRadios[Math.floor(Math.random() * initialRadios.length)];
        const randomTimestamp = new Date(Date.now() - Math.floor(Math.random() * 15 * 24 * 60 * 60 * 1000));
        detections.push({
            id: 200 + i,
            radioId: randomRadio.id,
            adId: randomAd.adId,
            timestamp: randomTimestamp,
            audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(i % 16) + 1}.mp3`,
            classification: Math.random() > 0.4 ? 'offer' : 'branding',
            estimatedCost: 50000 + Math.floor(Math.random() * 50000),
            context: { before: 'Música', after: 'Noticias' }
        });
    }
    return detections;
};

export const initialDetections = [
    { id: 101, radioId: 1, adId: 'FAL_CYBER_30s', timestamp: new Date('2025-08-15T08:15:30.000Z'), audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', classification: 'offer', estimatedCost: 75000, context: { before: 'Mención del Tiempo', after: 'Anuncio Lider' } },
    { id: 102, radioId: 3, adId: 'RIP_CYBER_30s', timestamp: new Date('2025-08-15T08:16:00.000Z'), audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', classification: 'offer', estimatedCost: 80000, context: { before: 'Anuncio Falabella', after: 'Canción: "Blinding Lights"' } },
    { id: 103, radioId: 4, adId: 'SOD_TERRAZA_15s', timestamp: new Date('2025-08-15T10:30:00.000Z'), audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', classification: 'branding', estimatedCost: 60000, context: { before: 'Canción: "Levitating"', after: 'Jingle de la Radio' } },
    { id: 104, radioId: 1, adId: 'LIDER_OFERTAS_20s', timestamp: new Date('2025-08-15T11:45:12.000Z'), audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', classification: 'offer', estimatedCost: 65000, context: { before: 'Noticias', after: 'Anuncio Movistar' } },
    ...generateDetections(100)
];

export const initialUnidentifiedAds = [
    { clusterId: 'CLUSTER_001', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', detectionCount: 15, firstSeen: new Date('2025-08-14T00:00:00.000Z'), lastSeen: new Date(), radios: [1, 4, 44] },
    { clusterId: 'CLUSTER_002', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', detectionCount: 8, firstSeen: new Date('2025-08-13T00:00:00.000Z'), lastSeen: new Date(), radios: [3, 30] },
];

export const initialTeamMembers = [
    { id: 1, name: 'Daniel Fuentes', email: 'daniel.fuentes@example.com', role: 'Administrador' },
    { id: 2, name: 'Ana Rojas', email: 'ana.rojas@example.com', role: 'Analista' },
];
