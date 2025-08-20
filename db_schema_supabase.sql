-- Esquema SQL para Supabase (PostgreSQL)
-- Proyecto: OndaVerificada

-- Tabla de usuarios
CREATE TABLE usuarios (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    empresa VARCHAR(100),
    cargo VARCHAR(100),
    password_hash VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP DEFAULT NOW()
);

-- Tabla de equipos (team)
CREATE TABLE equipos (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    creado_en TIMESTAMP DEFAULT NOW()
);

-- Relación usuario-equipo
CREATE TABLE equipo_miembros (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    equipo_id uuid REFERENCES equipos(id) ON DELETE CASCADE,
    usuario_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
    rol VARCHAR(50) DEFAULT 'Analista',
    creado_en TIMESTAMP DEFAULT NOW()
);

-- Tabla de radios
CREATE TABLE radios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    region VARCHAR(100),
    ciudad VARCHAR(100)
);

-- Tabla de anuncios (ads)
CREATE TABLE anuncios (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    ad_id VARCHAR(50) UNIQUE NOT NULL,
    marca VARCHAR(100) NOT NULL,
    campania VARCHAR(150),
    tipo VARCHAR(20) CHECK (tipo IN ('own', 'competitor')),
    activo BOOLEAN DEFAULT TRUE,
    usuario_id uuid REFERENCES usuarios(id),
    creado_en TIMESTAMP DEFAULT NOW()
);

-- Tabla de detecciones
CREATE TABLE detecciones (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    radio_id INTEGER REFERENCES radios(id),
    anuncio_id uuid REFERENCES anuncios(id),
    timestamp TIMESTAMP NOT NULL,
    audio_url TEXT,
    clasificacion VARCHAR(20) CHECK (clasificacion IN ('offer', 'branding')),
    costo_estimado INTEGER,
    contexto_antes VARCHAR(150),
    contexto_despues VARCHAR(150)
);

-- Tabla de clusters de anuncios no identificados
CREATE TABLE clusters_anuncios (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    audio_url TEXT,
    cantidad_detecciones INTEGER,
    primera_vez TIMESTAMP,
    ultima_vez TIMESTAMP,
    radios INTEGER[]
);

-- Tabla de facturas
CREATE TABLE facturas (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id uuid REFERENCES usuarios(id),
    fecha TIMESTAMP NOT NULL,
    monto INTEGER NOT NULL,
    estado VARCHAR(20) CHECK (estado IN ('Pagada', 'Pendiente')),
    metodo_pago VARCHAR(50),
    creado_en TIMESTAMP DEFAULT NOW()
);

-- Tabla de notificaciones
CREATE TABLE notificaciones (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id uuid REFERENCES usuarios(id),
    mensaje TEXT NOT NULL,
    leida BOOLEAN DEFAULT FALSE,
    creada_en TIMESTAMP DEFAULT NOW()
);

-- Tabla de precios/planes
CREATE TABLE planes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    precio INTEGER NOT NULL,
    descripcion TEXT
);

-- Relación usuario-plan
CREATE TABLE usuario_plan (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id uuid REFERENCES usuarios(id),
    plan_id INTEGER REFERENCES planes(id),
    activo BOOLEAN DEFAULT TRUE,
    fecha_inicio TIMESTAMP DEFAULT NOW()
);
