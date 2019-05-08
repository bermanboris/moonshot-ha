import mongoose from 'mongoose';
import { sleep } from './utils/sleep';
import { createLogger } from './debug';

const { MONGODB_HOSTNAME, MONGODB_PORT, MONGODB_NAME } = process.env;
const uri = `mongodb://${MONGODB_HOSTNAME}:${MONGODB_PORT}/${MONGODB_NAME}`;
const log = createLogger('db');

export async function connect() {
  while (true) {
    try {
      await mongoose.connect(uri, { useCreateIndex: true, useNewUrlParser: true });
      log('connected to mongodb');
      break;
    } catch (err) {
      log(err);
      await sleep(5000);
    }
  }
}
