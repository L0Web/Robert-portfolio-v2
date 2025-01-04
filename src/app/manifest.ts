import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Robert Orji',
    short_name: 'Rob\'s arts',
    description: 'Welcome to my mind space, a collection of my artworks...',
    start_url: '/',
    display: 'standalone',
    background_color: '#fffdfa"',
    theme_color: '#000000',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}