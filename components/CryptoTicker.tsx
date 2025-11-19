'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface CryptoData {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  image: string
}

export default function CryptoTicker() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCryptoData()
    // Actualizar cada 60 segundos
    const interval = setInterval(fetchCryptoData, 60000)
    return () => clearInterval(interval)
  }, [])

  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h'
      )
      const data = await response.json()
      setCryptoData(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching crypto data:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-gradient-to-r from-bg-secondary/95 via-bg-secondary/90 to-bg-secondary/95 backdrop-blur-md border-b border-tokiia-border/30 h-12 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-accent-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-accent-green rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    )
  }

  // Duplicamos los datos para crear el efecto de loop infinito
  const duplicatedData = [...cryptoData, ...cryptoData, ...cryptoData]

  return (
    <div className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-gradient-to-r from-bg-secondary/95 via-bg-secondary/90 to-bg-secondary/95 backdrop-blur-md border-b border-tokiia-border/30 overflow-hidden">
      {/* Gradiente en los bordes para efecto fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-bg-secondary/95 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-bg-secondary/95 to-transparent z-10 pointer-events-none" />

      <div className="relative overflow-hidden h-12">
        <motion.div
          className="flex items-center gap-6 md:gap-8 py-3"
          animate={{
            x: [0, -2000], // Ancho total del contenido duplicado
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50, // Velocidad más lenta para mejor lectura
              ease: "linear",
            },
          }}
        >
          {duplicatedData.map((crypto, index) => (
            <div
              key={`${crypto.id}-${index}`}
              className="flex items-center gap-2 whitespace-nowrap px-2"
            >
              {/* Icono de la moneda */}
              <img
                src={crypto.image}
                alt={crypto.name}
                className="w-5 h-5 md:w-6 md:h-6 rounded-full"
              />

              {/* Símbolo */}
              <span className="text-white font-bold text-sm md:text-base uppercase">
                {crypto.symbol}
              </span>

              {/* Precio */}
              <span className="text-text-secondary font-medium text-sm md:text-base">
                ${crypto.current_price.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>

              {/* Cambio porcentual */}
              <span
                className={`flex items-center gap-1 text-xs md:text-sm font-semibold ${
                  crypto.price_change_percentage_24h >= 0
                    ? 'text-accent-green'
                    : 'text-red-400'
                }`}
              >
                {crypto.price_change_percentage_24h >= 0 ? (
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
                ) : (
                  <TrendingDown className="w-3 h-3 md:w-4 md:h-4" />
                )}
                {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
              </span>

              {/* Separador */}
              <div className="w-px h-4 bg-tokiia-border/30 ml-2" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
