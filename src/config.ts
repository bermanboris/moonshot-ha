interface Config {
  listen: {
    address: string;
    port: number;
  };
}

/**
 * Moonshot-HA application configuration
 */
export const config: Config = {
  listen: {
    address: process.env.LISTEN_ADDRESS || '0.0.0.0',
    port: Number(process.env.LISTEN_PORT) || 3000,
  },
};
