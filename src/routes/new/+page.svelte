<script lang="ts">
  import { enhance } from '$app/forms';
  import { empty } from '$lib/constants/empty';
  import type { ActionData } from './$types';
  export let form: ActionData;
</script>

<h1>New idea</h1>

<form method="POST" use:enhance>
  <p class="error">
    {#if form?.message}
      {form.message}
    {:else}
      {empty}
    {/if}
  </p>
  <span>Title</span>
  <input type="text" name="title" />
  <span>Description </span>
  <textarea name="description" rows="10" />
  <div>
    <button>Post</button>
  </div>
</form>
