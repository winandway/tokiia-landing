'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, ExternalLink, Download } from 'lucide-react'

export default function SitemapManager() {
  const pages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/about', priority: 0.8, changefreq: 'weekly' },
    { url: '/terms', priority: 0.5, changefreq: 'monthly' },
    { url: '/privacy', priority: 0.5, changefreq: 'monthly' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Sitemap</h1>
        <p className="text-text-secondary">
          Gestiona el mapa del sitio para motores de búsqueda
        </p>
      </div>

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Información del Sitemap
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Tu sitemap XML ayuda a Google a indexar tu sitio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-bg-secondary rounded-lg">
            <div className="flex-1">
              <p className="text-white font-mono text-sm">
                https://tokiia.com/sitemap.xml
              </p>
              <p className="text-text-secondary text-sm mt-1">
                URL de tu sitemap
              </p>
            </div>
            <Button variant="outline" className="border-tokiia-border text-white">
              Copiar
            </Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-semibold">Páginas incluidas:</h3>
            <div className="space-y-2">
              {pages.map((page) => (
                <div key={page.url} className="flex items-center justify-between p-3 bg-bg-secondary rounded">
                  <div>
                    <p className="text-white">{page.url}</p>
                    <p className="text-text-secondary text-sm">
                      Prioridad: {page.priority} • Frecuencia: {page.changefreq}
                    </p>
                  </div>
                  <div className="text-accent-green">✓</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-accent-blue">Enviar a Google</CardTitle>
          <CardDescription className="text-text-secondary">
            Notifica a Google sobre tu sitemap
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="space-y-3 text-text-secondary">
            <li className="flex gap-3">
              <span className="text-primary font-bold">1.</span>
              <span>Ve a Google Search Console</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">2.</span>
              <span>Click en "Sitemaps" en el menú lateral</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">3.</span>
              <span>Agrega: sitemap.xml</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">4.</span>
              <span>Click en "Enviar"</span>
            </li>
          </ol>

          <a
            href="https://search.google.com/search-console"
          >
            <Button variant="outline" className="border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white">
              Abrir Google Search Console
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="bg-primary hover:bg-primary-dark text-white">
          <Download className="mr-2 h-4 w-4" />
          Generar Sitemap
        </Button>
        <Button variant="outline" className="border-tokiia-border text-white">
          Actualizar páginas
        </Button>
      </div>
    </div>
  )
}
