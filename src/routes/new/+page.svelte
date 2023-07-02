<script lang="ts">
  import { enhance } from '$app/forms';
  import Error from '$lib/components/Error.svelte';
  import type { ActionData } from './$types';
  export let form: ActionData;
</script>

<h2>New idea</h2>

<form method="POST" use:enhance>
  <Error message={form?.message} />
  <input type="text" name="title" placeholder="Title" maxlength="100" />
  <textarea
    name="description"
    rows="10"
    placeholder="Description"
    maxlength="5000"
  />
  <div>
    <button>Post</button>
  </div>
</form>
