import type { APIRoute } from 'astro';
import { getProjects } from '../lib/supabase';
import { SITE_URL, SITE_NAME, AUTHOR_NAME } from '../lib/seo-utils';

export const GET: APIRoute = async () => {
  const projects = await getProjects();

  const rssItems = projects
    .map((project) => {
      const pubDate = project.created_at
        ? new Date(project.created_at).toUTCString()
        : new Date().toUTCString();

      const link = project.live_url || `${SITE_URL}/projects/`;

      const imageUrl = project.image.startsWith('http')
        ? project.image
        : `${SITE_URL}/assets/images/projects/${project.image}.webp`;

      const categoryMap: Record<string, string> = {
        web: 'Web Development',
        mern: 'Web Development',
        ml: 'Machine Learning',
        mobile: 'Mobile Development',
        android: 'Mobile Development',
        basicweb: 'Web Development',
        other: 'Other',
      };

      const category = categoryMap[project.category] || 'Web Development';

      return `    <item>
      <title><![CDATA[${project.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="false">${SITE_URL}/projects/#${project.id}</guid>
      <description><![CDATA[${project.description}]]></description>
      <category>${category}</category>
      <pubDate>${pubDate}</pubDate>
      <author>nehal22205101260@diu.edu.bd (${AUTHOR_NAME})</author>
      <enclosure url="${imageUrl}" type="image/webp" />
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${SITE_NAME} - Portfolio Updates</title>
    <link>${SITE_URL}</link>
    <description>Latest projects and updates from ${AUTHOR_NAME} - Full Stack Developer specializing in MERN Stack, Next.js, Machine Learning, and React Native.</description>
    <language>en-us</language>
    <managingEditor>nehal22205101260@diu.edu.bd (${AUTHOR_NAME})</managingEditor>
    <webMaster>nehal22205101260@diu.edu.bd (${AUTHOR_NAME})</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/assets/images/Favicon.webp</url>
      <title>${SITE_NAME}</title>
      <link>${SITE_URL}</link>
    </image>
    <copyright>Copyright ${new Date().getFullYear()} ${AUTHOR_NAME}. All rights reserved.</copyright>
    <category>Web Development</category>
    <category>Machine Learning</category>
    <category>Mobile Development</category>
    <ttl>1440</ttl>
${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
