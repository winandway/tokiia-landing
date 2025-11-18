# 🚀 INSTRUCCIONES DE CONFIGURACIÓN PARA PRODUCCIÓN

## ✅ LO QUE YA ESTÁ LISTO

1. ✅ Autenticación real con Supabase Auth (email/password)
2. ✅ Todos los editores conectados a Supabase:
   - Hero Banner
   - Footer
   - Términos y Condiciones
   - Política de Privacidad
3. ✅ Sistema de carga y guardado funcionando
4. ✅ Políticas RLS preparadas para producción

---

## 📝 PASOS PARA FINALIZAR LA CONFIGURACIÓN

### PASO 1: Actualizar las Políticas RLS

1. Ve a tu proyecto de Supabase: https://supabase.com/dashboard
2. Abre el **SQL Editor**
3. Copia y pega el contenido del archivo `supabase-rls-policies.sql`
4. Ejecuta el SQL haciendo clic en **RUN**

**Esto configura las políticas de seguridad para que:**
- ✅ Todo el mundo pueda **leer** el contenido (público)
- ✅ Solo usuarios **autenticados** pueden **editar** (CMS protegido)

---

### PASO 2: Crear el Usuario Admin

1. Ve a **Authentication** > **Users** en Supabase Dashboard
2. Haz clic en **Add user** > **Create new user**
3. Rellena los datos:
   - **Email**: `admin@tokiia.com` (o el que prefieras)
   - **Password**: Crea una contraseña segura
   - ✅ Marca **Auto Confirm User**
4. Haz clic en **Create user**

**¡IMPORTANTE!** Guarda las credenciales en un lugar seguro, las necesitarás para iniciar sesión en el CMS.

---

### PASO 3: Probar el Sistema

1. Abre tu aplicación en el navegador: http://localhost:3000
2. Ve al CMS: http://localhost:3000/cms-admin/login
3. Inicia sesión con las credenciales que creaste en el Paso 2
4. Prueba editar contenido:
   - ✅ Hero Banner: Cambia el título y guarda
   - ✅ Footer: Agrega/quita enlaces y guarda
   - ✅ Legal: Edita los términos o la política de privacidad

**Si todo funciona correctamente, ¡estás listo para producción!** 🎉

---

## 🔐 SEGURIDAD

### Lo que está protegido:
- ✅ Login con Supabase Auth (email/password)
- ✅ Solo usuarios autenticados pueden editar contenido
- ✅ Las contraseñas están hasheadas por Supabase
- ✅ Políticas RLS activas en todas las tablas

### Para producción:
- Cambia el email y contraseña del admin por valores seguros
- Activa 2FA (autenticación de dos factores) en Supabase si lo deseas
- Revisa los logs de autenticación regularmente

---

## 🛠️ SOLUCIÓN DE PROBLEMAS

### Error: "new row violates row-level security policy"
**Solución:** Ejecuta el archivo `supabase-rls-policies.sql` en el SQL Editor

### Error: "Email o contraseña incorrectos"
**Solución:** Verifica que creaste el usuario en Supabase > Authentication > Users

### Error: "Error al guardar"
**Solución:**
1. Verifica que las políticas RLS estén configuradas
2. Verifica que estés autenticado (cierra sesión y vuelve a entrar)
3. Revisa la consola del navegador para más detalles

---

## 📦 ESTRUCTURA DEL PROYECTO

```
tokiia-landy-vscode/
├── app/
│   ├── (admin)/cms-admin/          # CMS Admin Panel
│   │   ├── login/                  # Login con Supabase Auth
│   │   ├── content/                # Editores de contenido
│   │   │   ├── hero/               # Editor del Hero Banner
│   │   │   └── footer/             # Editor del Footer
│   │   └── legal/                  # Editores legales
│   │       ├── terms/              # Términos y Condiciones
│   │       └── privacy/            # Política de Privacidad
│   └── (public)/                   # Landing page pública
│       ├── page.tsx                # Página principal
│       ├── terms/                  # Términos públicos
│       └── privacy/                # Privacidad pública
├── lib/
│   ├── supabase.ts                 # Cliente de Supabase
│   └── auth-context.tsx            # Contexto de autenticación
├── components/
│   ├── cms/
│   │   └── RichTextEditor.tsx      # Editor WYSIWYG
│   └── landing/
│       ├── HeroSection.tsx
│       ├── Features.tsx
│       └── Footer.tsx
├── supabase-schema.sql             # Schema de la base de datos
├── supabase-rls-policies.sql       # Políticas de seguridad ⬅️ EJECUTA ESTO
└── .env.local                      # Credenciales de Supabase
```

---

## 🚀 DESPLIEGUE A PRODUCCIÓN

Una vez que todo funcione localmente:

1. **Vercel** (recomendado para Next.js):
   - Conecta tu repositorio de GitHub
   - Configura las variables de entorno (.env.local)
   - Deploy automático

2. **Variables de entorno en producción:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
   ```

---

## ✅ CHECKLIST FINAL ANTES DE PRODUCCIÓN

- [ ] Políticas RLS ejecutadas en Supabase
- [ ] Usuario admin creado en Supabase
- [ ] Login funciona correctamente
- [ ] Todos los editores guardan cambios
- [ ] La landing page muestra el contenido guardado
- [ ] Variables de entorno configuradas en producción
- [ ] Contraseña del admin es segura
- [ ] Backup de las credenciales guardado

---

**¿Listo para lanzar? ¡Adelante! 🚀**

Si tienes algún problema, revisa la sección de solución de problemas arriba.
