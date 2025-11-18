import HeroSection from '@/components/landing/HeroSection'
import WhyTokiia from '@/components/landing/WhyTokiia'
import FeaturesShowcase from '@/components/landing/FeaturesShowcase'
import Security from '@/components/landing/Security'
import Features from '@/components/landing/Features'
import GetStarted from '@/components/landing/GetStarted'
import Footer from '@/components/landing/Footer'
import { supabase } from '@/lib/supabase'

async function getHeroData() {
  try {
    const { data } = await supabase
      .from('cms_hero')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true })
      .limit(1)
      .single()

    return data
  } catch (error) {
    console.error('Error fetching hero data:', error)
    return null
  }
}

async function getFeaturesData() {
  try {
    const { data } = await supabase
      .from('cms_features')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true })

    return data
  } catch (error) {
    console.error('Error fetching features data:', error)
    return null
  }
}

async function getFooterData() {
  try {
    const { data } = await supabase
      .from('cms_footer')
      .select('*')
      .eq('section', 'main')
      .single()

    if (data && data.links && data.social_media) {
      return {
        columns: data.links.columns || [],
        social: data.social_media || {},
        copyright: data.copyright_text || '© 2024 Tokiia. Todos los derechos reservados.'
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching footer data:', error)
    return null
  }
}

export default async function Home() {
  const [heroData, featuresData, footerData] = await Promise.all([
    getHeroData(),
    getFeaturesData(),
    getFooterData()
  ])

  return (
    <main className="min-h-screen">
      <HeroSection data={heroData} />
      <WhyTokiia />
      <FeaturesShowcase />
      <Security />
      <Features features={featuresData || undefined} />
      <GetStarted />
      <Footer data={footerData || undefined} />
    </main>
  )
}
