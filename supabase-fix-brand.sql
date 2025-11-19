-- =====================================================
-- LIMPIAR Y RESETEAR TABLA cms_brand
-- =====================================================

-- Paso 1: Ver la estructura actual de la tabla
SELECT * FROM cms_brand LIMIT 1;

-- Paso 2: Eliminar TODOS los registros
DELETE FROM cms_brand;

-- Paso 3: Insertar un registro limpio (solo con columnas que sabemos que existen)
INSERT INTO cms_brand (
  id,
  brand_name
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Tokiia'
);

-- Paso 4: Verificar el resultado
SELECT * FROM cms_brand;
