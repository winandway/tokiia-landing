'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, Image as ImageIcon, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

export default function LogoManager() {
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Logos URLs from database
  const [logoUrl, setLogoUrl] = useState('')
  const [logoDarkUrl, setLogoDarkUrl] = useState('')
  const [faviconUrl, setFaviconUrl] = useState('')

  // File inputs
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoDarkFile, setLogoDarkFile] = useState<File | null>(null)
  const [faviconFile, setFaviconFile] = useState<File | null>(null)

  useEffect(() => {
    fetchLogos()
  }, [])

  const fetchLogos = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_brand')
        .select('*')
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') throw error

      if (data) {
        setLogoUrl(data.logo_url || '')
        setLogoDarkUrl(data.logo_dark_url || '')
        setFaviconUrl(data.favicon_url || '')
      }
    } catch (error) {
      console.error('Error fetching logos:', error)
    } finally {
      setLoading(false)
    }
  }

  const uploadFile = async (file: File, path: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${path}-${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('tokiia')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('tokiia')
        .getPublicUrl(filePath)

      console.log('✅ Archivo subido a Supabase Storage:', data.publicUrl)
      return data.publicUrl
    } catch (error) {
      console.error('Upload error:', error)
      return null
    }
  }

  const handleSave = async () => {
    setUploading(true)
    setSuccess(false)

    try {
      let newLogoUrl = logoUrl
      let newLogoDarkUrl = logoDarkUrl
      let newFaviconUrl = faviconUrl

      // Upload files if selected
      if (logoFile) {
        const url = await uploadFile(logoFile, 'logo')
        if (url) {
          console.log('📝 Guardando logo URL:', url)
          newLogoUrl = url
        }
      }

      if (logoDarkFile) {
        const url = await uploadFile(logoDarkFile, 'logo-dark')
        if (url) {
          console.log('📝 Guardando logo dark URL:', url)
          newLogoDarkUrl = url
        }
      }

      if (faviconFile) {
        const url = await uploadFile(faviconFile, 'favicon')
        if (url) {
          console.log('📝 Guardando favicon URL:', url)
          newFaviconUrl = url
        }
      }

      console.log('💾 Guardando en base de datos:', {
        logo_url: newLogoUrl,
        logo_dark_url: newLogoDarkUrl,
        favicon_url: newFaviconUrl
      })

      // Save to database
      const { error } = await supabase
        .from('cms_brand')
        .upsert({
          id: '00000000-0000-0000-0000-000000000001',
          logo_url: newLogoUrl,
          logo_dark_url: newLogoDarkUrl,
          favicon_url: newFaviconUrl,
          brand_name: 'Tokiia',
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      // Update state
      setLogoUrl(newLogoUrl)
      setLogoDarkUrl(newLogoDarkUrl)
      setFaviconUrl(newFaviconUrl)

      // Clear file inputs
      setLogoFile(null)
      setLogoDarkFile(null)
      setFaviconFile(null)

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving logos:', error)
      alert('Error al guardar. Verifica la consola.')
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return <div className="text-white">Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Gestión de Logos</h1>
        <p className="text-text-secondary">
          Sube y gestiona los logos de tu marca
        </p>
      </div>

      {success && (
        <div className="bg-accent-green/10 border border-accent-green text-accent-green px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          ¡Logos guardados exitosamente!
        </div>
      )}

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-white">Logo Principal</CardTitle>
          <CardDescription className="text-text-secondary">
            Logo que aparece en el header de la landing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {logoUrl && (
            <div className="p-4 bg-bg-secondary rounded-lg border border-tokiia-border">
              <p className="text-sm text-text-secondary mb-2">Logo actual:</p>
              <div className="relative h-20 w-full bg-white/5 rounded flex items-center justify-center">
                <Image
                  src={logoUrl}
                  alt="Logo actual"
                  width={200}
                  height={60}
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-white">Logo Claro (para fondo oscuro)</Label>
            <Input
              type="file"
              accept="image/png,image/svg+xml,image/jpeg,image/webp"
              onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
              className="bg-bg-secondary border-tokiia-border text-white"
            />
            <p className="text-sm text-text-secondary">
              Formato recomendado: PNG o SVG transparente
            </p>
            {logoFile && (
              <p className="text-sm text-accent-green flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Archivo seleccionado: {logoFile.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-white">Logo Oscuro (para fondo claro)</Label>
            <Input
              type="file"
              accept="image/png,image/svg+xml,image/jpeg,image/webp"
              onChange={(e) => setLogoDarkFile(e.target.files?.[0] || null)}
              className="bg-bg-secondary border-tokiia-border text-white"
            />
            {logoDarkFile && (
              <p className="text-sm text-accent-green flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Archivo seleccionado: {logoDarkFile.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-white">Favicon</Label>
            <Input
              type="file"
              accept="image/png,image/x-icon,image/jpeg"
              onChange={(e) => setFaviconFile(e.target.files?.[0] || null)}
              className="bg-bg-secondary border-tokiia-border text-white"
            />
            <p className="text-sm text-text-secondary">
              32x32px o 64x64px - Aparece en la pestaña del navegador
            </p>
            {faviconFile && (
              <p className="text-sm text-accent-green flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Archivo seleccionado: {faviconFile.name}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="p-6 bg-accent-blue/10 border border-accent-blue rounded-lg">
        <div className="flex items-start gap-3">
          <ImageIcon className="h-5 w-5 text-accent-blue mt-0.5" />
          <div>
            <p className="text-sm text-accent-blue font-semibold mb-1">
              ℹ️ Información sobre Supabase Storage
            </p>
            <p className="text-sm text-text-secondary">
              Los archivos se suben al bucket <code className="bg-bg-dark px-2 py-1 rounded">tokiia</code> en Supabase Storage.
              Las imágenes son públicas y accesibles vía URL.
            </p>
          </div>
        </div>
      </div>

      <Button
        onClick={handleSave}
        disabled={uploading || (!logoFile && !logoDarkFile && !faviconFile)}
        className="bg-primary hover:bg-primary-dark text-white"
      >
        <Upload className="mr-2 h-4 w-4" />
        {uploading ? 'Subiendo...' : 'Guardar cambios'}
      </Button>
    </div>
  )
}
