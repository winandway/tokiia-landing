'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Page {
  id: string
  title: string
  slug: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export default function PagesManager() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState<Page[]>([])

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .order('updated_at', { ascending: false })

      if (error) throw error
      setPages(data || [])
    } catch (error) {
      console.error('Error fetching pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Estás seguro de eliminar la página "${title}"?`)) return

    try {
      const { error } = await supabase
        .from('cms_pages')
        .delete()
        .eq('id', id)

      if (error) throw error

      setPages(pages.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting page:', error)
      alert('Error al eliminar la página')
    }
  }

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('cms_pages')
        .update({ is_published: !currentStatus, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error

      setPages(pages.map(p =>
        p.id === id ? { ...p, is_published: !currentStatus } : p
      ))
    } catch (error) {
      console.error('Error toggling publish:', error)
      alert('Error al cambiar el estado de publicación')
    }
  }

  if (loading) {
    return <div className="text-white">Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Gestión de Páginas</h1>
          <p className="text-text-secondary">
            Crea y administra las páginas de tu sitio web
          </p>
        </div>
        <Button
          onClick={() => router.push('/cms-admin/pages/new')}
          className="bg-primary hover:bg-primary-dark text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nueva Página
        </Button>
      </div>

      {pages.length === 0 ? (
        <Card className="bg-bg-card border-tokiia-border">
          <CardContent className="py-12 text-center">
            <p className="text-text-secondary mb-4">
              No hay páginas creadas todavía
            </p>
            <Button
              onClick={() => router.push('/cms-admin/pages/new')}
              className="bg-primary hover:bg-primary-dark text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Crear Primera Página
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {pages.map((page) => (
            <Card key={page.id} className="bg-bg-card border-tokiia-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">
                        {page.title}
                      </h3>
                      <Badge
                        variant={page.is_published ? "default" : "secondary"}
                        className={page.is_published ? "bg-accent-green" : "bg-gray-500"}
                      >
                        {page.is_published ? "Publicada" : "Borrador"}
                      </Badge>
                    </div>
                    <p className="text-text-secondary text-sm mb-1">
                      URL: <span className="text-accent-blue">/{page.slug}</span>
                    </p>
                    <p className="text-text-secondary text-xs">
                      Última actualización: {new Date(page.updated_at).toLocaleDateString('es-ES')}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePublish(page.id, page.is_published)}
                      className="border-tokiia-border text-white"
                    >
                      {page.is_published ? (
                        <><EyeOff className="h-4 w-4 mr-1" /> Despublicar</>
                      ) : (
                        <><Eye className="h-4 w-4 mr-1" /> Publicar</>
                      )}
                    </Button>

                    {page.is_published && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/${page.slug}`, '_blank')}
                        className="border-accent-blue text-accent-blue"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/cms-admin/pages/${page.id}`)}
                      className="border-primary text-primary"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(page.id, page.title)}
                      className="border-red-500 text-red-500 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
