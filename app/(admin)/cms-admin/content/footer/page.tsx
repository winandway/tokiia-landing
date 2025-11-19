'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Save, Plus, Trash2, Eye } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface FooterLink {
  text: string
  url: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

export default function FooterEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [footerData, setFooterData] = useState({
    id: '',
    columns: [
      {
        title: 'Producto',
        links: [
          { text: 'Features', url: '#features' },
          { text: 'Seguridad', url: '#security' },
          { text: 'Roadmap', url: '#roadmap' }
        ]
      },
      {
        title: 'Compañía',
        links: [
          { text: 'Acerca de', url: '/about' },
          { text: 'Blog', url: '/blog' },
          { text: 'Contacto', url: '/contact' }
        ]
      },
      {
        title: 'Legal',
        links: [
          { text: 'Términos y Condiciones', url: '/terms' },
          { text: 'Política de Privacidad', url: '/privacy' },
          { text: 'Cookies', url: '/cookies' }
        ]
      }
    ],
    social: {
      twitter: 'https://twitter.com/tokiia',
      telegram: 'https://t.me/tokiia',
      discord: 'https://discord.gg/tokiia'
    },
    copyright: '© 2024 Tokiia. Todos los derechos reservados.'
  })

  useEffect(() => {
    fetchFooterData()
  }, [])

  const fetchFooterData = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_footer')
        .select('*')
        .limit(1)
        .single()

      if (error) throw error

      if (data) {
        setFooterData({
          id: data.id,
          columns: data.columns || footerData.columns,
          social: data.social_links || footerData.social,
          copyright: data.copyright_text || footerData.copyright
        })
      }
    } catch (error) {
      console.error('Error fetching footer data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateColumnTitle = (columnIndex: number, newTitle: string) => {
    const newColumns = [...footerData.columns]
    newColumns[columnIndex].title = newTitle
    setFooterData({ ...footerData, columns: newColumns })
  }

  const updateLink = (columnIndex: number, linkIndex: number, field: 'text' | 'url', value: string) => {
    const newColumns = [...footerData.columns]
    newColumns[columnIndex].links[linkIndex][field] = value
    setFooterData({ ...footerData, columns: newColumns })
  }

  const addLink = (columnIndex: number) => {
    const newColumns = [...footerData.columns]
    newColumns[columnIndex].links.push({ text: 'Nuevo enlace', url: '#' })
    setFooterData({ ...footerData, columns: newColumns })
  }

  const removeLink = (columnIndex: number, linkIndex: number) => {
    const newColumns = [...footerData.columns]
    newColumns[columnIndex].links.splice(linkIndex, 1)
    setFooterData({ ...footerData, columns: newColumns })
  }

  const addColumn = () => {
    const newColumns = [...footerData.columns]
    newColumns.push({
      title: 'Nueva Sección',
      links: [{ text: 'Enlace', url: '#' }]
    })
    setFooterData({ ...footerData, columns: newColumns })
  }

  const removeColumn = (columnIndex: number) => {
    const newColumns = footerData.columns.filter((_, index) => index !== columnIndex)
    setFooterData({ ...footerData, columns: newColumns })
  }

  const handleSave = async () => {
    setSaving(true)
    setSuccess(false)

    try {
      const { error } = await supabase
        .from('cms_footer')
        .upsert({
          id: footerData.id || undefined,
          columns: footerData.columns,
          social_links: footerData.social,
          copyright_text: footerData.copyright,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving footer data:', error)
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
          <h1 className="text-4xl font-bold text-white mb-2">Editor de Footer</h1>
          <p className="text-text-secondary">
            Personaliza los enlaces y contenido del pie de página
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

      {/* Columnas del Footer */}
      <div className="space-y-4">
        {footerData.columns.map((column, columnIndex) => (
          <Card key={columnIndex} className="bg-bg-card border-tokiia-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex-1">
                <Input
                  value={column.title}
                  onChange={(e) => updateColumnTitle(columnIndex, e.target.value)}
                  className="bg-bg-secondary border-tokiia-border text-white font-semibold text-lg"
                  placeholder="Título de la sección"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeColumn(columnIndex)}
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10 ml-4"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {column.links.map((link, linkIndex) => (
                <div key={linkIndex} className="flex gap-2">
                  <Input
                    value={link.text}
                    onChange={(e) => updateLink(columnIndex, linkIndex, 'text', e.target.value)}
                    placeholder="Texto del enlace"
                    className="bg-bg-secondary border-tokiia-border text-white flex-1"
                  />
                  <Input
                    value={link.url}
                    onChange={(e) => updateLink(columnIndex, linkIndex, 'url', e.target.value)}
                    placeholder="URL"
                    className="bg-bg-secondary border-tokiia-border text-white flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLink(columnIndex, linkIndex)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addLink(columnIndex)}
                className="border-accent-green text-accent-green hover:bg-accent-green hover:text-white w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar enlace
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={addColumn}
        className="border-primary text-primary hover:bg-primary hover:text-white w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Agregar nueva sección
      </Button>

      {/* Redes Sociales */}
      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-accent-blue">Redes Sociales</CardTitle>
          <CardDescription className="text-text-secondary">
            Enlaces a tus perfiles de redes sociales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Twitter / X</Label>
            <Input
              value={footerData.social.twitter}
              onChange={(e) => setFooterData({
                ...footerData,
                social: { ...footerData.social, twitter: e.target.value }
              })}
              placeholder="https://twitter.com/tokiia"
              className="bg-bg-secondary border-tokiia-border text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Telegram</Label>
            <Input
              value={footerData.social.telegram}
              onChange={(e) => setFooterData({
                ...footerData,
                social: { ...footerData.social, telegram: e.target.value }
              })}
              placeholder="https://t.me/tokiia"
              className="bg-bg-secondary border-tokiia-border text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Discord</Label>
            <Input
              value={footerData.social.discord}
              onChange={(e) => setFooterData({
                ...footerData,
                social: { ...footerData.social, discord: e.target.value }
              })}
              placeholder="https://discord.gg/tokiia"
              className="bg-bg-secondary border-tokiia-border text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Copyright */}
      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-white">Copyright</CardTitle>
          <CardDescription className="text-text-secondary">
            Texto de derechos de autor que aparece al final
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            value={footerData.copyright}
            onChange={(e) => setFooterData({ ...footerData, copyright: e.target.value })}
            className="bg-bg-secondary border-tokiia-border text-white"
            placeholder="© 2024 Tokiia. Todos los derechos reservados."
          />
        </CardContent>
      </Card>

      <Button
        onClick={handleSave}
        disabled={saving}
        className="bg-primary hover:bg-primary-dark text-white w-full md:w-auto px-8"
      >
        <Save className="mr-2 h-4 w-4" />
        {saving ? 'Guardando...' : 'Guardar Footer'}
      </Button>
    </div>
  )
}
