export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL,
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    url: process.env.REDIS_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  cors: {
    origin: process.env.FRONTEND_URL?.split(',') || '*',
  },
  swagger: {
    enabled: process.env.NODE_ENV !== 'production',
    path: 'api/docs',
  },
  uploads: {
    destination: './uploads',
    maxFileSize: 10 * 1024 * 1024, // 10MB
  },
});
