import { createWorker } from 'cf-workers-proxy';

export interface Env {
  D1: D1Database;
}

export default createWorker<Env>();
