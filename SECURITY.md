# 🔐 Guía de Seguridad - Tokiia Landing Page

Este documento describe las medidas de seguridad implementadas y las mejores prácticas para mantener la aplicación segura.

## 📋 Medidas de Seguridad Implementadas

### 1. Security Headers (next.config.js)

```javascript
// Headers de seguridad configurados:
✅ X-Frame-Options: DENY
   → Previene ataques de clickjacking

✅ X-Content-Type-Options: nosniff
   → Previene MIME type sniffing

✅ X-XSS-Protection: 1; mode=block
   → Protección XSS en navegadores antiguos

✅ Strict-Transport-Security (HSTS)
   → Fuerza conexiones HTTPS

✅ Content-Security-Policy (CSP)
   → Controla qué recursos pueden cargarse

✅ Referrer-Policy
   → Control de información de referencia

✅ Permissions-Policy
   → Deshabilita características no necesarias
```

### 2. Middleware de Seguridad

El archivo `middleware.ts` implementa:

- **Bloqueo de archivos sensibles**: Previene acceso a `.env`, `.git`, etc.
- **Cache control**: Optimiza carga de assets estáticos
- **Redirecciones seguras**: Manejo de rutas antiguas
- **Headers adicionales**: X-Robots-Tag para SEO

### 3. Validación de Variables de Entorno

El archivo `lib/env-validation.ts`:

- Valida que todas las variables requeridas existan
- Verifica formato correcto de URLs
- Alerta sobre valores por defecto
- Solo se ejecuta en desarrollo

### 4. Protección de Datos Sensibles

```bash
# .gitignore configurado para ignorar:
✅ .env
✅ .env.local
✅ .env*.local
✅ Archivos de credenciales
```

## 🚨 Riesgos Actuales y Mitigaciones

### 🔴 CRÍTICO: Variables de entorno públicas

**Problema**: Las variables con prefijo `NEXT_PUBLIC_*` se exponen al cliente.

**Mitigación**:
1. Usa Row Level Security (RLS) en Supabase
2. Configura políticas estrictas en Supabase
3. La ANON_KEY debe tener permisos limitados
4. Nunca uses la SERVICE_ROLE_KEY en el cliente

**Configuración recomendada en Supabase**:
```sql
-- Ejemplo de RLS para tabla 'pages'
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Permitir solo lectura pública
CREATE POLICY "Public pages are viewable by everyone"
ON pages FOR SELECT
USING (published = true);

-- Solo administradores pueden modificar
CREATE POLICY "Only authenticated users can modify"
ON pages FOR ALL
USING (auth.role() = 'authenticated');
```

### 🟡 IMPORTANTE: Rate Limiting

**Problema**: No hay límites de tasa en las peticiones.

**Solución recomendada**:
```typescript
// Usar Vercel Edge Config o un servicio como Upstash
// Ejemplo con Upstash Rate Limit:
import { Ratelimit } from "@upstash/ratelimit"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
})
```

### 🟡 IMPORTANTE: Input Sanitization

**Problema**: Datos del usuario no sanitizados completamente.

**Solución**:
```typescript
// Instalar DOMPurify para sanitizar HTML
import DOMPurify from 'isomorphic-dompurify'

const cleanHTML = DOMPurify.sanitize(dirtyHTML)
```

## ✅ Mejores Prácticas Implementadas

### 1. Separación de Entornos

```bash
# Desarrollo
.env.local (nunca comitear)

# Producción
Variables de entorno en Vercel/hosting
```

### 2. HTTPS Obligatorio

- Configurado HSTS en headers
- Vercel provee HTTPS automáticamente
- CSP incluye `upgrade-insecure-requests`

### 3. Dependencias Actualizadas

```bash
# Revisar vulnerabilidades regularmente
npm audit

# Actualizar dependencias
npm update

# Revisar dependencias desactualizadas
npm outdated
```

## 🔒 Checklist de Seguridad para Producción

Antes de desplegar a producción, verifica:

- [ ] Variables de entorno configuradas en el hosting (no en código)
- [ ] `.env.local` NO está en el repositorio git
- [ ] Row Level Security (RLS) habilitado en todas las tablas de Supabase
- [ ] Políticas de acceso configuradas en Supabase
- [ ] HTTPS habilitado y funcionando
- [ ] Headers de seguridad activos (verificar con securityheaders.com)
- [ ] CSP configurado correctamente
- [ ] No hay console.logs con información sensible
- [ ] Dependencias actualizadas sin vulnerabilidades conocidas
- [ ] Autenticación 2FA habilitada en Supabase y GitHub
- [ ] Backups automáticos configurados en Supabase

## 🛡️ Configuración de Supabase

### Row Level Security (RLS)

**IMPORTANTE**: Debes habilitar RLS en todas las tablas.

```sql
-- Para la tabla 'pages'
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Política de lectura pública
CREATE POLICY "Anyone can view published pages"
ON pages FOR SELECT
USING (published = true);

-- Política de escritura solo para admins
CREATE POLICY "Only admins can insert/update/delete"
ON pages FOR ALL
USING (
  auth.jwt() ->> 'role' = 'admin'
);
```

### Configuración de Authentication

1. Ir a `Authentication > Providers` en Supabase
2. Configurar proveedores necesarios (Email, Google, etc.)
3. Habilitar Email confirmations
4. Configurar Redirect URLs permitidas

### API Keys

```
ANON_KEY (público):
- Usar solo en el cliente
- Proteger con RLS
- Permisos limitados

SERVICE_ROLE_KEY (privado):
- NUNCA exponer al cliente
- Usar solo en servidor/API routes
- Acceso total a la base de datos
```

## 📚 Recursos Adicionales

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/security)
- [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Security Headers](https://securityheaders.com/)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)

## 🔍 Auditoría de Seguridad

Herramientas recomendadas para auditar:

```bash
# Vulnerabilidades en dependencias
npm audit

# Análisis de código estático
npm install -D eslint-plugin-security

# Headers de seguridad
# Visitar: https://securityheaders.com/

# CSP
# Visitar: https://csp-evaluator.withgoogle.com/
```

## 📞 Reporte de Vulnerabilidades

Si encuentras una vulnerabilidad de seguridad, por favor:

1. NO la publiques en issues públicos
2. Contacta directamente al equipo de desarrollo
3. Proporciona detalles completos y pasos para reproducir

---

**Última actualización**: 2025-11-18
**Versión del documento**: 1.0
