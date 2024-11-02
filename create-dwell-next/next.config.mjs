/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  sassOptions: {
    implementation: 'scss',
  },
};

export default nextConfig;
