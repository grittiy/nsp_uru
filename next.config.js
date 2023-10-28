/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
        serverActions: true
    },
    images: {
        domains: ['res.cloudinary.com'],
    },

}

module.exports = nextConfig
