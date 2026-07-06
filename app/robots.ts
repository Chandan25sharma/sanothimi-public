import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://sanothimi.com/sitemap.xml',
    host: 'https://sanothimi.com',
  };
}
