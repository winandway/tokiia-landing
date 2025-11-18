/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['dkpqdkqpmjoexdfbhmeh.supabase.co'],
  },

  // Security Headers
  async headers() {
    return [
      {
        // Apply headers to all routes
        source: '/:path*',
        headers: [
          // Prevenir que el sitio sea embebido en iframes (Clickjacking protection)
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Protección contra MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Habilitar XSS protection en navegadores antiguos
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Control de referrer para privacidad
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions Policy (antes Feature-Policy)
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // Strict-Transport-Security (HSTS) - Solo para producción con HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // unsafe-inline necesario para Next.js
              "style-src 'self' 'unsafe-inline'", // unsafe-inline necesario para Tailwind/styled-components
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://dkpqdkqpmjoexdfbhmeh.supabase.co wss://dkpqdkqpmjoexdfbhmeh.supabase.co https://app.tokiia.com",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
