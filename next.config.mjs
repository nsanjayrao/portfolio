/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Windows + OneDrive-synced folders can crash parallel build workers;
  // single-threaded builds are slower but reliable. Vercel is unaffected.
  experimental: {
    workerThreads: false,
    cpus: 1,
    webpackBuildWorker: false,
  },
};

export default nextConfig;
