'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { supabase } from '@/lib/supabase'
import { Save, ExternalLink } from 'lucide-react'

export default function GoogleConsoleSettings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [seoData, setSeoData] = useState({
    id: '',
    page_route: '/',
    title: 'Tokiia - Billetera Web3 P2P Descentralizada',
    description: 'La billetera cripto más avanzada con P2P integrado. Envía, recibe e intercambia criptomonedas de forma segura.',
    keywords: ['wallet', 'cripto', 'P2P', 'blockchain', 'Web3', 'DeFi'],
    og_image: '',
    google_analytics_id: '',
    google_console_key: ''
  })

  useEffect(() => {
    fetchSEOData()
  }, [])

  const fetchSEOData = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_seo')
        .select('*')
        .eq('page_route', '/')
        .single()

      if (error && error.code !== 'PGRST116') throw error

      if (data) {
        setSeoData({
          ...data,
          keywords: data.keywords || []
        })
      }
    } catch (error) {
      console.error('Error fetching SEO data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      const { error } = await supabase
        .from('cms_seo')
        .upsert({
          ...seoData,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      alert('¡Configuración SEO guardada exitosamente!')
    } catch (error) {
      console.error('Error saving SEO data:', error)
      alert('Error al guardar. Verifica los permisos de Supabase.')
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
        <h1 className="text-4xl font-bold text-white mb-2">Configuración SEO y Google</h1>
        <p className="text-text-secondary">
          Optimiza tu sitio para motores de búsqueda
        </p>
      </div>

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-accent-blue">Google Analytics</CardTitle>
          <CardDescription className="text-text-secondary">
            Configuración de seguimiento de Google Analytics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ga-id" className="text-white">
              Measurement ID
            </Label>
            <Input
              id="ga-id"
              value={seoData.google_analytics_id || ''}
              onChange={(e) => setSeoData({ ...seoData, google_analytics_id: e.target.value })}
              className="bg-bg-secondary border-tokiia-border text-white"
              placeholder="G-XXXXXXXXXX"
            />
            <p className="text-sm text-text-secondary">
              Obtén tu ID en{' '}
              <a
                href="https://analytics.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-blue hover:underline"
              >
                Google Analytics
                <ExternalLink className="inline ml-1 h-3 w-3" />
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-accent-green">Google Search Console</CardTitle>
          <CardDescription className="text-text-secondary">
            Verifica tu sitio en Google Search Console
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="console-key" className="text-white">
              Verification Code
            </Label>
            <Input
              id="console-key"
              value={seoData.google_console_key || ''}
              onChange={(e) => setSeoData({ ...seoData, google_console_key: e.target.value })}
              className="bg-bg-secondary border-tokiia-border text-white"
              placeholder="google-site-verification=XXXXXXXXXXX"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Sitemap URL</Label>
            <div className="flex gap-2">
              <Input
                value="https://tokiia.com/sitemap.xml"
                className="bg-bg-secondary border-tokiia-border text-text-secondary"
                readOnly
              />
              <Button variant="outline" className="border-tokiia-border text-white">
                Copiar
              </Button>
            </div>
            <p className="text-sm text-text-secondary">
              Añade esta URL en{' '}
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-blue hover:underline"
              >
                Google Search Console
                <ExternalLink className="inline ml-1 h-3 w-3" />
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-primary">Meta Tags Globales</CardTitle>
          <CardDescription className="text-text-secondary">
            Configura los meta tags principales del sitio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">
              Title
            </Label>
            <Input
              id="title"
              value={seoData.title}
              onChange={(e) => setSeoData({ ...seoData, title: e.target.value })}
              className="bg-bg-secondary border-tokiia-border text-white"
              placeholder="Tokiia - Billetera Web3 P2P Descentralizada"
            />
            <p className="text-sm text-text-secondary">
              Máximo 60 caracteres recomendado
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Description
            </Label>
            <Textarea
              id="description"
              value={seoData.description}
              onChange={(e) => setSeoData({ ...seoData, description: e.target.value })}
              className="bg-bg-secondary border-tokiia-border text-white min-h-[100px]"
              placeholder="La billetera cripto más avanzada..."
            />
            <p className="text-sm text-text-secondary">
              Máximo 160 caracteres recomendado
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords" className="text-white">
              Keywords (separadas por comas)
            </Label>
            <Input
              id="keywords"
              value={seoData.keywords.join(', ')}
              onChange={(e) => setSeoData({
                ...seoData,
                keywords: e.target.value.split(',').map(k => k.trim())
              })}
              className="bg-bg-secondary border-tokiia-border text-white"
              placeholder="wallet, cripto, P2P, blockchain"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="og-image" className="text-white">
              OG Image (Open Graph)
            </Label>
            <Input
              id="og-image"
              type="url"
              value={seoData.og_image || ''}
              onChange={(e) => setSeoData({ ...seoData, og_image: e.target.value })}
              className="bg-bg-secondary border-tokiia-border text-white"
              placeholder="https://tokiia.com/og-image.jpg"
            />
            <p className="text-sm text-text-secondary">
              Recomendado: 1200x630px - Se muestra al compartir en redes sociales
            </p>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleSave}
        disabled={saving}
        className="bg-primary hover:bg-primary-dark text-white w-full md:w-auto px-8"
      >
        <Save className="mr-2 h-4 w-4" />
        {saving ? 'Guardando...' : 'Guardar configuración SEO'}
      </Button>
    </div>
  )
}
