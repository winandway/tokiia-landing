'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface HeroData {
  title: string
  subtitle: string
  cta_text: string
  cta_url: string
}

export default function HeroSection({ data }: { data?: HeroData }) {
  const heroData = data || {
    title: 'Tokiia Wallet',
    subtitle: 'Tu billetera Web3 descentralizada con P2P integrado',
    cta_text: 'Abrir Wallet',
    cta_url: 'https://app.tokiia.com/auth/login'
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900/20 via-bg-dark to-bg-dark overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      {/* Gradient orbs - Responsive sizes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-accent-blue/20 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-purple-400 to-accent-blue bg-clip-text text-transparent mb-4 sm:mb-6 px-2"
          >
            {heroData.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-8 sm:mb-10 max-w-2xl mx-auto px-4"
          >
            {heroData.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          >
            <Link href={heroData.cta_url} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg shadow-primary/50 hover:shadow-primary/70 transition-all duration-300"
              >
                {heroData.cta_text}
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg transition-all duration-300"
            >
              Conocer más
            </Button>
          </motion.div>

          {/* Wallet Preview Image - Improved responsive */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 sm:mt-16 flex justify-center px-4"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md">
              <Image
                src="/wallet-preview.jpeg"
                alt="Vista previa de Tokiia Wallet"
                width={400}
                height={800}
                className="rounded-xl sm:rounded-2xl shadow-2xl shadow-primary/30 w-full h-auto"
                priority
              />
            </div>
          </motion.div>

          {/* Stats or badges - Improved responsive */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto px-4"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">100%</div>
              <div className="text-xs sm:text-sm text-text-secondary">Descentralizado</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent-green mb-1 sm:mb-2">0%</div>
              <div className="text-xs sm:text-sm text-text-secondary">Comisiones ocultas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent-blue mb-1 sm:mb-2">24/7</div>
              <div className="text-xs sm:text-sm text-text-secondary">Soporte</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
