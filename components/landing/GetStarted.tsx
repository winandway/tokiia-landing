'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserPlus, Download, Rocket } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function GetStarted() {
  const { t } = useLanguage()

  const steps = [
    {
      number: '01',
      icon: UserPlus,
      title: t.getStarted.steps.create.title,
      description: t.getStarted.steps.create.description,
      time: t.getStarted.steps.create.time
    },
    {
      number: '02',
      icon: Download,
      title: t.getStarted.steps.deposit.title,
      description: t.getStarted.steps.deposit.description,
      time: t.getStarted.steps.deposit.time
    },
    {
      number: '03',
      icon: Rocket,
      title: t.getStarted.steps.start.title,
      description: t.getStarted.steps.start.description,
      time: t.getStarted.steps.start.time
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-purple-900/10 to-bg-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.getStarted.title} <span className="text-primary">{t.getStarted.titleHighlight}</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            {t.getStarted.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}

                <div className="bg-bg-card border border-tokiia-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 h-full">
                  {/* Number badge */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-xl mb-4">
                    <span className="text-2xl font-bold text-primary">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-accent-blue/20 rounded-2xl mb-6">
                    <Icon className="text-primary" size={32} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-text-secondary mb-4">{step.description}</p>

                  {/* Time badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm text-primary font-medium">{step.time}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA with image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-primary/20 via-purple-900/20 to-accent-blue/20 border border-primary/30 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {t.getStarted.cta.title}
                </h3>
                <p className="text-text-secondary mb-6">
                  {t.getStarted.cta.description}
                </p>
                <Link href="https://app.tokiia.com/auth/login" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg shadow-lg shadow-primary/50 hover:shadow-primary/70 transition-all duration-300"
                  >
                    <Rocket className="mr-2" size={20} />
                    {t.getStarted.cta.button}
                  </Button>
                </Link>
                <p className="text-sm text-text-secondary mt-4">
                  {t.getStarted.cta.note}
                </p>
              </div>

              <div className="relative">
                <Image
                  src="/pagado-tokiia.jpeg"
                  alt="Tokiia App"
                  width={300}
                  height={600}
                  className="rounded-2xl shadow-2xl shadow-primary/30 mx-auto"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
