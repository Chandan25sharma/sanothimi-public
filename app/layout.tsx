import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { template: '%s | BrahamDev Sharma', default: 'BrahamDev Sharma — . & CPA in Siraha, Nepal' },
  description: 'BrahamDev Sharma is a professional CPA and . based in Siraha, Nepal, offering expert financial management and strategic advisory services.',
  keywords: 'BrahamDev Sharma, Siraha, Nepal, CPA, ., Financial Management',
  icons: { icon: '/B-dev.jpg', apple: '/B-dev.jpg' },
  openGraph: {
    title: 'BrahamDev Sharma — .',
    description: 'Expert financial guidance in Siraha, Nepal.',
    type: 'website',
    images: [{ url: '/B-dev.jpg', width: 800, height: 800, alt: 'BrahamDev Sharma' }]
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
          '@context':'https://schema.org','@type':'Person',name:'BrahamDev Sharma',jobTitle:'., CPA',
          telephone:'+977 980-6391489',email:'bdevsharma23@gmail.com',url:'https://brahamdev.com',
          address:{'@type':'PostalAddress',addressLocality:'Siraha',addressRegion:'Siraha',addressCountry:'NP'},
        })}} />
      </head>
      <body>
        <Navbar />
        <div className="pt-[70px]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
