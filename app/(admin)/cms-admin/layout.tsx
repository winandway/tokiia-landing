'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  FileText,
  Palette,
  Search,
  FileEdit,
  Settings,
  LogOut,
  Home,
  Columns,
  BookOpen
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { AuthProvider, useAuth } from '@/lib/auth-context'

const navigation = [
  { name: 'Dashboard', href: '/cms-admin/dashboard', icon: LayoutDashboard },
  { name: 'Páginas', href: '/cms-admin/pages', icon: BookOpen },
  { name: 'Hero Banner', href: '/cms-admin/content/hero', icon: Home },
  { name: 'Footer', href: '/cms-admin/content/footer', icon: Columns },
  { name: 'Marca', href: '/cms-admin/brand/logo', icon: Palette },
  { name: 'SEO', href: '/cms-admin/seo/google', icon: Search },
  { name: 'Legal', href: '/cms-admin/legal/terms', icon: FileEdit },
  { name: 'Configuración', href: '/cms-admin/settings', icon: Settings },
]

function CMSAdminLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading, signOut } = useAuth()

  useEffect(() => {
    // Si no está logueado y no está en login, redirigir
    if (!loading && !user && pathname !== '/cms-admin/login') {
      router.push('/cms-admin/login')
    }
  }, [loading, user, pathname, router])

  const handleLogout = async () => {
    await signOut()
    router.push('/cms-admin/login')
  }

  // Si está en la página de login, solo mostrar el contenido
  if (pathname === '/cms-admin/login') {
    return <>{children}</>
  }

  // Si está cargando o no está logueado, mostrar loading
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-bg-card border-r border-tokiia-border z-50">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-tokiia-border">
            <Link href="/cms-admin/dashboard">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent-blue bg-clip-text text-transparent">
                Tokiia CMS
              </h1>
            </Link>
            <p className="text-xs text-text-secondary mt-1">
              {user?.email}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname?.startsWith(item.href)
              const Icon = item.icon

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-bg-secondary hover:text-white'
                  )}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-tokiia-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-text-secondary hover:text-white hover:bg-red-500/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-3" size={20} />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

export default function CMSAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CMSAdminLayoutContent>{children}</CMSAdminLayoutContent>
    </AuthProvider>
  )
}
