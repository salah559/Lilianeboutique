/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-cloudinary-or-supabase-domain']
  }
}
module.exports = nextConfig;