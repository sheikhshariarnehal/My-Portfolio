/**
 * Schema.org JSON-LD builders for structured data.
 * Each function returns a plain object ready for JSON.stringify().
 */

import { SITE_URL } from '../data/site';

interface SeoData {
  name: string;
  jobTitle: string;
  description: string;
  email: string;
  telephone: string;
  nationality: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
  university: string;
  universityUrl: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  telegram?: string;
  instagram?: string;
  facebook?: string;
}

export function buildPersonSchema(seo: SeoData, profileImage: string) {
  const nameParts = seo.name.split(' ');
  const familyName = nameParts.pop() ?? '';
  const givenName = nameParts.join(' ');

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: seo.name,
    alternateName: ['Shariar Nehal', 'Sheikh Nehal', 'Nehal'],
    givenName,
    familyName,
    url: SITE_URL,
    image: {
      '@type': 'ImageObject',
      url: `${SITE_URL}${profileImage}`,
      width: 400,
      height: 400,
    },
    jobTitle: seo.jobTitle,
    description: seo.description,
    email: seo.email,
    telephone: seo.telephone,
    nationality: { '@type': 'Country', name: seo.nationality },
    address: {
      '@type': 'PostalAddress',
      addressLocality: seo.addressLocality,
      addressRegion: seo.addressRegion,
      addressCountry: seo.addressCountry,
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: seo.university,
      url: seo.universityUrl,
    },
    knowsAbout: [
      'React.js', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript', 'Python',
      'MERN Stack', 'Full Stack Development', 'Machine Learning', 'Web Design',
      'REST APIs', 'PostgreSQL', 'MongoDB', 'Supabase', 'Firebase',
    ],
    knowsLanguage: ['en', 'bn'],
    worksFor: { '@type': 'Organization', name: 'Freelance' },
    sameAs: [seo.github, seo.linkedin, seo.twitter, seo.telegram, seo.instagram, seo.facebook].filter(Boolean),
  };
}

export function buildWebsiteSchema(seo: SeoData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: `${seo.name} Portfolio`,
    alternateName: 'Shariar Nehal Portfolio',
    url: SITE_URL,
    description: `Portfolio website of ${seo.name} showcasing web development projects, skills, and professional experience`,
    publisher: { '@id': `${SITE_URL}/#person` },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: { '@id': `${SITE_URL}/#person` },
  };
}

export function buildBreadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects/` },
      { '@type': 'ListItem', position: 3, name: 'Experience', item: `${SITE_URL}/experience/` },
    ],
  };
}
