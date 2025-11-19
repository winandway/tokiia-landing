'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function DynamicFavicon() {
  useEffect(() => {
    async function updateFavicon() {
      try {
        const { data, error } = await supabase
          .from('cms_brand')
          .select('favicon_url')
          .limit(1)
          .single()

        if (!error && data?.favicon_url) {
          // Buscar el link del favicon existente o crear uno nuevo
          let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement

          if (!link) {
            link = document.createElement('link')
            link.rel = 'icon'
            document.head.appendChild(link)
          }

          link.href = data.favicon_url
        }
      } catch (error) {
        console.error('Error loading favicon:', error)
      }
    }

    updateFavicon()
  }, [])

  return null // Este componente no renderiza nada
}
