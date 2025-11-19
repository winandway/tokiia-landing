import { ImageResponse } from 'next/og'

// Configuración de la imagen
export const runtime = 'edge'
export const alt = 'Tokiia - Billetera Web3 P2P Descentralizada'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Generar la imagen Open Graph dinámicamente
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1625 0%, #2d1b3d 50%, #1a1625 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Logo y título */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '30px',
          }}
        >
          {/* Título principal */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #9333EA 0%, #3B82F6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Tokiia Wallet
          </div>

          {/* Subtítulo */}
          <div
            style={{
              fontSize: '36px',
              color: '#E5E7EB',
              textAlign: 'center',
              lineHeight: 1.4,
              maxWidth: '900px',
            }}
          >
            Tu billetera Web3 descentralizada con P2P integrado
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: '40px',
              marginTop: '40px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#10B981',
                fontSize: '24px',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#10B981',
                }}
              />
              Descentralizado
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#10B981',
                fontSize: '24px',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#10B981',
                }}
              />
              P2P Integrado
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#10B981',
                fontSize: '24px',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#10B981',
                }}
              />
              100% Seguro
            </div>
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: '28px',
              color: '#9CA3AF',
              marginTop: '20px',
            }}
          >
            tokiia.com
          </div>
        </div>

        {/* Decoración de fondo */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            background: 'radial-gradient(circle at 50% 50%, #9333EA 0%, transparent 70%)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
