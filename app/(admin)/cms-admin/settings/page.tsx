'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Settings, Save, Trash2, Key } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Configuración</h1>
        <p className="text-text-secondary">
          Ajustes generales del CMS y del sitio
        </p>
      </div>

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Información del Sitio
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Configuración básica de tu sitio web
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Nombre del Sitio</Label>
            <Input
              defaultValue="Tokiia"
              className="bg-bg-secondary border-tokiia-border text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">URL del Sitio</Label>
            <Input
              defaultValue="https://tokiia.com"
              className="bg-bg-secondary border-tokiia-border text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Email de Contacto</Label>
            <Input
              defaultValue="contact@tokiia.com"
              type="email"
              className="bg-bg-secondary border-tokiia-border text-white"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Key className="h-5 w-5" />
            Cambiar Contraseña del Admin
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Actualiza tus credenciales de acceso al CMS
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-accent-blue/10 border border-accent-blue rounded-lg">
            <p className="text-sm text-accent-blue mb-2">
              <strong>Contraseña actual:</strong> tokiia2024
            </p>
            <p className="text-xs text-text-secondary">
              Para cambiarla, edita el archivo:{' '}
              <code className="bg-bg-dark px-2 py-1 rounded">
                app/(admin)/cms-admin/login/page.tsx
              </code>
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Nueva Contraseña</Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-bg-secondary border-tokiia-border text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Confirmar Contraseña</Label>
            <Input
              type="password"
              placeholder="••••••••"
              className="bg-bg-secondary border-tokiia-border text-white"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-accent-green">Supabase</CardTitle>
          <CardDescription className="text-text-secondary">
            Configuración de la base de datos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Supabase URL</Label>
            <Input
              value="https://dkpqdkqpmjoexdfbhmeh.supabase.co"
              className="bg-bg-secondary border-tokiia-border text-white font-mono text-sm"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Estado de Conexión</Label>
            <div className="flex items-center gap-2 p-3 bg-bg-secondary rounded">
              <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span className="text-white text-sm">Configurado</span>
            </div>
          </div>

          <div className="p-4 bg-accent-green/10 border border-accent-green rounded-lg">
            <p className="text-sm text-accent-green">
              ℹ️ Para que los cambios se guarden permanentemente, debes ejecutar el schema SQL en Supabase.
              Ver: <strong>SETUP-SUPABASE.md</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-bg-card border-red-500/50">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Zona de Peligro
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Acciones irreversibles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-white text-sm">Limpiar toda la caché del sitio</p>
            <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
              Limpiar Caché
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-white text-sm">Restablecer configuración por defecto</p>
            <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
              Restablecer Todo
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="bg-primary hover:bg-primary-dark text-white">
          <Save className="mr-2 h-4 w-4" />
          Guardar configuración
        </Button>
        <Button variant="outline" className="border-tokiia-border text-white">
          Cancelar
        </Button>
      </div>
    </div>
  )
}
