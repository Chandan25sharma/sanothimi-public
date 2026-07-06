import CommandPalette from '@/components/CommandPalette';
import CookieConsent from '@/components/CookieConsent';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { LanguageProvider } from '@/context/LanguageContext';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sanothimi.com"),
  title: { template: '%s | Sanothimi', default: 'Sanothimi | Elite SaaS Engineering Hub' },
  description: 'Sanothimi is Nepal\'s premier SaaS Engineering Hub, specializing in School Management ERPs, Enterprise Financial Systems, and bespoke cloud infrastructure.',
  keywords: 'Sanothimi, SaaS Nepal, SchoolSathi, ERP Nepal, Cloud Engineering Bhaktapur, Fintech Nepal',
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
    apple: [{ url: '/icon.png' }],
    shortcut: '/icon.png',
  },
  openGraph: {
    title: 'Sanothimi — Elite SaaS Engineering',
    description: 'Digitizing the institutional fabric of Nepal with world-class cloud infrastructure.',
    type: 'website',
    images: [{ url: '/icon.png', width: 800, height: 800, alt: 'Sanothimi' }]
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/icon.png" />
        <link rel="shortcut icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org','@type':'Corporation',
          name:'Sanothimi Private Limited',
          alternateName: 'Sanothimi',
          url:'https://www.sanothimi.com',
          logo:'https://www.sanothimi.com/logo-full.png',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+977 9704714937',
            contactType: 'technical support',
            areaServed: 'NP',
            availableLanguage: ['en', 'ne']
          },
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Bhaktapur',
            addressRegion: 'Bagmati',
            addressCountry: 'NP'
          }
        })}} />
      </head>
      <body>
        <LanguageProvider>
          <CommandPalette />
          <Navbar />
          <div className="pt-[70px]">{children}</div>
          <Footer />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
