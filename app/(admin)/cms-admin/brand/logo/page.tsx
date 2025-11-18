'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'

export default function LogoManager() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Gestión de Logos</h1>
        <p className="text-text-secondary">
          Sube y gestiona los logos de tu marca
        </p>
      </div>

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-white">Logo Principal</CardTitle>
          <CardDescription className="text-text-secondary">
            Logo que aparece en el header de la landing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Logo Claro (para fondo oscuro)</Label>
            <Input
              type="file"
              accept="image/*"
              className="bg-bg-secondary border-tokiia-border text-white"
            />
            <p className="text-sm text-text-secondary">
              Formato recomendado: PNG o SVG transparente
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Logo Oscuro (para fondo claro)</Label>
            <Input
              type="file"
              accept="image/*"
              className="bg-bg-secondary border-tokiia-border text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Favicon</Label>
            <Input
              type="file"
              accept="image/*"
              className="bg-bg-secondary border-tokiia-border text-white"
            />
            <p className="text-sm text-text-secondary">
              32x32px o 64x64px - Aparece en la pestaña del navegador
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="p-6 bg-accent-blue/10 border border-accent-blue rounded-lg">
        <p className="text-sm text-accent-blue">
          📝 <strong>Nota:</strong> Esta funcionalidad requiere Supabase Storage configurado.
          Por ahora puedes usar URLs externas o configurar Supabase siguiendo SETUP-SUPABASE.md
        </p>
      </div>

      <Button className="bg-primary hover:bg-primary-dark text-white">
        <Upload className="mr-2 h-4 w-4" />
        Guardar cambios
      </Button>
    </div>
  )
}
