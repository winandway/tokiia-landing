# 🚀 Guía Rápida: Configuración de Supabase

## Paso 1: Ejecutar el Schema SQL

1. Ve a tu proyecto de Supabase: https://supabase.com/dashboard
2. Navega a **SQL Editor** (icono de </>) en el menú izquierdo
3. Crea una nueva query
4. Copia y pega todo el contenido de `supabase-schema.sql`
5. Click en **Run** o presiona `Ctrl/Cmd + Enter`
6. Verifica que no haya errores

Esto creará:
- ✅ 8 tablas del CMS
- ✅ Datos iniciales (seed data)
- ✅ Políticas de seguridad (RLS)
- ✅ Triggers para actualizar fechas

## Paso 2: Crear Usuario Admin

### Opción A: Desde el Dashboard (Recomendado)

1. Ve a **Authentication > Users**
2. Click en **Add user** (botón verde)
3. Selecciona **Create new user**
4. Ingresa:
   - Email: `tu-email@gmail.com`
   - Password: `tu-contraseña-segura`
   - ✅ Marca "Auto Confirm User"
5. Click en **Create user**
6. Copia el **UUID** del usuario creado (aparece en la lista)

### Opción B: Con SQL

```sql
-- Crear usuario en auth.users
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'tu-email@gmail.com',
  crypt('tu-contraseña', gen_salt('bf')),
  now(),
  now(),
  now()
);
```

## Paso 3: Agregar Usuario a cms_admins

1. Ve a **SQL Editor**
2. Ejecuta (reemplaza con tu UUID y email):

```sql
INSERT INTO cms_admins (id, email, role)
VALUES ('UUID-DEL-USUARIO', 'tu-email@gmail.com', 'admin');
```

**Ejemplo:**
```sql
INSERT INTO cms_admins (id, email, role)
VALUES ('a1b2c3d4-e5f6-4789-g0h1-i2j3k4l5m6n7', 'admin@tokiia.com', 'admin');
```

## Paso 4: Verificar las Tablas

En **Table Editor**, deberías ver:

- ✅ `cms_config`
- ✅ `cms_hero` (con 1 registro inicial)
- ✅ `cms_features` (con 6 registros iniciales)
- ✅ `cms_footer` (con 1 registro inicial)
- ✅ `cms_brand` (con 1 registro inicial)
- ✅ `cms_seo` (con 1 registro inicial)
- ✅ `cms_legal`
- ✅ `cms_admins` (con tu usuario admin)

## Paso 5: Verificar Row Level Security (RLS)

1. Ve a **Authentication > Policies**
2. Selecciona cada tabla
3. Deberías ver políticas como:
   - **Public read access** (SELECT para todos)
   - **Admin write access** (INSERT/UPDATE/DELETE para admins)

## Paso 6: Probar la Autenticación

1. Inicia tu aplicación: `npm run dev`
2. Ve a: http://localhost:3000/cms-admin/login
3. Ingresa el email y contraseña que creaste
4. Deberías ser redirigido a: http://localhost:3000/cms-admin/dashboard

## 🐛 Solución de Problemas

### Error: "relation cms_hero does not exist"
- ✅ Verifica que ejecutaste todo el contenido de `supabase-schema.sql`
- ✅ Refresca el Table Editor

### Error: "Invalid login credentials"
- ✅ Verifica que el email y contraseña son correctos
- ✅ Asegúrate de marcar "Auto Confirm User" al crear el usuario
- ✅ Verifica que el usuario existe en Authentication > Users

### Error: "Permission denied" al guardar en el CMS
- ✅ Verifica que tu usuario está en la tabla `cms_admins`
- ✅ Verifica que las políticas RLS están activas
- ✅ Ejecuta este query para verificar:

```sql
SELECT * FROM cms_admins WHERE email = 'tu-email@gmail.com';
```

### No puedo ver los datos en la landing
- ✅ Verifica que hay datos en las tablas
- ✅ Verifica que is_active = true en cms_hero y cms_features
- ✅ Verifica la consola del navegador por errores

## 📊 Consultas Útiles

### Ver todos los admins
```sql
SELECT * FROM cms_admins;
```

### Ver datos del hero
```sql
SELECT * FROM cms_hero WHERE is_active = true;
```

### Ver features activas
```sql
SELECT * FROM cms_features WHERE is_active = true ORDER BY order_index;
```

### Resetear password de un usuario
```sql
UPDATE auth.users
SET encrypted_password = crypt('nueva-contraseña', gen_salt('bf'))
WHERE email = 'tu-email@gmail.com';
```

## 🎉 ¡Listo!

Una vez completados estos pasos, tu CMS estará completamente funcional y podrás:

- ✅ Editar el Hero Banner
- ✅ Gestionar Features
- ✅ Configurar SEO
- ✅ Personalizar la marca
- ✅ Y mucho más...

---

**¿Necesitas ayuda?** Revisa los logs de Supabase en **Logs > Query Logs** y **Logs > Auth Logs**
