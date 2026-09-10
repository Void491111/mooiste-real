import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    position: "bottom-right",
  },

    async rewrites() {
      if (!process.env.API_ORIGIN) return [];

    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_ORIGIN}/:path*`,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "acvijtpypzhdsjregfnc.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;

