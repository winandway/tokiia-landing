-- =====================================================
-- TOKIIA CMS DATABASE SCHEMA
-- Ejecutar este script en Supabase SQL Editor
-- =====================================================

-- Configuración del CMS
CREATE TABLE IF NOT EXISTS cms_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Contenido del Hero/Banner
CREATE TABLE IF NOT EXISTS cms_hero (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  cta_text TEXT,
  cta_url TEXT,
  background_image TEXT,
  is_active BOOLEAN DEFAULT true,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Características/Features
CREATE TABLE IF NOT EXISTS cms_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon TEXT,
  title TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT 'purple',
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Configuración del Footer
CREATE TABLE IF NOT EXISTS cms_footer (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  links JSONB,
  social_media JSONB,
  copyright_text TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Configuración de marca
CREATE TABLE IF NOT EXISTS cms_brand (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url TEXT,
  logo_dark_url TEXT,
  favicon_url TEXT,
  brand_name TEXT DEFAULT 'Tokiia',
  tagline TEXT,
  primary_color TEXT DEFAULT '#8B5CF6',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- SEO y Meta tags
CREATE TABLE IF NOT EXISTS cms_seo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_route TEXT UNIQUE NOT NULL,
  title TEXT,
  description TEXT,
  keywords TEXT[],
  og_image TEXT,
  google_analytics_id TEXT,
  google_console_key TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Documentos legales
CREATE TABLE IF NOT EXISTS cms_legal (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doc_type TEXT NOT NULL,
  content TEXT NOT NULL,
  version TEXT,
  published_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Usuarios admin del CMS
CREATE TABLE IF NOT EXISTS cms_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'editor',
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- DATOS INICIALES (SEED DATA)
-- =====================================================

-- Hero inicial
INSERT INTO cms_hero (title, subtitle, cta_text, cta_url, is_active) VALUES
('Tokiia Wallet', 'Tu billetera Web3 descentralizada con P2P integrado', 'Abrir Wallet', 'https://app.tokiia.com', true)
ON CONFLICT DO NOTHING;

-- Features iniciales
INSERT INTO cms_features (icon, title, description, color, order_index) VALUES
('↑', 'Enviar', 'Envía cripto instantáneamente a cualquier dirección', 'purple', 1),
('↓', 'Recibir', 'Recibe pagos sin complicaciones con tu dirección única', 'green', 2),
('⇄', 'Swap', 'Intercambia tokens al instante con las mejores tasas', 'blue', 3),
('🔒', 'Seguro', 'Tus claves privadas siempre bajo tu control', 'purple', 4),
('⚡', 'Rápido', 'Transacciones ultrarrápidas en múltiples redes', 'blue', 5),
('🌐', 'P2P', 'Intercambio directo persona a persona integrado', 'green', 6)
ON CONFLICT DO NOTHING;

-- Footer inicial
INSERT INTO cms_footer (section, links, social_media, copyright_text) VALUES
('main',
'{"columns": [{"title": "Producto", "links": [{"text": "Features", "url": "#features"}, {"text": "Seguridad", "url": "#security"}, {"text": "Roadmap", "url": "#roadmap"}]}, {"title": "Compañía", "links": [{"text": "Acerca de", "url": "/about"}, {"text": "Blog", "url": "/blog"}, {"text": "Contacto", "url": "/contact"}]}, {"title": "Legal", "links": [{"text": "Términos", "url": "/terms"}, {"text": "Privacidad", "url": "/privacy"}]}]}'::jsonb,
'{"twitter": "https://twitter.com/tokiia", "telegram": "https://t.me/tokiia", "discord": "https://discord.gg/tokiia"}'::jsonb,
'© 2024 Tokiia. Todos los derechos reservados.'
)
ON CONFLICT DO NOTHING;

-- Brand config inicial
INSERT INTO cms_brand (brand_name, tagline, primary_color, logo_url) VALUES
('Tokiia', 'Tu billetera Web3 descentralizada', '#8B5CF6', '/logo.svg')
ON CONFLICT DO NOTHING;

-- SEO inicial para home
INSERT INTO cms_seo (page_route, title, description, keywords) VALUES
('/', 'Tokiia - Billetera Web3 P2P Descentralizada', 'La billetera cripto más avanzada con P2P integrado. Envía, recibe e intercambia criptomonedas de forma segura.', ARRAY['wallet', 'cripto', 'P2P', 'blockchain', 'Web3', 'DeFi'])
ON CONFLICT DO NOTHING;

-- =====================================================
-- POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY)
-- =====================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE cms_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_footer ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_brand ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_seo ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_legal ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_admins ENABLE ROW LEVEL SECURITY;

-- Políticas: Todos pueden leer (para mostrar en la landing)
CREATE POLICY "Public read access" ON cms_config FOR SELECT USING (true);
CREATE POLICY "Public read access" ON cms_hero FOR SELECT USING (true);
CREATE POLICY "Public read access" ON cms_features FOR SELECT USING (true);
CREATE POLICY "Public read access" ON cms_footer FOR SELECT USING (true);
CREATE POLICY "Public read access" ON cms_brand FOR SELECT USING (true);
CREATE POLICY "Public read access" ON cms_seo FOR SELECT USING (true);
CREATE POLICY "Public read access" ON cms_legal FOR SELECT USING (true);

-- Políticas: Solo admins autenticados pueden editar
-- NOTA: Ajustar según tu sistema de autenticación
CREATE POLICY "Admin write access" ON cms_config FOR ALL USING (
  auth.uid() IN (SELECT id FROM cms_admins WHERE email = auth.jwt() ->> 'email')
);

CREATE POLICY "Admin write access" ON cms_hero FOR ALL USING (
  auth.uid() IN (SELECT id FROM cms_admins WHERE email = auth.jwt() ->> 'email')
);

CREATE POLICY "Admin write access" ON cms_features FOR ALL USING (
  auth.uid() IN (SELECT id FROM cms_admins WHERE email = auth.jwt() ->> 'email')
);

CREATE POLICY "Admin write access" ON cms_footer FOR ALL USING (
  auth.uid() IN (SELECT id FROM cms_admins WHERE email = auth.jwt() ->> 'email')
);

CREATE POLICY "Admin write access" ON cms_brand FOR ALL USING (
  auth.uid() IN (SELECT id FROM cms_admins WHERE email = auth.jwt() ->> 'email')
);

CREATE POLICY "Admin write access" ON cms_seo FOR ALL USING (
  auth.uid() IN (SELECT id FROM cms_admins WHERE email = auth.jwt() ->> 'email')
);

CREATE POLICY "Admin write access" ON cms_legal FOR ALL USING (
  auth.uid() IN (SELECT id FROM cms_admins WHERE email = auth.jwt() ->> 'email')
);

-- =====================================================
-- FUNCIONES ÚTILES
-- =====================================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_cms_config_updated_at BEFORE UPDATE ON cms_config
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_hero_updated_at BEFORE UPDATE ON cms_hero
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_features_updated_at BEFORE UPDATE ON cms_features
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_footer_updated_at BEFORE UPDATE ON cms_footer
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_brand_updated_at BEFORE UPDATE ON cms_brand
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_seo_updated_at BEFORE UPDATE ON cms_seo
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_legal_updated_at BEFORE UPDATE ON cms_legal
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
