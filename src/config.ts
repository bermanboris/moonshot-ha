/**
 * Moonshot-HA application configuration
 */
export const config = {
  allowedDomains: String(process.env.ALLOWED_DOMAINS).split(','),
  mongo: {
    hostname: process.env.MONGODB_HOSTNAME,
    port: Number(process.env.MONGODB_PORT),
    name: process.env.MONGODB_NAME,
    uri: global.__MONGO_URI__,
  },
  redis: {
    hostname: process.env.REDIS_HOSTNAME,
    port: Number(process.env.REDIS_PORT),
    db: Number(process.env.REDIS_DB),
  },
  listen: {
    address: process.env.LISTEN_ADDRESS || '0.0.0.0',
    port: Number(process.env.LISTEN_PORT),
  },
};
