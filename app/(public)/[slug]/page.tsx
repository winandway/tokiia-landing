import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface PageProps {
  params: {
    slug: string
  }
}

// Generar metadata dinámico para SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { data: page } = await supabase
    .from('cms_pages')
    .select('title, meta_description, featured_image')
    .eq('slug', params.slug)
    .eq('is_published', true)
    .single()

  if (!page) {
    return {
      title: 'Página no encontrada',
    }
  }

  return {
    title: page.title,
    description: page.meta_description || undefined,
    openGraph: {
      title: page.title,
      description: page.meta_description || undefined,
      images: page.featured_image ? [page.featured_image] : [],
    },
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { data: page, error } = await supabase
    .from('cms_pages')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_published', true)
    .single()

  if (error || !page) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-dark via-bg-dark to-purple-900/20">
      {/* Header simple */}
      <header className="border-b border-tokiia-border">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <a href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent-blue bg-clip-text text-transparent">
            Tokiia
          </a>
        </div>
      </header>

      {/* Contenido de la página */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Imagen destacada */}
        {page.featured_image && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={page.featured_image}
              alt={page.title}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Título */}
        <h1 className="text-5xl font-bold text-white mb-8">
          {page.title}
        </h1>

        {/* Contenido HTML */}
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white
            prose-h1:text-primary prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-4
            prose-h2:text-accent-green prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-3
            prose-h3:text-accent-blue prose-h3:text-2xl prose-h3:font-bold prose-h3:mb-2
            prose-p:text-text-secondary prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-primary prose-a:underline hover:prose-a:text-primary-dark
            prose-strong:text-white prose-strong:font-bold
            prose-ul:text-text-secondary prose-ul:list-disc prose-ul:ml-6
            prose-ol:text-text-secondary prose-ol:list-decimal prose-ol:ml-6
            prose-li:mb-2
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-text-secondary
            prose-code:bg-bg-card prose-code:text-accent-green prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-bg-card prose-pre:text-white prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
          "
          dangerouslySetInnerHTML={{ __html: page.content }}
        />

        {/* Footer simple */}
        <div className="mt-16 pt-8 border-t border-tokiia-border">
          <p className="text-text-secondary text-sm text-center">
            Última actualización: {new Date(page.updated_at).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-tokiia-border mt-16">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <p className="text-text-secondary text-sm">
              © 2024 Tokiia. Todos los derechos reservados.
            </p>
            <a
              href="/"
              className="text-primary hover:text-primary-dark transition-colors"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
