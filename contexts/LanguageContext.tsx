'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import es from '@/messages/es.json'
import en from '@/messages/en.json'

type Language = 'es' | 'en'
type Messages = typeof es

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Messages
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = { es, en }

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es')

  useEffect(() => {
    // Check if user has a saved language preference
    const savedLang = localStorage.getItem('language') as Language

    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      // Use saved preference
      setLanguageState(savedLang)
    } else {
      // Auto-detect language from browser
      const browserLang = navigator.language || navigator.languages?.[0]

      // Check if browser language starts with 'es' (es, es-ES, es-MX, etc.)
      if (browserLang?.toLowerCase().startsWith('es')) {
        setLanguageState('es')
        localStorage.setItem('language', 'es')
      } else {
        // Default to English for all other languages
        setLanguageState('en')
        localStorage.setItem('language', 'en')
      }

      console.log('🌍 Idioma detectado automáticamente:', browserLang, '→', browserLang?.toLowerCase().startsWith('es') ? 'Español' : 'English')
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    document.documentElement.lang = lang
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language]
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
