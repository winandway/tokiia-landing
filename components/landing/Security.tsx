'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Shield, Lock, Eye, Fingerprint } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Security() {
  const { t } = useLanguage()

  const securityFeatures = [
    {
      icon: Shield,
      title: t.security.features.enterprise.title,
      description: t.security.features.enterprise.description
    },
    {
      icon: Lock,
      title: t.security.features.control.title,
      description: t.security.features.control.description
    },
    {
      icon: Eye,
      title: t.security.features.transparency.title,
      description: t.security.features.transparency.description
    },
    {
      icon: Fingerprint,
      title: t.security.features.biometric.title,
      description: t.security.features.biometric.description
    }
  ]

  return (
    <section className="py-24 bg-bg-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.security.title} <span className="text-primary">{t.security.titleHighlight}</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            {t.security.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <Image
              src="/matic-tokiia.png"
              alt="Seguridad Tokiia"
              width={400}
              height={800}
              className="relative rounded-2xl shadow-2xl shadow-black/50 mx-auto max-w-sm"
            />
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4 p-6 bg-bg-card border border-tokiia-border rounded-xl hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Icon className="text-primary" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-text-secondary">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap justify-center gap-8 p-8 bg-bg-card border border-tokiia-border rounded-2xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">256-bit</div>
              <div className="text-sm text-text-secondary">{t.security.badges.encryption}</div>
            </div>
            <div className="w-px bg-tokiia-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-green mb-1">2FA</div>
              <div className="text-sm text-text-secondary">{t.security.badges.auth}</div>
            </div>
            <div className="w-px bg-tokiia-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-blue mb-1">Non-Custodial</div>
              <div className="text-sm text-text-secondary">{t.security.badges.control}</div>
            </div>
            <div className="w-px bg-tokiia-border" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">Open Source</div>
              <div className="text-sm text-text-secondary">{t.security.badges.opensource}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
