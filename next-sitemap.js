module.exports = {
  siteUrl:
    process.env.VERCEL_ENV === "production"
      ? "https://jaredlunde.com"
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000",
  generateRobotsTxt: true,
};
