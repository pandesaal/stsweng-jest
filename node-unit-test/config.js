module.exports = {
  envPort: process.env.PORT || 5000,
  dbURL: process.env.MONGODB_URL || 'mongodb://localhost:27017/logindb',
  sessionKey: process.env.SESSION_SECRET || 'dev-secret-change-in-production',
};
