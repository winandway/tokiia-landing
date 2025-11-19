'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { supabase } from '@/lib/supabase'
import { Save, Eye } from 'lucide-react'

export default function HeroEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [heroData, setHeroData] = useState({
    id: '',
    title: 'Tokiia Wallet',
    subtitle: 'Tu billetera Web3 descentralizada con P2P integrado',
    cta_text: 'Abrir Wallet',
    cta_url: 'https://app.tokiia.com',
    background_image: '',
    is_active: true
  })

  useEffect(() => {
    fetchHeroData()
  }, [])

  const fetchHeroData = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_hero')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true })
        .limit(1)
        .single()

      if (error) throw error

      if (data) {
        setHeroData(data)
      }
    } catch (error) {
      console.error('Error fetching hero data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setSuccess(false)

    try {
      const { error } = await supabase
        .from('cms_hero')
        .upsert({
          ...heroData,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving hero data:', error)
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Editor del Hero Banner</h1>
          <p className="text-text-secondary">
            Personaliza la sección principal de la landing page
          </p>
        </div>
        <a href="/">
          <Button variant="outline" className="border-accent-blue text-accent-blue">
            <Eye className="mr-2 h-4 w-4" />
            Vista Previa
          </Button>
        </a>
      </div>

      {success && (
        <div className="bg-accent-green/10 border border-accent-green text-accent-green px-4 py-3 rounded-lg">
          ¡Cambios guardados exitosamente!
        </div>
      )}

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-white">Contenido Principal</CardTitle>
          <CardDescription className="text-text-secondary">
            Edita el título, subtítulo y llamado a la acción
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">
              Título Principal
            </Label>
            <Input
              id="title"
              value={heroData.title}
              onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
              className="bg-bg-secondary border-tokiia-border text-white text-lg"
              placeholder="Tokiia Wallet"
            />
            <p className="text-sm text-text-secondary">
              El título principal con gradiente morado/azul
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle" className="text-white">
              Subtítulo
            </Label>
            <Textarea
              id="subtitle"
              value={heroData.subtitle}
              onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
              className="bg-bg-secondary border-tokiia-border text-white min-h-[100px]"
              placeholder="Tu billetera Web3 descentralizada con P2P integrado"
            />
            <p className="text-sm text-text-secondary">
              Descripción breve que aparece debajo del título
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="cta_text" className="text-white">
                Texto del Botón
              </Label>
              <Input
                id="cta_text"
                value={heroData.cta_text}
                onChange={(e) => setHeroData({ ...heroData, cta_text: e.target.value })}
                className="bg-bg-secondary border-tokiia-border text-white"
                placeholder="Abrir Wallet"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta_url" className="text-white">
                URL del Botón
              </Label>
              <Input
                id="cta_url"
                value={heroData.cta_url}
                onChange={(e) => setHeroData({ ...heroData, cta_url: e.target.value })}
                className="bg-bg-secondary border-tokiia-border text-white"
                placeholder="https://app.tokiia.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="background" className="text-white">
              Imagen de Fondo (Opcional)
            </Label>
            <Input
              id="background"
              type="url"
              value={heroData.background_image || ''}
              onChange={(e) => setHeroData({ ...heroData, background_image: e.target.value })}
              className="bg-bg-secondary border-tokiia-border text-white"
              placeholder="https://tu-imagen.com/hero-bg.jpg"
            />
            <p className="text-sm text-text-secondary">
              URL de imagen de fondo (deja vacío para usar el degradado por defecto)
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary-dark text-white px-8"
        >
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
        <Button
          variant="outline"
          onClick={fetchHeroData}
          className="border-tokiia-border text-white"
        >
          Restablecer
        </Button>
      </div>
    </div>
  )
}
