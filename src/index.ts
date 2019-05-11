import 'reflect-metadata';
import 'dotenv/config';
import { server } from './server';
import { config } from './config';
import { createLogger } from './debug';
import * as db from './db';
import { redis } from './redis';

const debug = createLogger('express');

async function setAllowedDomains() {
  await redis.sadd('allowed_domains', config.allowedDomains);
}

async function main() {
  try {
    await db.connect();
    await setAllowedDomains();

    server.listen(config.listen.port, config.listen.address, () => {
      debug(`App is running at http://${config.listen.address}:${config.listen.port}`);
    });
  } catch (error) {
    debug('App could not be started.');
    debug(error);
    process.exit(1);
  }
}

main();
