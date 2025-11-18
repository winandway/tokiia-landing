'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function WhyTokiia() {
  const { t } = useLanguage()

  const tokiiaFeatures = [
    t.whyTokiia.tokiia.features.registration,
    t.whyTokiia.tokiia.features.interface,
    t.whyTokiia.tokiia.features.p2p,
    t.whyTokiia.tokiia.features.swap,
    t.whyTokiia.tokiia.features.noLimits,
    t.whyTokiia.tokiia.features.support,
    t.whyTokiia.tokiia.features.noKyc,
    t.whyTokiia.tokiia.features.control
  ]

  const othersFeatures = [
    t.whyTokiia.others.features.registration,
    t.whyTokiia.others.features.interface,
    t.whyTokiia.others.features.fees,
    t.whyTokiia.others.features.swap,
    t.whyTokiia.others.features.limits,
    t.whyTokiia.others.features.support,
    t.whyTokiia.others.features.kyc,
    t.whyTokiia.others.features.custody
  ]

  return (
    <section className="py-24 bg-bg-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-green/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.whyTokiia.title} <span className="text-primary">{t.whyTokiia.titleHighlight}</span>?
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            {t.whyTokiia.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Tokiia */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-primary/20 to-accent-blue/20 border border-primary/30 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-primary mb-6">{t.whyTokiia.tokiia.title}</h3>
            <ul className="space-y-4">
              {tokiiaFeatures.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="text-accent-green mt-1 flex-shrink-0" size={20} />
                  <span className="text-white">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Binance & Others */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-bg-card border border-tokiia-border rounded-2xl p-8 opacity-60"
          >
            <h3 className="text-2xl font-bold text-text-secondary mb-6">{t.whyTokiia.others.title}</h3>
            <ul className="space-y-4">
              {othersFeatures.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="text-red-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-text-secondary line-through">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          <div className="text-center p-6 bg-bg-card border border-tokiia-border rounded-xl">
            <div className="text-3xl font-bold text-primary mb-2">2 min</div>
            <div className="text-sm text-text-secondary">{t.whyTokiia.stats.time}</div>
          </div>
          <div className="text-center p-6 bg-bg-card border border-tokiia-border rounded-xl">
            <div className="text-3xl font-bold text-accent-green mb-2">0%</div>
            <div className="text-sm text-text-secondary">{t.whyTokiia.stats.p2pFees}</div>
          </div>
          <div className="text-center p-6 bg-bg-card border border-tokiia-border rounded-xl">
            <div className="text-3xl font-bold text-accent-blue mb-2">24/7</div>
            <div className="text-sm text-text-secondary">{t.whyTokiia.stats.support}</div>
          </div>
          <div className="text-center p-6 bg-bg-card border border-tokiia-border rounded-xl">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-text-secondary">{t.whyTokiia.stats.control}</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
