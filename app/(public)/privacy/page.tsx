import { supabase } from '@/lib/supabase'
import Link from 'next/link'

async function getPrivacy() {
  const { data, error } = await supabase
    .from('cms_legal')
    .select('*')
    .eq('doc_type', 'privacy')
    .limit(1)
    .single()

  if (error) {
    console.error('Error fetching privacy:', error)
    return null
  }

  return data
}

export default async function PrivacyPage() {
  const privacy = await getPrivacy()

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-dark to-bg-darker">
      <header className="border-b border-tokiia-border bg-bg-dark/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            Tokiia
          </Link>
          <Link
            href="/"
            className="text-text-secondary hover:text-white transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-bg-card border border-tokiia-border rounded-lg p-8 md:p-12">
          {privacy ? (
            <div
              className="prose prose-invert prose-purple max-w-none
                prose-headings:text-accent-green
                prose-h1:text-4xl prose-h1:mb-6
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-p:text-text-secondary prose-p:leading-relaxed
                prose-a:text-accent-blue prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-ul:text-text-secondary
                prose-li:mb-2
              "
              dangerouslySetInnerHTML={{ __html: privacy.content }}
            />
          ) : (
            <div className="text-center py-12">
              <h1 className="text-4xl font-bold text-white mb-4">
                Política de Privacidad
              </h1>
              <p className="text-text-secondary mb-8">
                La política de privacidad aún no está disponible.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
              >
                Volver al inicio
              </Link>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-tokiia-border mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-text-secondary text-sm">
          <p>© 2024 Tokiia. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
