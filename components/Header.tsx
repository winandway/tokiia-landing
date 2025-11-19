'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X, LogIn, UserPlus, Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Header() {
  const { t, language, setLanguage } = useLanguage()
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    async function fetchLogo() {
      try {
        const { data, error } = await supabase
          .from('cms_brand')
          .select('logo_url')
          .limit(1)
          .single()

        if (!error && data?.logo_url) {
          console.log('✅ Logo URL cargada desde DB:', data.logo_url)
          setLogoUrl(data.logo_url)
        } else {
          console.log('⚠️ No se encontró logo en la DB o hubo error:', error)
        }
      } catch (error) {
        console.error('❌ Error fetching logo:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogo()
  }, [])

  // Cerrar menú móvil al hacer clic fuera
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const LogoComponent = () => (
    <Link href="/" className="flex items-center group" onClick={() => setMobileMenuOpen(false)}>
      {!loading && logoUrl ? (
        <Image
          src={logoUrl}
          alt="Tokiia"
          width={180}
          height={60}
          className="h-10 md:h-12 w-auto group-hover:scale-105 transition-transform"
          priority
          unoptimized
        />
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-accent-blue rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="text-white font-bold text-xl md:text-2xl">T</span>
          </div>
          <span className="text-white font-bold text-xl md:text-2xl">Tokiia</span>
        </div>
      )}
    </Link>
  )

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/95 backdrop-blur-xl border-b border-tokiia-border/50"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile: Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Logo - Centrado en móvil, izquierda en desktop */}
            <div className="absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0">
              <LogoComponent />
            </div>

            {/* Desktop: Botones a la derecha */}
            <div className="hidden md:flex items-center gap-3">
              {/* Selector de idioma */}
              <button
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                <Globe className="h-4 w-4" />
                <span className="font-medium">{language === 'es' ? 'ES' : 'EN'}</span>
              </button>

              <Link href="https://app.tokiia.com/auth/register">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary transition-all"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Crear cuenta
                </Button>
              </Link>

              <Link href="https://app.tokiia.com/auth/login">
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Acceder
                </Button>
              </Link>
            </div>

            {/* Mobile: Solo botón Acceder */}
            <Link
              href="https://app.tokiia.com/auth/login"
              className="md:hidden"
            >
              <Button
                size="sm"
                className="bg-primary hover:bg-primary-dark text-white px-4"
              >
                <LogIn className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-16 left-0 bottom-0 w-3/4 max-w-sm bg-bg-dark border-r border-tokiia-border z-40 md:hidden overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                {/* Language Selector */}
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wide text-text-secondary font-semibold">Idioma</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setLanguage('es')
                        setMobileMenuOpen(false)
                      }}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        language === 'es'
                          ? 'bg-primary text-white'
                          : 'bg-bg-secondary text-text-secondary hover:text-white'
                      }`}
                    >
                      🇪🇸 Español
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('en')
                        setMobileMenuOpen(false)
                      }}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        language === 'en'
                          ? 'bg-primary text-white'
                          : 'bg-bg-secondary text-text-secondary hover:text-white'
                      }`}
                    >
                      🇺🇸 English
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-tokiia-border" />

                {/* Actions */}
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-wide text-text-secondary font-semibold">Acciones</p>

                  <Link
                    href="https://app.tokiia.com/auth/register"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start border-primary/50 text-primary hover:bg-primary/10"
                    >
                      <UserPlus className="mr-3 h-5 w-5" />
                      Crear cuenta
                    </Button>
                  </Link>

                  <Link
                    href="https://app.tokiia.com/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full justify-start bg-primary hover:bg-primary-dark text-white">
                      <LogIn className="mr-3 h-5 w-5" />
                      Acceder a mi cuenta
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
