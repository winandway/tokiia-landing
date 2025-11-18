'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: signInError } = await signIn(email, password)

    if (signInError) {
      setError('❌ Email o contraseña incorrectos')
      setLoading(false)
    } else {
      router.push('/cms-admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-dark via-bg-dark to-purple-900/20 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <Card className="w-full max-w-md bg-bg-card border-tokiia-border relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent-blue bg-clip-text text-transparent">
            Tokiia CMS
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Inicia sesión para administrar el contenido
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@tokiia.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-bg-secondary border-tokiia-border text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-bg-secondary border-tokiia-border text-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-accent-blue/10 border border-accent-blue rounded-lg">
            <p className="text-sm text-accent-blue font-semibold mb-2">
              🔐 Autenticación con Supabase
            </p>
            <p className="text-xs text-text-secondary">
              Usa el email y contraseña del usuario admin creado en Supabase
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
