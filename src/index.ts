import dotenv from 'dotenv';
import { app } from './app';
import { config } from './config';
import { createLogger } from './debug';
import * as db from './db';

dotenv.config();

const debug = createLogger('express');

async function main() {
  try {
    await db.connect();
    app.listen(config.listen.port, config.listen.address, () => {
      debug(`App is running at http://${config.listen.address}:${config.listen.port}`);
    });
  } catch (error) {
    debug('App could not be started.');
    debug(error);
    process.exit(1);
  }
}

main();
