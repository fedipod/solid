/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: "standalone",
    publicRuntimeConfig: {
        oidcIssuer: process.env.NEXT_PUBLIC_SOLID_IDENTITY_PROVIDER || [
            "https://solidcommunity.net",
            "https://solid-server.onrender.com",
            "http://localhost:3000"
        ].join(",")
    }
}

module.exports = nextConfig