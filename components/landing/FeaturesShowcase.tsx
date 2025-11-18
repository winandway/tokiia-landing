'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowLeftRight, TrendingUp, History, DollarSign } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FeaturesShowcase() {
  const { t } = useLanguage()

  const features = [
    {
      title: t.featuresShowcase.features.p2p.title,
      description: t.featuresShowcase.features.p2p.description,
      items: [
        t.featuresShowcase.features.p2p.items.noFees,
        t.featuresShowcase.features.p2p.items.secure,
        t.featuresShowcase.features.p2p.items.methods
      ],
      image: '/p2p-compra-venta.png',
      icon: DollarSign,
      color: 'primary'
    },
    {
      title: t.featuresShowcase.features.swap.title,
      description: t.featuresShowcase.features.swap.description,
      items: [
        t.featuresShowcase.features.swap.items.rates,
        t.featuresShowcase.features.swap.items.instant,
        t.featuresShowcase.features.swap.items.tokens
      ],
      image: '/menu-swap-prime-p2p.png',
      icon: ArrowLeftRight,
      color: 'accent-blue'
    },
    {
      title: t.featuresShowcase.features.history.title,
      description: t.featuresShowcase.features.history.description,
      items: [
        t.featuresShowcase.features.history.items.complete,
        t.featuresShowcase.features.history.items.filters,
        t.featuresShowcase.features.history.items.export
      ],
      image: '/histtorial.png',
      icon: History,
      color: 'accent-green'
    },
    {
      title: t.featuresShowcase.features.analytics.title,
      description: t.featuresShowcase.features.analytics.description,
      items: [
        t.featuresShowcase.features.analytics.items.realtime,
        t.featuresShowcase.features.analytics.items.stats,
        t.featuresShowcase.features.analytics.items.tracking
      ],
      image: '/datos-analitico.png',
      icon: TrendingUp,
      color: 'primary'
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-bg-dark to-purple-900/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.featuresShowcase.title} <span className="text-primary">{t.featuresShowcase.titleHighlight}</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            {t.featuresShowcase.subtitle}
          </p>
        </motion.div>

        <div className="space-y-24">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
              >
                {/* Image */}
                <div className="flex-1 relative">
                  <div className={`absolute inset-0 bg-${feature.color}/20 blur-3xl rounded-full`} />
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={400}
                    height={800}
                    className="relative rounded-2xl shadow-2xl shadow-black/50 mx-auto max-w-sm"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-${feature.color}/20 border border-${feature.color}/30 mb-6`}>
                    <Icon className={`text-${feature.color}`} size={32} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-text-secondary mb-6 max-w-xl">
                    {feature.description}
                  </p>
                  <ul className="space-y-3 text-left inline-block">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-text-secondary">
                        <div className={`w-2 h-2 bg-${feature.color} rounded-full`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
