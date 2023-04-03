/**
 * @return {Response} sitemap.xml
 */
export const GET = (): Response => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://snubi-net.vercel.app/</loc>
      <lastmod>2023-04-03T07:30:09+00:00</lastmod>
      <priority>1.00</priority>
    </url>
    <url>
      <loc>https://snubi-net.vercel.app/works</loc>
      <lastmod>2023-04-03T07:30:09+00:00</lastmod>
      <priority>0.80</priority>
    </url>
    <url>
      <loc>https://snubi-net.vercel.app/posts</loc>
      <lastmod>2023-04-03T07:30:09+00:00</lastmod>
      <priority>0.80</priority>
    </url>
    <url>
      <loc>https://snubi-net.vercel.app/works/destiny-card</loc>
      <lastmod>2023-04-03T07:30:09+00:00</lastmod>
      <priority>0.64</priority>
    </url>
    <url>
      <loc>https://snubi-net.vercel.app/works/souls-card</loc>
      <lastmod>2023-04-03T07:30:09+00:00</lastmod>
      <priority>0.64</priority>
    </url>
    <url>
      <loc>https://snubi-net.vercel.app/posts/143</loc>
      <lastmod>2023-04-03T07:30:09+00:00</lastmod>
      <priority>0.64</priority>
    </url>
    <url>
      <loc>https://snubi-net.vercel.app/posts/136</loc>
      <lastmod>2023-04-03T07:30:09+00:00</lastmod>
      <priority>0.64</priority>
    </url>
  </urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "content-type": "application/xml",
      "Cache-control": "max-age=0, s-maxage=86400, stale-while-revalidate",
    },
  });
};
