<script lang="ts">
  import { enhance } from '$app/forms';
  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import Error from '$lib/components/Error.svelte';
  import type { ActionData, PageData } from './$types';
  export let form: ActionData;
  export let data: PageData;
  const redirectTo = $page.url.searchParams.get('redirectTo') ?? '';
</script>

<h2>Register</h2>

<form method="POST" use:enhance>
  <Error message={form?.message} />
  <label>
    Email
    <input name="email" type="email" />
  </label>
  <label>
    Password
    <input name="password" type="password" />
  </label>
  <label>
    Confirm Password
    <input name="confirmPassword" type="password" />
  </label>
  <div>
    <button>Register</button>
    <span>or</span>
    <a href={`${base}/login?redirectUri=${redirectTo}`}>Login</a>
  </div>
</form>

{#if !data.isMobile}
  <style>
    form {
      max-width: 250pt;
    }
  </style>
{/if}
