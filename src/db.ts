import mongoose from 'mongoose';
import { config } from './config';
import { createLogger } from './debug';
import { sleep } from './utils/sleep';

const { mongo } = config;
const uri = mongo.uri || `mongodb://${mongo.hostname}:${mongo.port}/${mongo.name}`;
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
