module.exports = {
  apps: [
    {
      name: "pikitup",
      script: "node_modules/next/dist/bin/next",
      args: "start --port 3002",
      cwd: "C:/Users/ampadmin/Documents/GitHub/pikitup/pikitup-website",
      interpreter: "node",
      env: {
        NODE_ENV: "production",
        PORT: "3002",
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: "AIzaSyD2Nu-6xx4eG6Bfb4gH34g8IPtNXjwq1ZI",
        DATABASE_URL: "postgresql://postgres:Standardbank1%40@localhost:5432/pikitup_prod",
      },
    },
  ],
};
