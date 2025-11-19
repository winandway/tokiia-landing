'use client'

import Link from 'next/link'
import { Twitter, Send, MessageCircle } from 'lucide-react'

interface FooterColumn {
  title: string
  links: Array<{ text: string; url: string }>
}

interface FooterData {
  columns: FooterColumn[]
  social: {
    twitter?: string
    telegram?: string
    discord?: string
  }
  copyright: string
}

export default function Footer({ data }: { data?: FooterData }) {
  const defaultData: FooterData = {
    columns: [
      {
        title: 'Producto',
        links: [
          { text: 'Features', url: '#features' },
          { text: 'Seguridad', url: '#security' },
          { text: 'Roadmap', url: '#roadmap' }
        ]
      },
      {
        title: 'Compañía',
        links: [
          { text: 'Acerca de', url: '/about' },
          { text: 'Blog', url: '/blog' },
          { text: 'Contacto', url: '/contact' }
        ]
      },
      {
        title: 'Legal',
        links: [
          { text: 'Términos', url: '/terms' },
          { text: 'Privacidad', url: '/privacy' }
        ]
      }
    ],
    social: {
      twitter: 'https://twitter.com/tokiia',
      telegram: 'https://t.me/tokiia',
      discord: 'https://discord.gg/tokiia'
    },
    copyright: '© 2024 Tokiia. Todos los derechos reservados.'
  }

  const footerData = data || defaultData

  return (
    <footer className="bg-bg-card border-t border-tokiia-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent-blue bg-clip-text text-transparent mb-4">
                Tokiia
              </h3>
            </Link>
            <p className="text-text-secondary mb-6 max-w-sm">
              Tu billetera Web3 descentralizada con P2P integrado. Gestiona tus criptomonedas de forma segura y eficiente.
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              {footerData.social.twitter && (
                <a
                  href={footerData.social.twitter}
                  className="w-10 h-10 rounded-full bg-bg-secondary border border-tokiia-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary transition-all duration-300"
                >
                  <Twitter size={18} />
                </a>
              )}
              {footerData.social.telegram && (
                <a
                  href={footerData.social.telegram}
                  className="w-10 h-10 rounded-full bg-bg-secondary border border-tokiia-border flex items-center justify-center text-text-secondary hover:text-accent-blue hover:border-accent-blue transition-all duration-300"
                >
                  <Send size={18} />
                </a>
              )}
              {footerData.social.discord && (
                <a
                  href={footerData.social.discord}
                  className="w-10 h-10 rounded-full bg-bg-secondary border border-tokiia-border flex items-center justify-center text-text-secondary hover:text-accent-green hover:border-accent-green transition-all duration-300"
                >
                  <MessageCircle size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Links columns */}
          {footerData.columns.map((column, index) => (
            <div key={index}>
              <h4 className="font-semibold text-white mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.url}
                      className="text-text-secondary hover:text-primary transition-colors duration-300"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-tokiia-border text-center text-text-secondary text-sm">
          {footerData.copyright}
        </div>
      </div>
    </footer>
  )
}
