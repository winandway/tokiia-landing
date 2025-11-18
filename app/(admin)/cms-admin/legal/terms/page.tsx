'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import RichTextEditor from '@/components/cms/RichTextEditor'
import { Save, Eye, FileText, Download } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function TermsEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [documentId, setDocumentId] = useState('')
  const [title, setTitle] = useState('Términos y Condiciones')
  const [content, setContent] = useState(`<h1>Términos y Condiciones de Tokiia</h1>

<p>Última actualización: ${new Date().toLocaleDateString('es-ES')}</p>

<h2>1. Aceptación de los Términos</h2>
<p>Al acceder y utilizar Tokiia Wallet, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro servicio.</p>

<h2>2. Descripción del Servicio</h2>
<p>Tokiia es una billetera Web3 descentralizada que permite a los usuarios gestionar criptomonedas de forma segura. El servicio incluye funcionalidades de envío, recepción e intercambio de activos digitales.</p>

<h2>3. Responsabilidades del Usuario</h2>
<ul>
  <li>Mantener la seguridad de sus claves privadas y frases de recuperación</li>
  <li>No compartir sus credenciales de acceso con terceros</li>
  <li>No utilizar el servicio para actividades ilegales</li>
  <li>Verificar cuidadosamente todas las transacciones antes de confirmarlas</li>
</ul>

<h2>4. Limitación de Responsabilidad</h2>
<p>Tokiia no se hace responsable por:</p>
<ul>
  <li>Pérdida de claves privadas o frases de recuperación</li>
  <li>Errores en transacciones enviadas a direcciones incorrectas</li>
  <li>Fluctuaciones en el valor de las criptomonedas</li>
</ul>

<h2>5. Contacto</h2>
<p>Para preguntas sobre estos términos: <a href="mailto:legal@tokiia.com">legal@tokiia.com</a></p>`)

  useEffect(() => {
    fetchTermsData()
  }, [])

  const fetchTermsData = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_legal')
        .select('*')
        .eq('document_type', 'terms')
        .limit(1)
        .single()

      if (error) throw error

      if (data) {
        setDocumentId(data.id)
        setTitle(data.title)
        setContent(data.content)
      }
    } catch (error) {
      console.error('Error fetching terms data:', error)
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
          document_type: 'terms',
          title,
          content,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving terms data:', error)
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
    a.download = 'terminos-y-condiciones.html'
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
          <h1 className="text-4xl font-bold text-white mb-2">Editor de Términos y Condiciones</h1>
          <p className="text-text-secondary">
            Usa el editor visual para crear y editar tus términos
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/terms" target="_blank">
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
          ¡Términos guardados exitosamente!
        </div>
      )}

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-5 w-5" />
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
              placeholder="Términos y Condiciones"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-primary">Editor Visual</CardTitle>
          <CardDescription className="text-text-secondary">
            Usa la barra de herramientas para dar formato al texto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Escribe los términos y condiciones aquí..."
            height="500px"
          />
        </CardContent>
      </Card>

      <div className="p-6 bg-accent-green/10 border border-accent-green rounded-lg">
        <h3 className="text-accent-green font-semibold mb-2">💡 Consejos para los Términos:</h3>
        <ul className="text-sm text-white space-y-1">
          <li>• Sé claro y específico sobre lo que está permitido y prohibido</li>
          <li>• Incluye información sobre responsabilidades del usuario</li>
          <li>• Define claramente las limitaciones de responsabilidad</li>
          <li>• Especifica cómo se manejan las disputas</li>
          <li>• Incluye información de contacto legal</li>
        </ul>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary-dark text-white px-8"
        >
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Guardando...' : 'Guardar términos'}
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
