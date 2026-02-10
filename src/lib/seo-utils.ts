// SEO Utility Functions for Schema.org JSON-LD structured data

export interface FAQ {
  question: string;
  answer: string;
}

export const defaultFAQs: FAQ[] = [
  {
    question: "Who is Sheikh Shariar Nehal?",
    answer: "Sheikh Shariar Nehal is a Full-Stack Web Developer and Machine Learning enthusiast from Bangladesh, specializing in React, Next.js, Node.js, Python, and MERN Stack development with 3+ years of experience."
  },
  {
    question: "What technologies does Shariar Nehal work with?",
    answer: "Shariar Nehal works with React.js, Next.js, Node.js, TypeScript, JavaScript, Python, MongoDB, PostgreSQL, Supabase, Firebase, and various other modern web technologies."
  },
  {
    question: "How can I contact Sheikh Shariar Nehal?",
    answer: "You can contact Sheikh Shariar Nehal through the contact form on this portfolio website, via email at nehal22205101260@diu.edu.bd, or through social media platforms like LinkedIn and GitHub."
  },
  {
    question: "Does Shariar Nehal offer freelance web development services?",
    answer: "Yes, Sheikh Shariar Nehal offers freelance full-stack web development services including website design, MERN stack development, and custom web application development."
  },
  {
    question: "Where is Sheikh Shariar Nehal based?",
    answer: "Sheikh Shariar Nehal is based in Nowabgonj, Dhaka, Bangladesh. He is currently studying B.Sc. in Computer Science and Engineering at Daffodil International University."
  }
];

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://sheikhshariarnehal.me/#organization",
    "name": "Sheikh Shariar Nehal - Web Development Services",
    "url": "https://sheikhshariarnehal.me",
    "logo": {
      "@type": "ImageObject",
      "url": "https://sheikhshariarnehal.me/assets/images/Favicon.webp",
      "width": 512,
      "height": 512
    },
    "founder": {
      "@type": "Person",
      "@id": "https://sheikhshariarnehal.me/#person"
    },
    "sameAs": [
      "https://github.com/sheikhshariarnehal",
      "https://www.linkedin.com/in/shekhshariarnehal/",
      "https://twitter.com/shariar_nehal"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "nehal22205101260@diu.edu.bd",
      "contactType": "customer service",
      "availableLanguage": ["English", "Bengali"]
    }
  };
}

export function getFAQSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Sheikh Shariar Nehal - Full Stack Web Development",
    "url": "https://sheikhshariarnehal.me",
    "image": "https://sheikhshariarnehal.me/assets/images/profile2.webp",
    "telephone": "+8801750627421",
    "email": "nehal22205101260@diu.edu.bd",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nowabgonj",
      "addressRegion": "Dhaka",
      "addressCountry": "BD"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.7104,
      "longitude": 90.4074
    },
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "21:00"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 23.7104,
        "longitude": 90.4074
      },
      "geoRadius": "50000"
    }
  };
}

export function getProjectSchema(project: any) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.name || project.title,
    "description": project.description || project.desc || '',
    "url": project.live_url || project.links?.view || '',
    "applicationCategory": "WebApplication",
    "operatingSystem": "Web",
    "author": {
      "@type": "Person",
      "name": "Sheikh Shariar Nehal",
      "@id": "https://sheikhshariarnehal.me/#person"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
}
