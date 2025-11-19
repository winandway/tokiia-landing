import Header from '@/components/Header'
import CryptoTicker from '@/components/CryptoTicker'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <CryptoTicker />
      <div className="pt-28 sm:pt-32">
        {children}
      </div>
    </>
  )
}
