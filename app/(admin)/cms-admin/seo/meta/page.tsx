'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Save, Globe } from 'lucide-react'

export default function MetaTagsEditor() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Meta Tags</h1>
        <p className="text-text-secondary">
          Configura los meta tags para mejorar el SEO
        </p>
      </div>

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Meta Tags Principales
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Información básica que aparece en buscadores
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Title</Label>
            <Input
              defaultValue="Tokiia - Billetera Web3 P2P Descentralizada"
              className="bg-bg-secondary border-tokiia-border text-white"
            />
            <p className="text-sm text-text-secondary">
              Máximo 60 caracteres - Aparece en la pestaña del navegador
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Description</Label>
            <Textarea
              defaultValue="La billetera cripto más avanzada con P2P integrado. Envía, recibe e intercambia criptomonedas de forma segura."
              className="bg-bg-secondary border-tokiia-border text-white min-h-[100px]"
            />
            <p className="text-sm text-text-secondary">
              Máximo 160 caracteres - Aparece en los resultados de búsqueda
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Keywords</Label>
            <Input
              defaultValue="wallet, cripto, P2P, blockchain, Web3, DeFi, tokiia"
              className="bg-bg-secondary border-tokiia-border text-white"
            />
            <p className="text-sm text-text-secondary">
              Separadas por comas
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Author</Label>
            <Input
              defaultValue="Tokiia"
              className="bg-bg-secondary border-tokiia-border text-white"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-primary">Open Graph (Redes Sociales)</CardTitle>
          <CardDescription className="text-text-secondary">
            Cómo se ve tu sitio al compartir en redes sociales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">OG Title</Label>
            <Input
              defaultValue="Tokiia Wallet - Tu billetera Web3 descentralizada"
              className="bg-bg-secondary border-tokiia-border text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">OG Description</Label>
            <Textarea
              defaultValue="Gestiona tus criptomonedas de forma segura con P2P integrado"
              className="bg-bg-secondary border-tokiia-border text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">OG Image (URL)</Label>
            <Input
              placeholder="https://tokiia.com/og-image.jpg"
              className="bg-bg-secondary border-tokiia-border text-white"
            />
            <p className="text-sm text-text-secondary">
              Recomendado: 1200x630px
            </p>
          </div>
        </CardContent>
      </Card>

      <Button className="bg-primary hover:bg-primary-dark text-white">
        <Save className="mr-2 h-4 w-4" />
        Guardar meta tags
      </Button>
    </div>
  )
}
