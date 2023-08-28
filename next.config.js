const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const path = require("path");

const nextConfig = (phase, { defaultConfig }) => {
  /** @type {import('next').NextConfig} */

  const config = {
    ...defaultConfig,
    reactStrictMode: true,
    sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
    },
    images: {
      remotePatterns: [{ protocol: "https", hostname: "i.dummyjson.com" }],
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...config,
      env: {
        db_username: "new-user1",
        db_password: "Uev8JFgU9VJyiDH8",
        db_clusterName: "cluster0",
        dbName: "deStore-dev",
        NEXTAUTH_URL: "http://localhost:3000",
        NEXTAUTH_SECRET: "jg4zxSsSD3y24tMVFPWm3R6EeXtZdqX38GYy0l2kcxo=",
      },
    };
  }

  return {
    ...config,
    env: {
      db_username: "new-user1",
      db_password: "Uev8JFgU9VJyiDH8",
      db_clusterName: "cluster0",
      dbName: "deStore",
      NEXTAUTH_URL: "http://localhost:3000",
      // NEXTAUTH_URL: "https://next-auth-gamma.vercel.app/",
      NEXTAUTH_SECRET: "E/SBK117MIUHUqBkUgaNzyrrvbW//c8KMi4sRA/baog=",
    },
  };
};

module.exports = nextConfig;
