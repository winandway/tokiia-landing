'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { supabase } from '@/lib/supabase'
import { Save, Plus, Trash2, Eye } from 'lucide-react'

interface Feature {
  id?: string
  icon: string
  title: string
  description: string
  color: string
  order_index: number
  is_active: boolean
}

export default function FeaturesEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [features, setFeatures] = useState<Feature[]>([])

  useEffect(() => {
    fetchFeatures()
  }, [])

  const fetchFeatures = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_features')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error

      if (data) {
        setFeatures(data)
      }
    } catch (error) {
      console.error('Error fetching features:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddFeature = () => {
    const newFeature: Feature = {
      icon: '✨',
      title: 'Nueva Feature',
      description: 'Descripción de la nueva característica',
      color: 'purple',
      order_index: features.length,
      is_active: true
    }
    setFeatures([...features, newFeature])
  }

  const handleUpdateFeature = (index: number, field: keyof Feature, value: any) => {
    const updatedFeatures = [...features]
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value }
    setFeatures(updatedFeatures)
  }

  const handleDeleteFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index)
    setFeatures(updatedFeatures)
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      // Eliminar todas las features existentes
      const { error: deleteError } = await supabase
        .from('cms_features')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000')

      if (deleteError) throw deleteError

      // Insertar las features actualizadas
      const { error: insertError } = await supabase
        .from('cms_features')
        .insert(features.map((f, index) => ({
          ...f,
          order_index: index,
          updated_at: new Date().toISOString()
        })))

      if (insertError) throw insertError

      alert('¡Cambios guardados exitosamente!')
      fetchFeatures()
    } catch (error) {
      console.error('Error saving features:', error)
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
          <h1 className="text-4xl font-bold text-white mb-2">Gestionar Features</h1>
          <p className="text-text-secondary">
            Edita las características que se muestran en la landing
          </p>
        </div>
        <a href="/#features">
          <Button variant="outline" className="border-accent-blue text-accent-blue">
            <Eye className="mr-2 h-4 w-4" />
            Vista Previa
          </Button>
        </a>
      </div>

      <div className="space-y-4">
        {features.map((feature, index) => (
          <Card key={index} className="bg-bg-card border-tokiia-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Feature #{index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteFeature(index)}
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Icono/Emoji</Label>
                  <Input
                    value={feature.icon}
                    onChange={(e) => handleUpdateFeature(index, 'icon', e.target.value)}
                    className="bg-bg-secondary border-tokiia-border text-white text-2xl text-center"
                    placeholder="✨"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Título</Label>
                  <Input
                    value={feature.title}
                    onChange={(e) => handleUpdateFeature(index, 'title', e.target.value)}
                    className="bg-bg-secondary border-tokiia-border text-white"
                    placeholder="Título de la feature"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Color</Label>
                  <select
                    value={feature.color}
                    onChange={(e) => handleUpdateFeature(index, 'color', e.target.value)}
                    className="w-full h-10 px-3 rounded-md bg-bg-secondary border border-tokiia-border text-white"
                  >
                    <option value="purple">Morado</option>
                    <option value="green">Verde</option>
                    <option value="blue">Azul</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Descripción</Label>
                <Textarea
                  value={feature.description}
                  onChange={(e) => handleUpdateFeature(index, 'description', e.target.value)}
                  className="bg-bg-secondary border-tokiia-border text-white"
                  placeholder="Descripción de la característica"
                  rows={2}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`active-${index}`}
                  checked={feature.is_active}
                  onChange={(e) => handleUpdateFeature(index, 'is_active', e.target.checked)}
                  className="w-4 h-4 rounded border-tokiia-border bg-bg-secondary"
                />
                <Label htmlFor={`active-${index}`} className="text-white cursor-pointer">
                  Activa (visible en la landing)
                </Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Button
          onClick={handleAddFeature}
          variant="outline"
          className="border-accent-green text-accent-green hover:bg-accent-green hover:text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Agregar Feature
        </Button>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary-dark text-white px-8"
        >
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>
    </div>
  )
}
