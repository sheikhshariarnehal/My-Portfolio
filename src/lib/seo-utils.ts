// SEO Utility functions for structured data schemas

export interface FAQ {
  question: string;
  answer: string;
}

export const defaultFAQs: FAQ[] = [
  {
    question: "What services does Sheikh Shariar Nehal offer?",
    answer: "Sheikh Shariar Nehal offers full-stack web development, frontend and backend development, web design, REST API development, database design, and machine learning solutions using modern technologies like React, Next.js, Node.js, Python, and more."
  },
  {
    question: "What technologies does Sheikh Shariar Nehal specialize in?",
    answer: "Specializing in the MERN Stack (MongoDB, Express.js, React, Node.js), Next.js, TypeScript, Python, PostgreSQL, Supabase, Firebase, and modern CSS frameworks like Tailwind CSS."
  },
  {
    question: "How can I contact Sheikh Shariar Nehal?",
    answer: "You can reach out through the contact form on this website, via email, or connect through social media profiles including GitHub, LinkedIn, and Telegram."
  },
  {
    question: "Is Sheikh Shariar Nehal available for freelance work?",
    answer: "Yes, Sheikh Shariar Nehal is available for freelance projects, collaborations, and full-time opportunities in web development and machine learning."
  },
  {
    question: "Where is Sheikh Shariar Nehal based?",
    answer: "Sheikh Shariar Nehal is based in Dhaka, Bangladesh, and is available for remote work worldwide."
  }
];

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://sheikhshariarnehal.me/#organization",
    "name": "Sheikh Shariar Nehal",
    "url": "https://sheikhshariarnehal.me",
    "logo": {
      "@type": "ImageObject",
      "url": "https://sheikhshariarnehal.me/assets/images/Favicon.webp",
      "width": 512,
      "height": 512
    },
    "description": "Professional web development and machine learning services by Sheikh Shariar Nehal.",
    "founder": {
      "@id": "https://sheikhshariarnehal.me/#person"
    },
    "sameAs": [
      "https://github.com/sheikhshariarnehal",
      "https://www.linkedin.com/in/shekhshariarnehal/",
      "https://twitter.com/shariar_nehal"
    ]
  };
}

export function getFAQSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
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
    "@id": "https://sheikhshariarnehal.me/#business",
    "name": "Sheikh Shariar Nehal - Web Development Services",
    "url": "https://sheikhshariarnehal.me",
    "description": "Professional full-stack web development, design, and machine learning services.",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dhaka",
      "addressRegion": "Dhaka",
      "addressCountry": "BD"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.8103,
      "longitude": 90.4125
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "founder": {
      "@id": "https://sheikhshariarnehal.me/#person"
    }
  };
}
