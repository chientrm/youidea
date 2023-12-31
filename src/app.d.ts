// See https://kit.svelte.dev/docs/types#app
/// <reference types="@sveltejs/adapter-cloudflare" />

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
      user: User;
      isMobile: boolean;
      tz: string;
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
