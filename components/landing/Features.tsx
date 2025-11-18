'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Feature {
  icon: string
  title: string
  description: string
  color: string
}

const colorClasses = {
  purple: 'bg-primary/10 border-primary text-primary',
  green: 'bg-accent-green/10 border-accent-green text-accent-green',
  blue: 'bg-accent-blue/10 border-accent-blue text-accent-blue',
}

export default function Features({ features }: { features?: Feature[] }) {
  const defaultFeatures: Feature[] = [
    {
      icon: '↑',
      title: 'Enviar',
      description: 'Envía cripto instantáneamente a cualquier dirección',
      color: 'purple'
    },
    {
      icon: '↓',
      title: 'Recibir',
      description: 'Recibe pagos sin complicaciones con tu dirección única',
      color: 'green'
    },
    {
      icon: '⇄',
      title: 'Swap',
      description: 'Intercambia tokens al instante con las mejores tasas',
      color: 'blue'
    },
    {
      icon: '🔒',
      title: 'Seguro',
      description: 'Tus claves privadas siempre bajo tu control',
      color: 'purple'
    },
    {
      icon: '⚡',
      title: 'Rápido',
      description: 'Transacciones ultrarrápidas en múltiples redes',
      color: 'blue'
    },
    {
      icon: '🌐',
      title: 'P2P',
      description: 'Intercambio directo persona a persona integrado',
      color: 'green'
    }
  ]

  const displayFeatures = features || defaultFeatures

  return (
    <section id="features" className="py-24 bg-bg-dark relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Características principales
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Todo lo que necesitas para gestionar tus criptomonedas de forma segura y eficiente
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div className="h-full bg-bg-card border border-tokiia-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
                <div className={cn(
                  'w-16 h-16 rounded-xl border-2 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300',
                  colorClasses[feature.color as keyof typeof colorClasses] || colorClasses.purple
                )}>
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-text-secondary">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
