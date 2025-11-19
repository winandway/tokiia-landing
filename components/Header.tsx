'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X, LogIn, UserPlus, Globe, Sparkles, Bitcoin, Coins } from 'lucide-react'
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
            <div className="absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0 z-10">
              <LogoComponent />
            </div>

            {/* Desktop: Botones a la derecha */}
            <div className="hidden md:flex items-center gap-3">
              {/* Selector de idioma */}
              <button
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-white transition-all rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
              >
                <Globe className="h-4 w-4" />
                <span className="font-medium">{language === 'es' ? 'ES' : 'EN'}</span>
              </button>

              <Link href="https://app.tokiia.com/auth/register">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-accent-green/60 text-accent-green hover:bg-accent-green hover:text-white hover:border-accent-green transition-all shadow-sm hover:shadow-lg hover:shadow-accent-green/30 group"
                >
                  <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                  {t.header.createAccount}
                </Button>
              </Link>

              <Link href="https://app.tokiia.com/auth/login">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white shadow-lg shadow-primary/40 hover:shadow-primary/60 transition-all"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  {t.header.login}
                </Button>
              </Link>
            </div>

            {/* Mobile: Botones tipo app con texto (VERSIÓN 2) */}
            <div className="md:hidden flex items-center gap-2">
              <Link href="https://app.tokiia.com/auth/register">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 rounded-full bg-gradient-to-br from-accent-green to-accent-green/80 flex items-center gap-1.5 shadow-lg shadow-accent-green/40 hover:shadow-xl hover:shadow-accent-green/50 transition-all group"
                >
                  <Sparkles className="h-4 w-4 text-white group-hover:rotate-12 transition-transform" />
                  <span className="text-white text-xs font-semibold">{t.header.createShort}</span>
                </motion.button>
              </Link>

              <Link href="https://app.tokiia.com/auth/login">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 rounded-full bg-gradient-to-br from-primary via-primary to-accent-blue flex items-center gap-1.5 shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 transition-all group"
                >
                  <Bitcoin className="h-4 w-4 text-white group-hover:scale-110 transition-transform" />
                  <span className="text-white text-xs font-semibold">{t.header.loginShort}</span>
                </motion.button>
              </Link>
            </div>
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
                  <p className="text-xs uppercase tracking-wide text-text-secondary font-semibold flex items-center gap-2">
                    <Globe className="h-3 w-3" />
                    {t.header.language}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setLanguage('es')
                        setMobileMenuOpen(false)
                      }}
                      className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                        language === 'es'
                          ? 'bg-gradient-to-r from-primary to-accent-blue text-white shadow-lg shadow-primary/30'
                          : 'bg-bg-secondary text-text-secondary hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {t.header.spanish}
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('en')
                        setMobileMenuOpen(false)
                      }}
                      className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                        language === 'en'
                          ? 'bg-gradient-to-r from-primary to-accent-blue text-white shadow-lg shadow-primary/30'
                          : 'bg-bg-secondary text-text-secondary hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {t.header.english}
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-tokiia-border/50" />

                {/* Actions */}
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-wide text-text-secondary font-semibold flex items-center gap-2">
                    <Sparkles className="h-3 w-3" />
                    {t.header.actions}
                  </p>

                  <Link
                    href="https://app.tokiia.com/auth/register"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start border-accent-green/60 text-accent-green hover:bg-accent-green hover:text-white hover:border-accent-green shadow-sm hover:shadow-lg hover:shadow-accent-green/30 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-full bg-accent-green/10 group-hover:bg-white/20 flex items-center justify-center mr-3 transition-all">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">{t.header.createAccount}</div>
                        <div className="text-xs opacity-70">{t.header.startFree}</div>
                      </div>
                    </Button>
                  </Link>

                  <Link
                    href="https://app.tokiia.com/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full justify-start bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white shadow-lg shadow-primary/40 hover:shadow-primary/60 transition-all group">
                      <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center mr-3 transition-all">
                        <LogIn className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">{t.header.login}</div>
                        <div className="text-xs opacity-80">{t.header.toMyAccount}</div>
                      </div>
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
