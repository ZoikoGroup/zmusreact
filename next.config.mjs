/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  async headers() {
    return [
      {
        source: "/:all*(css|js|woff2|png|jpg|jpeg|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },

  async rewrites() {
    return [
      // ✅ EXCLUDE THESE ROUTES FROM BEING TREATED AS BLOG SLUGS
      // Add more if needed
      { source: "/contact-us", destination: "/contact-us" },
      { source: "/contact", destination: "/contact" },
      { source: "/about", destination: "/about" },
      { source: "/checkout", destination: "/checkout" },
      { source: "/business-deals", destination: "/business-deals" },
      { source: "/consumer-information", destination: "/consumer-information" },
      { source: "/college-student-discount-form", destination: "/college-student-discount-form" },

      // ⭐ YOUR BLOG PRETTY URL RULE ⭐
      {
        source: "/:slug",
        destination: "/blog/:slug",
      },
    ];
  },
};

export default nextConfig;
