const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://admin:admin123@cluster0.ggnhlvo.mongodb.net/?retryWrites=true&w=majority/"
};
export default config;
