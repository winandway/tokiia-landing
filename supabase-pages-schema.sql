-- =====================================================
-- TABLA PARA GESTIÓN DE PÁGINAS DINÁMICAS
-- =====================================================

CREATE TABLE IF NOT EXISTS cms_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  featured_image TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas por slug
CREATE INDEX IF NOT EXISTS idx_cms_pages_slug ON cms_pages(slug);

-- Índice para páginas publicadas
CREATE INDEX IF NOT EXISTS idx_cms_pages_published ON cms_pages(is_published);

-- Habilitar RLS
ALTER TABLE cms_pages ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para cms_pages
DROP POLICY IF EXISTS "Public read access for published pages" ON cms_pages;
DROP POLICY IF EXISTS "Authenticated users can read all pages" ON cms_pages;
DROP POLICY IF EXISTS "Authenticated users can insert" ON cms_pages;
DROP POLICY IF EXISTS "Authenticated users can update" ON cms_pages;
DROP POLICY IF EXISTS "Authenticated users can delete" ON cms_pages;

-- Lectura pública solo de páginas publicadas
CREATE POLICY "Public read access for published pages" ON cms_pages
  FOR SELECT
  USING (is_published = true OR auth.uid() IS NOT NULL);

-- Usuarios autenticados pueden hacer todo
CREATE POLICY "Authenticated users can insert" ON cms_pages
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update" ON cms_pages
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete" ON cms_pages
  FOR DELETE
  USING (auth.uid() IS NOT NULL);
