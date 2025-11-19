-- =====================================================
-- POLÍTICAS DE DESARROLLO (PERMISIVAS)
-- ⚠️ SOLO PARA DESARROLLO - NO USAR EN PRODUCCIÓN
-- =====================================================

-- Eliminar políticas restrictivas existentes
DROP POLICY IF EXISTS "Admin write access" ON cms_config;
DROP POLICY IF EXISTS "Admin write access" ON cms_hero;
DROP POLICY IF EXISTS "Admin write access" ON cms_features;
DROP POLICY IF EXISTS "Admin write access" ON cms_footer;
DROP POLICY IF EXISTS "Admin write access" ON cms_brand;
DROP POLICY IF EXISTS "Admin write access" ON cms_seo;
DROP POLICY IF EXISTS "Admin write access" ON cms_legal;

-- Crear políticas permisivas para desarrollo
-- ⚠️ Permite acceso completo sin autenticación

-- cms_config
CREATE POLICY "Dev full access" ON cms_config FOR ALL USING (true) WITH CHECK (true);

-- cms_hero
CREATE POLICY "Dev full access" ON cms_hero FOR ALL USING (true) WITH CHECK (true);

-- cms_features
CREATE POLICY "Dev full access" ON cms_features FOR ALL USING (true) WITH CHECK (true);

-- cms_footer
CREATE POLICY "Dev full access" ON cms_footer FOR ALL USING (true) WITH CHECK (true);

-- cms_brand
CREATE POLICY "Dev full access" ON cms_brand FOR ALL USING (true) WITH CHECK (true);

-- cms_seo
CREATE POLICY "Dev full access" ON cms_seo FOR ALL USING (true) WITH CHECK (true);

-- cms_legal
CREATE POLICY "Dev full access" ON cms_legal FOR ALL USING (true) WITH CHECK (true);

-- cms_admins (solo lectura)
CREATE POLICY "Dev read access" ON cms_admins FOR SELECT USING (true);

-- =====================================================
-- STORAGE BUCKET POLICIES (para el bucket "tokiia")
-- =====================================================

-- Política para SUBIR archivos (INSERT)
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'tokiia');

-- Política para LEER archivos (SELECT)
CREATE POLICY "Allow public reads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'tokiia');

-- Política para ACTUALIZAR archivos (UPDATE)
CREATE POLICY "Allow public updates"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'tokiia')
WITH CHECK (bucket_id = 'tokiia');

-- Política para ELIMINAR archivos (DELETE)
CREATE POLICY "Allow public deletes"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'tokiia');

-- =====================================================
-- AGREGAR COLUMNA TITLE A cms_legal (si falta)
-- =====================================================

-- Agregar columna title si no existe
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'cms_legal'
        AND column_name = 'title'
    ) THEN
        ALTER TABLE cms_legal ADD COLUMN title TEXT;
    END IF;
END $$;

-- =====================================================
-- VERIFICACIÓN
-- =====================================================

-- Ver todas las políticas activas
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
