'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserPlus, LogIn } from 'lucide-react'
import LanguageSelector from '@/components/LanguageSelector'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Header() {
  const { t } = useLanguage()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/80 backdrop-blur-lg border-b border-tokiia-border"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - Espacio reservado */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-accent-blue rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl sm:text-2xl">T</span>
            </div>
            <span className="hidden sm:block text-white font-bold text-xl">Tokiia</span>
          </Link>

          {/* Center buttons - Hidden on mobile, visible on tablet+ */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <Link href="https://app.tokiia.com/auth/register" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary transition-all"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Crear cuenta
              </Button>
            </Link>
            <Link href="https://app.tokiia.com/auth/login" target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/50 hover:shadow-primary/70 transition-all"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Acceder
              </Button>
            </Link>
          </div>

          {/* Mobile buttons - Visible only on mobile */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="https://app.tokiia.com/auth/login" target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary-dark text-white text-xs px-3"
              >
                <LogIn className="mr-1 h-3 w-3" />
                Acceder
              </Button>
            </Link>
          </div>

          {/* Language selector - Always visible but responsive */}
          <div className="hidden md:block">
            <LanguageSelector />
          </div>
        </div>

        {/* Mobile language selector - Below header on mobile */}
        <div className="md:hidden pb-3">
          <LanguageSelector />
        </div>
      </div>
    </motion.header>
  )
}
