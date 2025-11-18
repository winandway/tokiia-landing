# 🚀 Tokiia Landing Page + CMS

Landing page profesional con CMS integrado para Tokiia Wallet, construida con Next.js 14, TypeScript, Tailwind CSS y Supabase.

## ✨ Características

- 🎨 **Landing page moderna** con diseño morado/negro
- 🔐 **CMS completo** protegido con autenticación
- 📊 **Dashboard administrativo** intuitivo
- 🎯 **Gestión de contenido** (Hero, Features, Footer)
- 🎨 **Personalización de marca** (Logos, colores)
- 🔍 **Configuración SEO** completa
- 📱 **Diseño responsive**
- ⚡ **Optimizado** con Next.js 14 App Router
- 💾 **Base de datos Supabase** con Row Level Security

## 🛠️ Stack Técnico

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Base de datos:** Supabase
- **Autenticación:** Supabase Auth
- **UI Components:** shadcn/ui + Radix UI
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React

## 📦 Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

#### a) Crear proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Copia tus credenciales (ya están en `.env.local`)

#### b) Ejecutar el schema de base de datos
1. Abre el SQL Editor en Supabase Dashboard
2. Ejecuta el contenido del archivo `supabase-schema.sql`
3. Esto creará todas las tablas y datos iniciales

#### c) Configurar autenticación
1. En Supabase Dashboard, ve a **Authentication > Providers**
2. Habilita "Email" como proveedor
3. Ve a **Authentication > Users**
4. Crea un usuario admin manualmente:
   - Email: tu-email@gmail.com
   - Password: tu-contraseña-segura
5. Copia el UUID del usuario
6. En SQL Editor, ejecuta:
```sql
INSERT INTO cms_admins (id, email, role) VALUES
('UUID-DEL-USUARIO', 'tu-email@gmail.com', 'admin');
```

### 3. Variables de entorno

El archivo `.env.local` ya está configurado con tus credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://dkpqdkqpmjoexdfbhmeh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🚀 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📂 Estructura del Proyecto

```
├── app/
│   ├── (public)/          # Rutas públicas
│   │   └── page.tsx       # Landing principal
│   ├── (admin)/           # Rutas protegidas
│   │   └── cms-admin/     # Panel CMS
│   │       ├── login/     # Login del CMS
│   │       ├── dashboard/ # Dashboard principal
│   │       ├── content/   # Editores de contenido
│   │       ├── brand/     # Gestión de marca
│   │       ├── seo/       # Configuración SEO
│   │       └── legal/     # Documentos legales
│   ├── layout.tsx         # Layout principal
│   └── globals.css        # Estilos globales
├── components/
│   ├── landing/           # Componentes de la landing
│   │   ├── HeroSection.tsx
│   │   ├── Features.tsx
│   │   └── Footer.tsx
│   ├── cms/               # Componentes del CMS
│   └── ui/                # Componentes UI (shadcn)
├── lib/
│   ├── supabase.ts        # Cliente de Supabase
│   └── utils.ts           # Utilidades
├── middleware.ts          # Protección de rutas
├── supabase-schema.sql    # Schema de la base de datos
└── tailwind.config.ts     # Configuración de Tailwind

```

## 🎨 Paleta de Colores

```css
--primary: #8B5CF6         /* Morado principal */
--primary-dark: #7C3AED    /* Morado oscuro */
--accent-green: #10B981    /* Verde para recibir */
--accent-blue: #3B82F6     /* Azul para swap */
--bg-dark: #0F0F14         /* Fondo negro */
--bg-card: #1A1A23         /* Cards oscuras */
--bg-secondary: #252530    /* Fondo secundario */
--border: #2D2D3A          /* Bordes */
```

## 🔑 Acceso al CMS

1. **URL del CMS:** http://localhost:3000/cms-admin
2. **Login:** http://localhost:3000/cms-admin/login
3. **Credenciales:** El usuario que configuraste en Supabase Auth

## 📋 Funcionalidades del CMS

### Dashboard
- Vista general del sitio
- Accesos rápidos a secciones principales
- Estadísticas básicas

### Contenido
- **Hero Banner:** Edita título, subtítulo y botones CTA
- **Features:** Gestiona características con iconos, títulos y descripciones
- **Footer:** Configura enlaces, redes sociales y copyright

### Marca
- **Logos:** Sube y gestiona logos (claro/oscuro)
- **Colores:** Personaliza la paleta de colores

### SEO
- **Meta Tags:** Configura título, descripción y keywords
- **Google Analytics:** Integra tracking de Google
- **Google Search Console:** Verifica tu sitio

### Legal
- **Términos y Condiciones:** Editor de documentos legales
- **Política de Privacidad:** Gestión de políticas

## 🔒 Seguridad

- ✅ Row Level Security (RLS) habilitado en todas las tablas
- ✅ Middleware de protección de rutas
- ✅ Autenticación con Supabase Auth
- ✅ Validación de usuarios admin

## 🚢 Despliegue

### Vercel (Recomendado)

1. Push tu código a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Añade las variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Despliega

### Otras plataformas

Funciona en cualquier plataforma que soporte Next.js 14:
- Netlify
- Railway
- AWS Amplify
- etc.

## 📝 Tareas Pendientes (Opcional)

- [ ] Implementar editor de Footer
- [ ] Agregar editor WYSIWYG para términos y privacidad
- [ ] Implementar gestión de logos y favicon
- [ ] Añadir subida de imágenes a Supabase Storage
- [ ] Crear páginas de Términos, Privacidad y About
- [ ] Agregar más páginas al CMS
- [ ] Implementar sistema de roles (admin/editor)
- [ ] Añadir preview en tiempo real
- [ ] Integrar Google Analytics
- [ ] Crear sitemap.xml automático

## 🐛 Solución de Problemas

### Error de autenticación
- Verifica que creaste un usuario en Supabase Auth
- Asegúrate de que el usuario está en la tabla `cms_admins`
- Revisa que las credenciales en `.env.local` sean correctas

### Error al guardar datos
- Verifica que ejecutaste el schema SQL completo
- Revisa las políticas RLS en Supabase
- Asegúrate de estar autenticado correctamente

### Estilos no se aplican
- Ejecuta `npm run dev` de nuevo
- Limpia la caché: `rm -rf .next`

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador
2. Verifica los logs de Supabase
3. Asegúrate de que todas las dependencias están instaladas

## 📄 Licencia

Este proyecto es propiedad de Tokiia. Todos los derechos reservados.

---

**Desarrollado con ❤️ para Tokiia**
