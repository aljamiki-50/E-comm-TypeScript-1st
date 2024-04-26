/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn.sanity.io",
      "fullstackdotso.nyc3.cdn.digitaloceanspaces.com",
      "fullstackdotso.nyc3.cdn.digitaloceanspaces.com",
    ],
  },
}

export default nextConfig
