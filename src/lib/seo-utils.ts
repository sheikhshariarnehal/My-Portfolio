/**
 * SEO Utility Functions
 * Centralized SEO helpers for schema generation, URL formatting, and metadata
 */

const SITE_URL = 'https://sheikhshariarnehal.me';
const SITE_NAME = 'Sheikh Shariar Nehal Portfolio';
const AUTHOR_NAME = 'Sheikh Shariar Nehal';

export { SITE_URL, SITE_NAME, AUTHOR_NAME };

/**
 * Generate a full URL from a relative path
 */
export function getFullUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Generate Person schema (reusable reference)
 */
export function getPersonSchemaRef() {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    'name': AUTHOR_NAME,
  };
}

/**
 * Generate Organization schema for the portfolio/brand
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Sheikh Shariar Nehal - Full Stack Development',
    'alternateName': 'Shariar Nehal Portfolio',
    'url': SITE_URL,
    'logo': `${SITE_URL}/assets/images/Favicon.webp`,
    'founder': {
      '@id': `${SITE_URL}/#person`,
    },
    'sameAs': [
      'https://github.com/sheikhshariarnehal',
      'https://www.linkedin.com/in/sheikh-shariar-nehal-473166268/',
      'https://twitter.com/shariar_nehal',
      'https://t.me/sheikhshariarnehal',
      'https://instagram.com/sheikhshariarnehal',
      'https://www.facebook.com/sheikhshariarnehal.cse',
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+8801750627421',
      'contactType': 'Customer Service',
      'email': 'nehal22205101260@diu.edu.bd',
      'availableLanguage': ['English', 'Bengali'],
    },
  };
}

/**
 * Generate FAQ schema from Q&A pairs
 */
export function getFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
}

/**
 * Generate LocalBusiness schema
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'Sheikh Shariar Nehal - Full Stack Development Services',
    'image': `${SITE_URL}/assets/images/profile2.webp`,
    '@id': `${SITE_URL}/#business`,
    'url': SITE_URL,
    'telephone': '+8801750627421',
    'email': 'nehal22205101260@diu.edu.bd',
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Nowabgonj',
      'addressLocality': 'Dhaka',
      'addressRegion': 'Dhaka Division',
      'postalCode': '1212',
      'addressCountry': 'BD',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 23.7104,
      'longitude': 90.4074,
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      'opens': '09:00',
      'closes': '18:00',
    },
    'founder': {
      '@id': `${SITE_URL}/#person`,
    },
    'areaServed': [
      { '@type': 'Country', 'name': 'Bangladesh' },
      { '@type': 'AdministrativeArea', 'name': 'Remote / Worldwide' },
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Web Development Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Full Stack Web Development',
            'description':
              'Custom web applications built with MERN Stack, Next.js, and modern technologies',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Machine Learning Solutions',
            'description':
              'AI and ML solutions using Python, TensorFlow, and scikit-learn',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Mobile App Development',
            'description':
              'Cross-platform mobile applications using React Native',
          },
        },
      ],
    },
  };
}

/**
 * Generate SoftwareApplication schema for a project
 */
export function getProjectSchema(project: {
  title: string;
  description: string;
  image: string;
  category: string;
  tags?: string[] | null;
  live_url?: string | null;
  github_url?: string | null;
  created_at?: string;
}) {
  const categoryMap: Record<string, string> = {
    web: 'WebApplication',
    mern: 'WebApplication',
    ml: 'SoftwareApplication',
    mobile: 'MobileApplication',
    android: 'MobileApplication',
    basicweb: 'WebApplication',
    other: 'SoftwareApplication',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': project.title,
    'applicationCategory': categoryMap[project.category] || 'WebApplication',
    'description': project.description,
    ...(project.live_url && { 'url': project.live_url }),
    'author': {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      'name': AUTHOR_NAME,
    },
    ...(project.created_at && {
      'datePublished': new Date(project.created_at)
        .toISOString()
        .split('T')[0],
    }),
    ...(project.tags && { 'programmingLanguage': project.tags }),
    ...(project.image && {
      'screenshot': project.image.startsWith('http')
        ? project.image
        : `${SITE_URL}${project.image}`,
    }),
    ...(project.github_url && {
      'codeRepository': project.github_url,
    }),
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'operatingSystem': 'Web Browser',
  };
}

/**
 * Generate breadcrumb schema from path segments
 */
export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url,
    })),
  };
}

/**
 * Default FAQ items for the portfolio
 */
export const defaultFAQs = [
  {
    question: 'What technologies does Sheikh Shariar Nehal specialize in?',
    answer:
      'Sheikh Shariar Nehal specializes in MERN Stack (MongoDB, Express.js, React, Node.js), Next.js, TypeScript, Python, Machine Learning, and React Native for mobile development. He also has strong expertise in Supabase, Firebase, PostgreSQL, and modern CSS frameworks like Tailwind CSS.',
  },
  {
    question: 'How can I hire Sheikh Shariar Nehal for a project?',
    answer:
      'You can contact Sheikh Shariar Nehal through the contact form on the website, via email at nehal22205101260@diu.edu.bd, or connect on LinkedIn. He is available for freelance projects, contract work, and full-time opportunities.',
  },
  {
    question: 'What kind of projects does Sheikh Shariar Nehal work on?',
    answer:
      'Sheikh Shariar Nehal works on a wide range of projects including full-stack web applications, e-commerce platforms, learning management systems, mobile apps, machine learning solutions, and progressive web apps (PWAs). His portfolio showcases projects like NestTask, DIU Learning, and Surjamukhi Kindergarten.',
  },
  {
    question: 'Where is Sheikh Shariar Nehal based?',
    answer:
      'Sheikh Shariar Nehal is based in Dhaka, Bangladesh. He is currently studying B.Sc. in Computer Science and Engineering at Daffodil International University. He is available for remote work and accepts international clients.',
  },
  {
    question:
      'Does Sheikh Shariar Nehal offer freelance web development services?',
    answer:
      'Yes, Sheikh Shariar Nehal offers freelance web development services with 3+ years of professional experience. Services include full-stack web development, mobile app development, machine learning solutions, and UI/UX design. Contact him for project quotes and consultations.',
  },
];

/**
 * Generate an ISO date string for lastmod
 */
export function getLastModDate(): string {
  return new Date().toISOString().split('T')[0];
}
