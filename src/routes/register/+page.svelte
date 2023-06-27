<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';
  export let form: ActionData;
</script>

<h2>Register</h2>

<form method="POST" use:enhance>
  <p class="error">
    {#if form?.message}
      {form.message}
    {:else}
      ‎
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
    <a href="login">Login</a>
  </div>
</form>
