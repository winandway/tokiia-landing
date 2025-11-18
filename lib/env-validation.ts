/**
 * Validación de variables de entorno
 * Este archivo valida que todas las variables de entorno necesarias estén presentes
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const

type RequiredEnvVar = typeof requiredEnvVars[number]

export function validateEnv() {
  // Solo validar en servidor (Node.js), no en cliente (navegador)
  if (typeof window !== 'undefined') {
    return // Skip validation in browser
  }

  const missing: string[] = []

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar)
    }
  }

  if (missing.length > 0) {
    console.error(
      `⚠️  Faltan las siguientes variables de entorno:\n${missing.join('\n')}\n\nPor favor, crea un archivo .env.local basado en .env.example`
    )
    // No lanzar error, solo advertir
    return
  }

  // Validar formato de URL de Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (supabaseUrl && !supabaseUrl.startsWith('https://') && !supabaseUrl.startsWith('http://localhost')) {
    console.warn('⚠️  NEXT_PUBLIC_SUPABASE_URL debe comenzar con https://')
  }

  // Advertir si se están usando valores por defecto
  if (supabaseUrl === 'tu_url_de_supabase_aqui') {
    console.warn('⚠️  Advertencia: Estás usando valores por defecto en .env.local')
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Variables de entorno validadas correctamente')
  }
}

// Ejecutar validación solo en servidor
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  validateEnv()
}
