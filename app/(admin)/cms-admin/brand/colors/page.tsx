'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Palette, Save } from 'lucide-react'

export default function ColorManager() {
  const colors = [
    { name: 'Morado Principal', key: 'primary', value: '#8B5CF6' },
    { name: 'Morado Oscuro', key: 'primary-dark', value: '#7C3AED' },
    { name: 'Verde Acento', key: 'accent-green', value: '#10B981' },
    { name: 'Azul Acento', key: 'accent-blue', value: '#3B82F6' },
    { name: 'Fondo Oscuro', key: 'bg-dark', value: '#0F0F14' },
    { name: 'Fondo Card', key: 'bg-card', value: '#1A1A23' },
    { name: 'Fondo Secundario', key: 'bg-secondary', value: '#252530' },
    { name: 'Bordes', key: 'border', value: '#2D2D3A' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Colores de Marca</h1>
        <p className="text-text-secondary">
          Personaliza la paleta de colores de tu sitio
        </p>
      </div>

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Paleta de Colores
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Modifica los colores principales de tu marca
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {colors.map((color) => (
              <div key={color.key} className="space-y-2">
                <Label className="text-white">{color.name}</Label>
                <div className="flex gap-2">
                  <div
                    className="w-12 h-10 rounded border border-tokiia-border"
                    style={{ backgroundColor: color.value }}
                  />
                  <Input
                    type="text"
                    value={color.value}
                    className="bg-bg-secondary border-tokiia-border text-white font-mono"
                    placeholder="#000000"
                  />
                  <Input
                    type="color"
                    value={color.value}
                    className="w-14 h-10 bg-bg-secondary border-tokiia-border cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="p-6 bg-accent-green/10 border border-accent-green rounded-lg">
        <p className="text-sm text-accent-green">
          💡 <strong>Tip:</strong> Los cambios en los colores requieren editar el archivo{' '}
          <code className="bg-bg-dark px-2 py-1 rounded">tailwind.config.ts</code>
        </p>
      </div>

      <div className="flex gap-4">
        <Button className="bg-primary hover:bg-primary-dark text-white">
          <Save className="mr-2 h-4 w-4" />
          Guardar colores
        </Button>
        <Button variant="outline" className="border-tokiia-border text-white">
          Restablecer por defecto
        </Button>
      </div>
    </div>
  )
}
