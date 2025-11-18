-- =====================================================
-- POLÍTICAS RLS PARA PRODUCCIÓN CON SUPABASE AUTH
-- =====================================================

-- Eliminar TODAS las políticas existentes
-- Políticas antiguas
DROP POLICY IF EXISTS "Enable read access for all users" ON cms_hero;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON cms_hero;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON cms_hero;
DROP POLICY IF EXISTS "Allow all operations" ON cms_hero;

DROP POLICY IF EXISTS "Enable read access for all users" ON cms_features;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON cms_features;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON cms_features;
DROP POLICY IF EXISTS "Allow all operations" ON cms_features;

DROP POLICY IF EXISTS "Enable read access for all users" ON cms_footer;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON cms_footer;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON cms_footer;
DROP POLICY IF EXISTS "Allow all operations" ON cms_footer;

DROP POLICY IF EXISTS "Enable read access for all users" ON cms_seo;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON cms_seo;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON cms_seo;
DROP POLICY IF EXISTS "Allow all operations" ON cms_seo;

DROP POLICY IF EXISTS "Enable read access for all users" ON cms_legal;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON cms_legal;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON cms_legal;
DROP POLICY IF EXISTS "Allow all operations" ON cms_legal;

DROP POLICY IF EXISTS "Allow all operations" ON cms_brand;

-- Políticas nuevas (por si ya se ejecutaron antes)
DROP POLICY IF EXISTS "Public read access" ON cms_hero;
DROP POLICY IF EXISTS "Authenticated users can insert" ON cms_hero;
DROP POLICY IF EXISTS "Authenticated users can update" ON cms_hero;
DROP POLICY IF EXISTS "Authenticated users can delete" ON cms_hero;

DROP POLICY IF EXISTS "Public read access" ON cms_features;
DROP POLICY IF EXISTS "Authenticated users can insert" ON cms_features;
DROP POLICY IF EXISTS "Authenticated users can update" ON cms_features;
DROP POLICY IF EXISTS "Authenticated users can delete" ON cms_features;

DROP POLICY IF EXISTS "Public read access" ON cms_footer;
DROP POLICY IF EXISTS "Authenticated users can insert" ON cms_footer;
DROP POLICY IF EXISTS "Authenticated users can update" ON cms_footer;
DROP POLICY IF EXISTS "Authenticated users can delete" ON cms_footer;

DROP POLICY IF EXISTS "Public read access" ON cms_seo;
DROP POLICY IF EXISTS "Authenticated users can insert" ON cms_seo;
DROP POLICY IF EXISTS "Authenticated users can update" ON cms_seo;
DROP POLICY IF EXISTS "Authenticated users can delete" ON cms_seo;

DROP POLICY IF EXISTS "Public read access" ON cms_legal;
DROP POLICY IF EXISTS "Authenticated users can insert" ON cms_legal;
DROP POLICY IF EXISTS "Authenticated users can update" ON cms_legal;
DROP POLICY IF EXISTS "Authenticated users can delete" ON cms_legal;

DROP POLICY IF EXISTS "Public read access" ON cms_brand;
DROP POLICY IF EXISTS "Authenticated users can insert" ON cms_brand;
DROP POLICY IF EXISTS "Authenticated users can update" ON cms_brand;
DROP POLICY IF EXISTS "Authenticated users can delete" ON cms_brand;

-- =====================================================
-- NUEVAS POLÍTICAS CON AUTENTICACIÓN REAL
-- =====================================================

-- Políticas para cms_hero
CREATE POLICY "Public read access" ON cms_hero FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert" ON cms_hero FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update" ON cms_hero FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete" ON cms_hero FOR DELETE USING (auth.uid() IS NOT NULL);

-- Políticas para cms_features
CREATE POLICY "Public read access" ON cms_features FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert" ON cms_features FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update" ON cms_features FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete" ON cms_features FOR DELETE USING (auth.uid() IS NOT NULL);

-- Políticas para cms_footer
CREATE POLICY "Public read access" ON cms_footer FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert" ON cms_footer FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update" ON cms_footer FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete" ON cms_footer FOR DELETE USING (auth.uid() IS NOT NULL);

-- Políticas para cms_seo
CREATE POLICY "Public read access" ON cms_seo FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert" ON cms_seo FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update" ON cms_seo FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete" ON cms_seo FOR DELETE USING (auth.uid() IS NOT NULL);

-- Políticas para cms_legal
CREATE POLICY "Public read access" ON cms_legal FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert" ON cms_legal FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update" ON cms_legal FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete" ON cms_legal FOR DELETE USING (auth.uid() IS NOT NULL);

-- Políticas para cms_brand
CREATE POLICY "Public read access" ON cms_brand FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert" ON cms_brand FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update" ON cms_brand FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete" ON cms_brand FOR DELETE USING (auth.uid() IS NOT NULL);
