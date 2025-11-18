'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import RichTextEditor from '@/components/cms/RichTextEditor'
import { Save, Eye, Shield, Download } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function PrivacyEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [documentId, setDocumentId] = useState('')
  const [title, setTitle] = useState('Política de Privacidad')
  const [content, setContent] = useState(`<h1>Política de Privacidad de Tokiia</h1>

<p>Última actualización: ${new Date().toLocaleDateString('es-ES')}</p>

<h2>1. Información que Recopilamos</h2>

<h3>1.1 Información Automática</h3>
<p>Cuando utilizas Tokiia, recopilamos automáticamente:</p>
<ul>
  <li>Dirección IP y ubicación aproximada</li>
  <li>Tipo de navegador y sistema operativo</li>
  <li>Páginas visitadas y tiempo de navegación</li>
</ul>

<h3>1.2 Información que Proporcionas</h3>
<ul>
  <li>Dirección de correo electrónico (opcional)</li>
  <li>Información de contacto para soporte</li>
  <li>Preferencias de usuario</li>
</ul>

<h2>2. Cómo Usamos tu Información</h2>
<p>Utilizamos la información recopilada para:</p>
<ul>
  <li>Proporcionar y mejorar nuestros servicios</li>
  <li>Comunicarnos contigo sobre actualizaciones</li>
  <li>Detectar y prevenir fraudes</li>
  <li>Cumplir con obligaciones legales</li>
</ul>

<h2>3. Seguridad de los Datos</h2>
<p>Implementamos medidas de seguridad para proteger tu información:</p>
<ul>
  <li>Encriptación de datos en tránsito y en reposo</li>
  <li>Servidores seguros con acceso limitado</li>
  <li>Auditorías de seguridad regulares</li>
</ul>

<h2>4. Tus Derechos</h2>
<p>Tienes derecho a:</p>
<ul>
  <li><strong>Acceso:</strong> Solicitar una copia de tus datos</li>
  <li><strong>Rectificación:</strong> Corregir datos incorrectos</li>
  <li><strong>Eliminación:</strong> Solicitar la eliminación de tus datos</li>
</ul>

<h2>5. Contacto</h2>
<p>Para consultas sobre privacidad: <a href="mailto:privacy@tokiia.com">privacy@tokiia.com</a></p>`)

  useEffect(() => {
    fetchPrivacyData()
  }, [])

  const fetchPrivacyData = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_legal')
        .select('*')
        .eq('document_type', 'privacy')
        .limit(1)
        .single()

      if (error) throw error

      if (data) {
        setDocumentId(data.id)
        setTitle(data.title)
        setContent(data.content)
      }
    } catch (error) {
      console.error('Error fetching privacy data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setSuccess(false)

    try {
      const { error } = await supabase
        .from('cms_legal')
        .upsert({
          id: documentId || undefined,
          document_type: 'privacy',
          title,
          content,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving privacy data:', error)
      alert('Error al guardar. Verifica los permisos de Supabase.')
    } finally {
      setSaving(false)
    }
  }

  const handleExport = () => {
    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'politica-de-privacidad.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return <div className="text-white">Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Editor de Política de Privacidad</h1>
          <p className="text-text-secondary">
            Usa el editor visual para crear y editar tu política
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/privacy" target="_blank">
            <Button variant="outline" className="border-accent-blue text-accent-blue">
              <Eye className="mr-2 h-4 w-4" />
              Vista Previa
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={handleExport}
            className="border-accent-green text-accent-green"
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar HTML
          </Button>
        </div>
      </div>

      {success && (
        <div className="bg-accent-green/10 border border-accent-green text-accent-green px-4 py-3 rounded-lg">
          ¡Política de privacidad guardada exitosamente!
        </div>
      )}

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Información del Documento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Título del Documento</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-bg-secondary border-tokiia-border text-white"
              placeholder="Política de Privacidad"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-accent-green">Editor Visual</CardTitle>
          <CardDescription className="text-text-secondary">
            Usa la barra de herramientas para dar formato al texto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Escribe la política de privacidad aquí..."
            height="500px"
          />
        </CardContent>
      </Card>

      <div className="p-6 bg-accent-blue/10 border border-accent-blue rounded-lg">
        <h3 className="text-accent-blue font-semibold mb-2">⚖️ Consejos para la Política de Privacidad:</h3>
        <ul className="text-sm text-white space-y-1">
          <li>• Especifica qué datos recopilas y por qué</li>
          <li>• Explica cómo proteges la información del usuario</li>
          <li>• Define los derechos del usuario sobre sus datos (GDPR)</li>
          <li>• Incluye información sobre cookies si las usas</li>
          <li>• Menciona con quién compartes la información</li>
          <li>• Proporciona información de contacto del responsable de datos</li>
        </ul>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary-dark text-white px-8"
        >
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Guardando...' : 'Guardar política'}
        </Button>
        <Button
          variant="outline"
          className="border-tokiia-border text-white"
          onClick={() => setContent('')}
        >
          Limpiar contenido
        </Button>
      </div>
    </div>
  )
}
