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
    // Load saved language from localStorage
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setLanguageState(savedLang)
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
