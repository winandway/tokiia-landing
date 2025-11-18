import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Edit,
  Grid,
  Image,
  Palette,
  Search,
  Globe,
  FileText,
  Shield
} from 'lucide-react'

export default function CMSDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-text-secondary">
          Bienvenido al panel de administración de Tokiia
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Contenido Card */}
        <Card className="bg-bg-card border-tokiia-border hover:border-primary/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-primary">Contenido</CardTitle>
            <CardDescription className="text-text-secondary">
              Gestiona el contenido de la landing page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/cms-admin/content/hero">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-bg-secondary">
                <Edit className="mr-2 h-4 w-4" />
                Editar Hero Banner
              </Button>
            </Link>
            <Link href="/cms-admin/content/features">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-bg-secondary">
                <Grid className="mr-2 h-4 w-4" />
                Gestionar Features
              </Button>
            </Link>
            <Link href="/cms-admin/content/footer">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-bg-secondary">
                <FileText className="mr-2 h-4 w-4" />
                Editar Footer
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Marca Card */}
        <Card className="bg-bg-card border-tokiia-border hover:border-accent-green/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-accent-green">Marca</CardTitle>
            <CardDescription className="text-text-secondary">
              Personaliza la identidad visual
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/cms-admin/brand/logo">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-bg-secondary">
                <Image className="mr-2 h-4 w-4" />
                Cambiar Logo
              </Button>
            </Link>
            <Link href="/cms-admin/brand/colors">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-bg-secondary">
                <Palette className="mr-2 h-4 w-4" />
                Colores de Marca
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* SEO Card */}
        <Card className="bg-bg-card border-tokiia-border hover:border-accent-blue/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-accent-blue">SEO</CardTitle>
            <CardDescription className="text-text-secondary">
              Optimización para motores de búsqueda
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/cms-admin/seo/meta">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-bg-secondary">
                <Search className="mr-2 h-4 w-4" />
                Meta Tags
              </Button>
            </Link>
            <Link href="/cms-admin/seo/google">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-bg-secondary">
                <Globe className="mr-2 h-4 w-4" />
                Google Console
              </Button>
            </Link>
            <Link href="/cms-admin/seo/sitemap">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-bg-secondary">
                <FileText className="mr-2 h-4 w-4" />
                Sitemap
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Legal Card */}
        <Card className="bg-bg-card border-tokiia-border hover:border-primary/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-primary">Legal</CardTitle>
            <CardDescription className="text-text-secondary">
              Documentos legales y políticas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/cms-admin/legal/terms">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-bg-secondary">
                <FileText className="mr-2 h-4 w-4" />
                Términos y Condiciones
              </Button>
            </Link>
            <Link href="/cms-admin/legal/privacy">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-bg-secondary">
                <Shield className="mr-2 h-4 w-4" />
                Política de Privacidad
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-gradient-to-br from-primary/20 to-accent-blue/20 border-primary/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Estadísticas Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-bg-card rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">6</div>
                <div className="text-sm text-text-secondary">Features Activas</div>
              </div>
              <div className="text-center p-4 bg-bg-card rounded-lg">
                <div className="text-3xl font-bold text-accent-green mb-1">100%</div>
                <div className="text-sm text-text-secondary">Sitio Activo</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-bg-card border-tokiia-border">
        <CardHeader>
          <CardTitle className="text-white">Acciones Rápidas</CardTitle>
          <CardDescription className="text-text-secondary">
            Accesos directos a tareas comunes
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Link href="/cms-admin/content/hero">
            <Button className="bg-primary hover:bg-primary-dark">
              Editar Hero Principal
            </Button>
          </Link>
          <Link href="/cms-admin/content/features">
            <Button variant="outline" className="border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white">
              Agregar Feature
            </Button>
          </Link>
          <Link href="/cms-admin/seo/google">
            <Button variant="outline" className="border-accent-green text-accent-green hover:bg-accent-green hover:text-white">
              Configurar SEO
            </Button>
          </Link>
          <Link href="/" target="_blank">
            <Button variant="ghost" className="text-white hover:bg-bg-secondary">
              Ver Sitio Público
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
