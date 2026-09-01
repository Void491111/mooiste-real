import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    position: "bottom-right",
  },
};

image: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "acvijtpypzhdsjregfnc.supabase.co",
       pathname: "/storage/v1/object/public/**",
    }
  ]
}

export default nextConfig;