-- =====================================================
-- LIMPIEZA COMPLETA DE POLÍTICAS CONFLICTIVAS
-- ⚠️ EJECUTAR ESTE SCRIPT PRIMERO
-- =====================================================

-- Eliminar TODAS las políticas antiguas de las tablas CMS
DO $$
DECLARE
    r RECORD;
BEGIN
    -- Eliminar todas las políticas de todas las tablas cms_*
    FOR r IN (
        SELECT schemaname, tablename, policyname
        FROM pg_policies
        WHERE schemaname = 'public'
        AND tablename LIKE 'cms_%'
    ) LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I',
            r.policyname, r.schemaname, r.tablename);
        RAISE NOTICE 'Dropped policy % on table %', r.policyname, r.tablename;
    END LOOP;
END $$;

-- Eliminar políticas de storage.objects para el bucket tokiia
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT policyname
        FROM pg_policies
        WHERE schemaname = 'storage'
        AND tablename = 'objects'
        AND policyname LIKE '%tokiia%' OR policyname LIKE '%public%'
    ) LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', r.policyname);
        RAISE NOTICE 'Dropped storage policy %', r.policyname;
    END LOOP;
END $$;

-- =====================================================
-- CREAR POLÍTICAS PERMISIVAS SIMPLES
-- =====================================================

-- cms_config
CREATE POLICY "enable_all_access" ON cms_config FOR ALL TO public USING (true) WITH CHECK (true);

-- cms_hero
CREATE POLICY "enable_all_access" ON cms_hero FOR ALL TO public USING (true) WITH CHECK (true);

-- cms_features
CREATE POLICY "enable_all_access" ON cms_features FOR ALL TO public USING (true) WITH CHECK (true);

-- cms_footer
CREATE POLICY "enable_all_access" ON cms_footer FOR ALL TO public USING (true) WITH CHECK (true);

-- cms_brand
CREATE POLICY "enable_all_access" ON cms_brand FOR ALL TO public USING (true) WITH CHECK (true);

-- cms_seo
CREATE POLICY "enable_all_access" ON cms_seo FOR ALL TO public USING (true) WITH CHECK (true);

-- cms_legal
CREATE POLICY "enable_all_access" ON cms_legal FOR ALL TO public USING (true) WITH CHECK (true);

-- cms_pages
CREATE POLICY "enable_all_access" ON cms_pages FOR ALL TO public USING (true) WITH CHECK (true);

-- cms_admins (solo lectura)
CREATE POLICY "enable_read_access" ON cms_admins FOR SELECT TO public USING (true);

-- =====================================================
-- STORAGE BUCKET POLICIES
-- =====================================================

-- Eliminar políticas antiguas de storage
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public reads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;

-- Política única para TODOS los buckets públicos
CREATE POLICY "public_bucket_access"
ON storage.objects FOR ALL
TO public
USING (bucket_id = 'tokiia')
WITH CHECK (bucket_id = 'tokiia');

-- =====================================================
-- VERIFICACIÓN FINAL
-- =====================================================

-- Ver SOLO las políticas que quedan
SELECT
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    CASE
        WHEN qual = 'true'::text THEN '✅ PERMITE TODO'
        ELSE '⚠️ ' || qual
    END as condition
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Contar políticas por tabla
SELECT
    tablename,
    COUNT(*) as num_policies
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY tablename
ORDER BY tablename;
