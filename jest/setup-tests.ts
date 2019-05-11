import dotenv from 'dotenv';
import 'reflect-metadata';
import { connect } from '../src/db';

(async () => {
  dotenv.config({ path: '.env.test' });
  await connect();
})();
