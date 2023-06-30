<script lang="ts">
  import { base } from '$app/paths';
  import '../app.css';
  import type { LayoutData } from './$types';
  export let data: LayoutData;
</script>

<header>
  <h1><a href={`${base}/`}>YouIdea</a></h1>
  {#if data.user.type === 'anonymous'}
    <a href={`${base}/auth/login`}>Login</a>
  {:else if data.user.type === 'email'}
    <form method="POST" action={`${base}/`}>
      <button>Logout</button>
    </form>
  {/if}
</header>
{base}
<slot />
