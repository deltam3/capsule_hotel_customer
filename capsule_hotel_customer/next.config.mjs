/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dkhpnhdpniqygqzuhiga.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/capsule-images/**",
      },
    ],
  },
};

export default nextConfig;
