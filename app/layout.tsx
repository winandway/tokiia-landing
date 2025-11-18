import { Inter } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import { LanguageProvider } from "@/contexts/LanguageContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tokiia - Billetera Web3 P2P Descentralizada",
  description: "La billetera cripto más avanzada con P2P integrado. Envía, recibe e intercambia criptomonedas de forma segura.",
  keywords: ["wallet", "cripto", "P2P", "blockchain", "Web3", "DeFi"],
  authors: [{ name: "Tokiia" }],
  openGraph: {
    title: "Tokiia - Billetera Web3 P2P Descentralizada",
    description: "La billetera cripto más avanzada con P2P integrado",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
