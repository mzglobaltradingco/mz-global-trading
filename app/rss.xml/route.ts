import { getAllPosts } from "@/lib/knowledge";

const BASE_URL = "https://mzglobaltrading.com";

export function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE_URL}/knowledge/${post.slug}/</link>
      <guid isPermaLink="true">${BASE_URL}/knowledge/${post.slug}/</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      <author>info@mzglobaltrading.com (${post.author})</author>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MZ Global Trading — Knowledge Hub</title>
    <link>${BASE_URL}/knowledge/</link>
    <description>Trade insights, sourcing guides and company updates from MZ Global Trading — Pakistan&apos;s B2B textile sourcing partner for brands in USA, UK, Europe and Canada.</description>
    <language>en-gb</language>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <copyright>© ${new Date().getFullYear()} MZ Global Trading</copyright>
    <image>
      <url>${BASE_URL}/images/logo/Master_Logo.webp</url>
      <title>MZ Global Trading</title>
      <link>${BASE_URL}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
