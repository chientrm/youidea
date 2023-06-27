<script lang="ts">
  import { enhance } from '$app/forms';
  import { empty } from '$lib/constants/empty';
  import type { ActionData } from './$types';
  export let form: ActionData;
</script>

<h2>Login</h2>

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
  <div>
    <button>Log in</button>
    <span>or</span>
    <a href="register">Register</a>
  </div>
</form>
