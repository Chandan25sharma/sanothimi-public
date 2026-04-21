import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  metadataBase: new URL("https://sanothimi.com.np"),
  title: { template: '%s | Sanothimi', default: 'Sanothimi | Elite SaaS Engineering Hub' },
  description: 'Sanothimi is Nepal\'s premier SaaS Engineering Hub, specializing in School Management ERPs, Enterprise Financial Systems, and bespoke cloud infrastructure.',
  keywords: 'Sanothimi, SaaS Nepal, SchoolSathi, ERP Nepal, Cloud Engineering Bhaktapur, Fintech Nepal',
  icons: { icon: '/icon.png', apple: '/icon.png' },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org','@type':'Corporation',
          name:'Sanothimi Private Limited',
          alternateName: 'Sanothimi',
          url:'https://sanothimi.com.np',
          logo:'https://sanothimi.com.np/logo-no-background.png',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+977 980-6391489',
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
          <Navbar />
          <div className="pt-[70px]">{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
