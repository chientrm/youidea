// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      D1: D1Database;
    }
    // interface PageData {}
    interface Platform {
      env?: {
        D1: D1Database;
      };
    }
  }
}

export {};
