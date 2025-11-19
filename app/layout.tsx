import { Inter } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import { LanguageProvider } from "@/contexts/LanguageContext"
import DynamicFavicon from "@/components/DynamicFavicon"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tokiia - Billetera Web3 P2P Descentralizada",
  description: "La billetera cripto más avanzada con P2P integrado. Envía, recibe e intercambia criptomonedas de forma segura.",
  keywords: ["wallet", "cripto", "P2P", "blockchain", "Web3", "DeFi"],
  authors: [{ name: "Tokiia" }],

  // Metabase URL (actualiza con tu dominio en producción)
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),

  // Open Graph para Facebook, WhatsApp, LinkedIn
  openGraph: {
    title: "Tokiia - Billetera Web3 P2P Descentralizada",
    description: "Tu billetera cripto más avanzada con P2P integrado. Gestiona tus criptomonedas de forma segura y descentralizada.",
    url: "/",
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US"],
    siteName: "Tokiia",
    images: [
      {
        url: "/wallet-preview.jpeg",
        width: 800,
        height: 1600,
        alt: "Tokiia Wallet - Billetera Web3 P2P Descentralizada",
        type: "image/jpeg",
      }
    ],
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Tokiia - Billetera Web3 P2P Descentralizada",
    description: "Tu billetera cripto más avanzada con P2P integrado. Gestiona tus criptomonedas de forma segura.",
    images: ["/wallet-preview.jpeg"],
    creator: "@tokiia", // Actualiza con tu @ de Twitter
    site: "@tokiia",
  },

  // Información adicional
  applicationName: "Tokiia Wallet",
  category: "finance",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <DynamicFavicon />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
