<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import { empty } from '$lib/constants/empty';
  import { path } from '$lib/helpers/path';
  import type { ActionData } from './$types';
  export let form: ActionData;
  const redirectTo = $page.url.searchParams.get('redirectTo') ?? '';
</script>

<h2>Register</h2>

<form method="POST" use:enhance>
  <p class="error">
    {#if form?.message}
      {form.message}
    {:else}
      {empty}
    {/if}
  </p>
  <label>
    Email
    <input name="email" type="email" />
  </label>
  <label>
    Password
    <input name="password" type="password" />
  </label>
  <label>
    Cofnirm Password
    <input name="confirmPassword" type="password" />
  </label>
  <div>
    <button>Register</button>
    <span>or</span>
    <a href={path(`/login?redirectUri=${redirectTo}`)}>Login</a>
  </div>
</form>
