'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'

const languages = [
  {
    code: 'es' as const,
    name: 'Español',
    flag: '🇪🇸'
  },
  {
    code: 'en' as const,
    name: 'English',
    flag: '🇺🇸'
  }
]

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex gap-2 bg-bg-card/80 backdrop-blur-lg border border-tokiia-border rounded-full p-1.5 sm:p-2 shadow-lg">
      {languages.map((lang) => {
        const isActive = language === lang.code

        return (
          <motion.button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`
              relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 text-xs sm:text-sm
              ${isActive
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:bg-bg-secondary hover:text-white'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${lang.name}`}
          >
            <span className="text-base sm:text-xl">{lang.flag}</span>
            <span className="font-medium hidden xs:inline">
              {lang.name}
            </span>

            {isActive && (
              <motion.div
                layoutId="activeLanguage"
                className="absolute inset-0 bg-primary rounded-full -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
