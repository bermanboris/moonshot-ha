import mongoose from 'mongoose';
import { sleep } from './utils/sleep';
import { createLogger } from './debug';
import { config } from './config';

const { mongo } = config;
const uri = `mongodb://${mongo.hostname}:${mongo.port}/${mongo.name}`;
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
