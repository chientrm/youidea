// See https://kit.svelte.dev/docs/types#app

import type { JWTPayload } from 'jose';

// for information about these interfaces
declare global {
  interface User extends JWTPayload {
    uid: number;
    type: 'anonymous' | 'email';
    email?: string;
  }
  namespace App {
    // interface Error {}
    interface Locals {
      D1: D1Database;
    }
    // interface PageData {}
    interface Platform {
      env: {
        D1: D1Database;
      };
    }
  }
}

export {};
