/**
 * Performance optimization configurations
 */

export const performanceConfig = {
  // Cache TTLs (in milliseconds)
  cache: {
    vehicleLookup: 86400000, // 24 hours
    userProfile: 3600000, // 1 hour
    jobList: 300000, // 5 minutes
    faq: 3600000, // 1 hour
  },

  // Database query optimizations
  database: {
    defaultPageSize: 20,
    maxPageSize: 100,
    queryTimeout: 5000, // 5 seconds
  },

  // API rate limits
  rateLimit: {
    vehicleLookup: 100, // per hour
    aiGenerate: 50, // per hour (free models)
    chatbot: 200, // per hour
  },

  // Response compression
  compression: {
    enabled: true,
    minSize: 1024, // Only compress responses > 1KB
  },
};
