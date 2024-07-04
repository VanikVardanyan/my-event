/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites:async()=> {
        return [
          {
            source: '/storage/:path*', // любой путь, по которому вы будете обращаться к Firebase Storage
            destination: 'https://firebasestorage.googleapis.com/v0/b/my-event-5ec1f.appspot.com/:path*', // ваш бакет Firebase Storage
          },
        ];
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
