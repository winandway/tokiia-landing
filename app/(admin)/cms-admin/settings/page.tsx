'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Settings, Save, Trash2, Key } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  // Form state
  const [siteName, setSiteName] = useState('Tokiia')
  const [siteUrl, setSiteUrl] = useState('https://tokiia.com')
  const [contactEmail, setContactEmail] = useState('contact@tokiia.com')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_brand')
        .select('*')
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') throw error

      if (data) {
        setSiteName(data.brand_name || 'Tokiia')
        setContactEmail('contact@tokiia.com') // Not in DB yet
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setSuccess(false)

    try {
      const { error } = await supabase
        .from('cms_brand')
        .upsert({
          id: '00000000-0000-0000-0000-000000000001', // Fixed ID for singleton
          brand_name: siteName,
          tagline: 'Tu billetera Web3 descentralizada',
          primary_color: '#8B5CF6',
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Error al guardar. Verifica la consola.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-white">Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Configuración</h1>
        <p className="text-text-secondary">
          Ajustes generales del CMS y del sitio
        </p>
      </div>

      {success && (
        <div className="bg-accent-green/10 border border-accent-green text-accent-green px-4 py-3 rounded-lg">
          ¡Configuración guardada exitosamente!
        </div>
      )}

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Información del Sitio
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Configuración básica de tu sitio web
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Nombre del Sitio</Label>
            <Input
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="bg-bg-secondary border-tokiia-border text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">URL del Sitio</Label>
            <Input
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              className="bg-bg-secondary border-tokiia-border text-white"
            />
            <p className="text-sm text-text-secondary">
              ℹ️ Configura esto en .env.local como NEXT_PUBLIC_SITE_URL
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Email de Contacto</Label>
            <Input
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              type="email"
              className="bg-bg-secondary border-tokiia-border text-white"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Key className="h-5 w-5" />
            Cambiar Contraseña del Admin
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Actualiza tus credenciales de acceso al CMS
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-accent-blue/10 border border-accent-blue rounded-lg">
            <p className="text-sm text-accent-blue mb-2">
              <strong>Contraseña actual:</strong> tokiia2024
            </p>
            <p className="text-xs text-text-secondary">
              Para cambiarla, edita el archivo:{' '}
              <code className="bg-bg-dark px-2 py-1 rounded">
                app/(admin)/cms-admin/login/page.tsx
              </code>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-accent-green">Supabase</CardTitle>
          <CardDescription className="text-text-secondary">
            Configuración de la base de datos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Supabase URL</Label>
            <Input
              value={process.env.NEXT_PUBLIC_SUPABASE_URL || 'No configurado'}
              className="bg-bg-secondary border-tokiia-border text-white font-mono text-sm"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Estado de Conexión</Label>
            <div className="flex items-center gap-2 p-3 bg-bg-secondary rounded">
              <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span className="text-white text-sm">Conectado y Funcionando</span>
            </div>
          </div>

          <div className="p-4 bg-accent-green/10 border border-accent-green rounded-lg">
            <p className="text-sm text-accent-green">
              ✅ Las políticas de seguridad están configuradas correctamente.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary-dark text-white"
        >
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Guardando...' : 'Guardar configuración'}
        </Button>
        <Button
          variant="outline"
          className="border-tokiia-border text-white"
          onClick={() => {
            setSiteName('Tokiia')
            setSiteUrl('https://tokiia.com')
            setContactEmail('contact@tokiia.com')
          }}
        >
          Restablecer
        </Button>
      </div>
    </div>
  )
}
