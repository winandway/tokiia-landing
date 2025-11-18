'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import RichTextEditor from '@/components/cms/RichTextEditor'
import { Save, Eye, ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function PageEditor() {
  const router = useRouter()
  const params = useParams()
  const pageId = params.id as string
  const isNew = pageId === 'new'

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '<h1>Nueva Página</h1><p>Empieza a escribir tu contenido aquí...</p>',
    featured_image: '',
    meta_description: '',
    is_published: false
  })

  useEffect(() => {
    if (!isNew) {
      fetchPage()
    }
  }, [isNew])

  const fetchPage = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('id', pageId)
        .single()

      if (error) throw error

      if (data) {
        setFormData({
          title: data.title,
          slug: data.slug,
          content: data.content,
          featured_image: data.featured_image || '',
          meta_description: data.meta_description || '',
          is_published: data.is_published
        })
      }
    } catch (error) {
      console.error('Error fetching page:', error)
      alert('Error al cargar la página')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }))
  }

  const handleSave = async () => {
    if (!formData.title.trim()) {
      alert('El título es obligatorio')
      return
    }

    if (!formData.slug.trim()) {
      alert('El slug es obligatorio')
      return
    }

    setSaving(true)
    setSuccess(false)

    try {
      const pageData = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        featured_image: formData.featured_image || null,
        meta_description: formData.meta_description || null,
        is_published: formData.is_published,
        updated_at: new Date().toISOString()
      }

      if (isNew) {
        const { data, error } = await supabase
          .from('cms_pages')
          .insert([pageData])
          .select()
          .single()

        if (error) throw error

        setSuccess(true)
        setTimeout(() => {
          router.push('/cms-admin/pages')
        }, 1500)
      } else {
        const { error } = await supabase
          .from('cms_pages')
          .update(pageData)
          .eq('id', pageId)

        if (error) throw error

        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (error: any) {
      console.error('Error saving page:', error)
      if (error.code === '23505') {
        alert('Ya existe una página con ese slug. Usa uno diferente.')
      } else {
        alert('Error al guardar la página. Verifica los permisos de Supabase.')
      }
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
          <Button
            variant="ghost"
            onClick={() => router.push('/cms-admin/pages')}
            className="text-text-secondary hover:text-white mb-4 -ml-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Páginas
          </Button>
          <h1 className="text-4xl font-bold text-white mb-2">
            {isNew ? 'Nueva Página' : 'Editar Página'}
          </h1>
          <p className="text-text-secondary">
            {isNew ? 'Crea una nueva página para tu sitio' : 'Edita el contenido de tu página'}
          </p>
        </div>
        {!isNew && formData.is_published && (
          <Button
            variant="outline"
            onClick={() => window.open(`/${formData.slug}`, '_blank')}
            className="border-accent-blue text-accent-blue"
          >
            <Eye className="mr-2 h-4 w-4" />
            Ver Página
          </Button>
        )}
      </div>

      {success && (
        <div className="bg-accent-green/10 border border-accent-green text-accent-green px-4 py-3 rounded-lg">
          {isNew ? '¡Página creada exitosamente! Redirigiendo...' : '¡Cambios guardados exitosamente!'}
        </div>
      )}

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-white">Información de la Página</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">
              Título *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="bg-bg-secondary border-tokiia-border text-white"
              placeholder="Acerca de Nosotros"
            />
            <p className="text-sm text-text-secondary">
              El título de la página (se genera automáticamente el slug)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug" className="text-white">
              Slug (URL) *
            </Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="bg-bg-secondary border-tokiia-border text-white"
              placeholder="acerca-de-nosotros"
            />
            <p className="text-sm text-text-secondary">
              URL de la página: <span className="text-accent-blue">/{formData.slug || 'tu-slug'}</span>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="featured_image" className="text-white">
              Imagen Destacada (Opcional)
            </Label>
            <Input
              id="featured_image"
              type="url"
              value={formData.featured_image}
              onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
              className="bg-bg-secondary border-tokiia-border text-white"
              placeholder="https://tu-imagen.com/imagen.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta_description" className="text-white">
              Meta Descripción (SEO)
            </Label>
            <Input
              id="meta_description"
              value={formData.meta_description}
              onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
              className="bg-bg-secondary border-tokiia-border text-white"
              placeholder="Descripción breve para motores de búsqueda"
              maxLength={160}
            />
            <p className="text-sm text-text-secondary">
              Máximo 160 caracteres ({formData.meta_description.length}/160)
            </p>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-bg-secondary rounded-lg">
            <Switch
              id="is_published"
              checked={formData.is_published}
              onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
            />
            <Label htmlFor="is_published" className="text-white cursor-pointer">
              Publicar página (visible para todos)
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-white">Contenido de la Página</CardTitle>
        </CardHeader>
        <CardContent>
          <RichTextEditor
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary-dark text-white px-8"
        >
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Guardando...' : (isNew ? 'Crear Página' : 'Guardar Cambios')}
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push('/cms-admin/pages')}
          className="border-tokiia-border text-white"
        >
          Cancelar
        </Button>
      </div>
    </div>
  )
}
