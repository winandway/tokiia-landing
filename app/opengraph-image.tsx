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
          background: '#0F0A1E',
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Fondo con gradientes */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1a1625 0%, #2d1b3d 100%)',
          }}
        />

        {/* Círculos decorativos */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)',
            top: '-200px',
            right: '-200px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
            bottom: '-150px',
            left: '-150px',
          }}
        />

        {/* Contenido principal */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px',
          }}
        >
          {/* Logo/Icono */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #9333EA 0%, #3B82F6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              color: 'white',
              fontWeight: 'bold',
              marginBottom: '30px',
            }}
          >
            T
          </div>

          {/* Título principal */}
          <div
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '20px',
              letterSpacing: '-2px',
            }}
          >
            Tokiia Wallet
          </div>

          {/* Subtítulo */}
          <div
            style={{
              fontSize: '36px',
              color: '#A1A1AA',
              lineHeight: 1.4,
              marginBottom: '40px',
              maxWidth: '800px',
            }}
          >
            Tu billetera Web3 descentralizada
            <br />
            con P2P integrado
          </div>

          {/* Features con iconos */}
          <div
            style={{
              display: 'flex',
              gap: '30px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '50px',
                border: '2px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10B981',
                }}
              />
              <span style={{ color: '#10B981', fontSize: '22px', fontWeight: '600' }}>
                Descentralizado
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '50px',
                border: '2px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10B981',
                }}
              />
              <span style={{ color: '#10B981', fontSize: '22px', fontWeight: '600' }}>
                P2P Integrado
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                background: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '50px',
                border: '2px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10B981',
                }}
              />
              <span style={{ color: '#10B981', fontSize: '22px', fontWeight: '600' }}>
                100% Seguro
              </span>
            </div>
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: '32px',
              color: '#9333EA',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#9333EA',
              }}
            />
            tokiia.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
