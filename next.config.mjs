/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output configuration per Azure Web App
  output: 'standalone',
  
  // Configurazione per Azure Web App
  experimental: {
    // Abilita standalone build per migliore performance su Azure
    outputFileTracingRoot: process.cwd(),
  },
  
  // Asset prefix per servire i file statici correttamente
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  // Configurazione per il server
  poweredByHeader: false,
  
  // Ottimizzazioni per Azure
  compress: true,
  
  // Headers di sicurezza
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Configurazione per le immagini (se usi next/image)
  images: {
    domains: ['nerone-site.azurewebsites.net'],
    // Ottimizzazione per Azure
    unoptimized: false,
  },
  
  // Configurazione del server per Azure
  serverRuntimeConfig: {
    // Configurazioni lato server
  },
  
  publicRuntimeConfig: {
    // Configurazioni pubbliche
  },
};

export default nextConfig;
