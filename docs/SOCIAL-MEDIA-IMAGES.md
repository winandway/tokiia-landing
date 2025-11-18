# 🖼️ Guía de Imágenes para Redes Sociales

## Imágenes Configuradas

Ya están configuradas las meta tags de Open Graph y Twitter Cards en [app/layout.tsx](../app/layout.tsx:8-54).

### Imagen Actual

- **Imagen principal**: `/wallet-preview.jpeg` (400x800px)
- Esta imagen se mostrará al compartir en:
  - WhatsApp ✅
  - Facebook ✅
  - LinkedIn ✅
  - Twitter ✅
  - Telegram ✅

## 📏 Tamaños Recomendados

### Open Graph (Facebook, WhatsApp, LinkedIn)

**Tamaño ideal**: 1200x630px
- Mínimo: 600x315px
- Máximo: 8MB
- Formato: JPG o PNG

### Twitter Cards

**Tamaño ideal**: 1200x628px (para `summary_large_image`)
- Mínimo: 300x157px
- Ratio: 2:1
- Formato: JPG, PNG, WEBP o GIF

### WhatsApp

WhatsApp usa las mismas especificaciones que Open Graph (Facebook):
- 1200x630px es ideal
- Acepta imágenes verticales pero las recorta

## 🎨 Crear Imagen Optimizada (Opcional)

Si quieres crear una imagen horizontal optimizada para redes sociales:

### Opción 1: Usar Canva (Recomendado - Fácil)

1. Ir a [Canva.com](https://canva.com)
2. Crear diseño personalizado: 1200x630px
3. Agregar:
   - Logo de Tokiia
   - Screenshot del wallet
   - Texto: "Tokiia - Tu Billetera Web3"
   - Colores de tu marca (purple, blue)
4. Exportar como JPG
5. Guardar como `/public/og-image.jpg`

### Opción 2: Usar Figma (Profesional)

1. Crear frame de 1200x630px
2. Diseñar con:
   - Fondo degradado (purple-900 to blue)
   - Logo en esquina superior
   - Imagen del wallet centrada
   - Título grande y legible
3. Exportar como JPG (calidad 90%)
4. Guardar en `/public/og-image.jpg`

### Opción 3: Editar con Photoshop/GIMP

```
Dimensiones: 1200x630px
Resolución: 72 DPI
Modo de color: RGB
Formato: JPG (calidad 85-90%)
```

## 📋 Checklist de Calidad

- [ ] Tamaño correcto (1200x630px para horizontal)
- [ ] Texto legible (mínimo 40px)
- [ ] Logo visible
- [ ] Peso menor a 300KB
- [ ] Colores de marca consistentes
- [ ] Sin información sensible
- [ ] Probado en diferentes plataformas

## 🧪 Probar las Imágenes

### Herramientas de Testing

1. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Pega la URL de tu sitio
   - Click en "Scrape Again" para refrescar

2. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Pega la URL de tu sitio
   - Ve preview de cómo se verá

3. **LinkedIn Post Inspector**
   - URL: https://www.linkedin.com/post-inspector/
   - Verifica cómo se ve en LinkedIn

4. **WhatsApp Preview**
   - Envíate el link a ti mismo en WhatsApp
   - Verifica que la imagen se vea correctamente

## 📱 Ejemplo de Cómo se ve

### WhatsApp
```
┌─────────────────────────┐
│ [Imagen del Wallet]     │
│                         │
│ Tokiia - Billetera...   │
│ Tu billetera cripto...  │
│                         │
│ tokiia.com              │
└─────────────────────────┘
```

### Twitter
```
┌─────────────────────────┐
│                         │
│   [Imagen 1200x628]     │
│                         │
├─────────────────────────┤
│ Tokiia - Billetera...   │
│ Tu billetera cripto...  │
│ tokiia.com              │
└─────────────────────────┘
```

## 🔄 Actualizar en Vercel

Cuando despliegues en Vercel, agrega esta variable de entorno:

```
NEXT_PUBLIC_SITE_URL = https://tu-dominio.com
```

O la URL de Vercel:

```
NEXT_PUBLIC_SITE_URL = https://tokiia-landing.vercel.app
```

## 📝 Notas Importantes

1. **Cache**: Las redes sociales cachean las imágenes. Si cambias la imagen:
   - Facebook: Usa el Sharing Debugger y "Scrape Again"
   - Twitter: Espera ~1 semana o usa el validator
   - WhatsApp: Limpia cache o cambia el nombre del archivo

2. **Formato del archivo**:
   - Usa JPG para fotos (mejor compresión)
   - Usa PNG para logos/gráficos (mejor calidad)

3. **Optimización**:
   ```bash
   # Comprimir con ImageOptim (Mac) o TinyPNG
   # Objetivo: < 300KB sin perder calidad visible
   ```

## 🎯 Resultado Esperado

Cuando compartas tu sitio:

✅ Se verá la imagen del wallet
✅ Título: "Tokiia - Billetera Web3 P2P Descentralizada"
✅ Descripción clara del producto
✅ Link al sitio
✅ Profesional y atractivo

---

**Última actualización**: 2025-11-18
