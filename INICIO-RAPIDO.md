# 🚀 INICIO RÁPIDO - Tokiia CMS

## ✅ El servidor está corriendo

Tu sitio ya está funcionando en: **http://localhost:3000**

---

## 📝 CREDENCIALES DE ACCESO

### Para entrar al CMS:

1. Ve a: **http://localhost:3000/cms-admin/login**

2. Usa estas credenciales:
   - **Email:** `admin@tokiia.com`
   - **Password:** `tokiia2024`

3. ¡Listo! Ya estás dentro del CMS

---

## 🎯 CÓMO USAR EL CMS

### 1️⃣ Editar el Hero Banner (Sección Principal)
1. En el Dashboard, click en **"Editar Hero Banner"**
2. Cambia el título, subtítulo y botón
3. Click en **"Guardar cambios"**
4. Ve a http://localhost:3000 para ver los cambios

### 2️⃣ Gestionar Features (Características)
1. En el sidebar, click en **"Contenido"** → **Features**
2. Puedes:
   - ✏️ Editar las 6 características existentes
   - ➕ Agregar nuevas features
   - 🗑️ Eliminar features
   - 🎨 Cambiar el color (morado, verde, azul)
3. Click en **"Guardar cambios"**

### 3️⃣ Configurar SEO
1. En el sidebar, click en **"SEO"**
2. Configura:
   - Meta Tags (título, descripción)
   - Google Analytics
   - Keywords

---

## 🔑 CAMBIAR TUS CREDENCIALES

Para cambiar el email y contraseña del admin:

1. Abre el archivo: `app/(admin)/cms-admin/login/page.tsx`
2. Busca las líneas 11-14:
```typescript
const ADMIN_CREDENTIALS = {
  email: 'admin@tokiia.com',
  password: 'tokiia2024'
}
```
3. Cambia el email y password por los tuyos
4. Guarda el archivo
5. El servidor se recargará automáticamente

---

## 🌐 PÁGINAS DISPONIBLES

| URL | Descripción |
|-----|-------------|
| http://localhost:3000 | Landing page pública |
| http://localhost:3000/cms-admin/login | Login del CMS |
| http://localhost:3000/cms-admin/dashboard | Dashboard del CMS |
| http://localhost:3000/cms-admin/content/hero | Editor del Hero |
| http://localhost:3000/cms-admin/content/features | Editor de Features |
| http://localhost:3000/cms-admin/seo/google | Configuración SEO |

---

## ⚠️ IMPORTANTE: BASE DE DATOS

**NOTA:** Actualmente el CMS **NO** guarda los cambios en Supabase porque no has configurado la base de datos.

### Opciones:

#### Opción 1: Usar sin base de datos (Solo desarrollo)
- Los cambios se perderán al recargar la página
- Perfecto para probar y diseñar

#### Opción 2: Configurar Supabase (Recomendado)
1. Sigue las instrucciones en [SETUP-SUPABASE.md](SETUP-SUPABASE.md)
2. Ejecuta el SQL en Supabase
3. Los cambios se guardarán permanentemente

---

## 🛠️ COMANDOS ÚTILES

```bash
# Iniciar el servidor
npm run dev

# Detener el servidor
Presiona Ctrl + C en la terminal

# Instalar dependencias nuevas
npm install

# Ver el puerto en uso
lsof -i:3000
```

---

## 🐛 PROBLEMAS COMUNES

### No puedo ver la página
- ✅ Verifica que el servidor esté corriendo: `npm run dev`
- ✅ Abre: http://localhost:3000
- ✅ Revisa la consola del navegador (F12)

### No puedo entrar al CMS
- ✅ Verifica las credenciales: `admin@tokiia.com` / `tokiia2024`
- ✅ Ve directamente a: http://localhost:3000/cms-admin/login

### Los cambios no se guardan
- ✅ Normal, no has configurado Supabase
- ✅ Para guardar permanentemente, configura Supabase (ver arriba)

### Error en el navegador
- ✅ Refresca la página (F5)
- ✅ Limpia la caché (Ctrl + Shift + R)
- ✅ Revisa la consola (F12 → Console)

---

## 🎨 PERSONALIZACIÓN RÁPIDA

### Cambiar los colores
Edita: `tailwind.config.ts`

### Cambiar el logo
Edita: `app/(admin)/cms-admin/layout.tsx` (línea 77)

### Agregar más páginas
Crea archivos en: `app/(public)/`

---

## 📞 ¿NECESITAS AYUDA?

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Mira la terminal donde corre `npm run dev`
3. Lee los archivos README.md y SETUP-SUPABASE.md

---

**¡Todo listo! Ya puedes empezar a personalizar tu landing page** 🎉
