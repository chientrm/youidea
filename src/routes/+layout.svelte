<script lang="ts">
  import { base } from '$app/paths';
  import { path } from '$lib/helpers/path';
  import '../app.css';
  import type { LayoutData } from './$types';
  export let data: LayoutData;
</script>

<header>
  <h1><a href={path()}>YouIdea</a></h1>
  {#if data.user.type === 'anonymous'}
    <a href={path('/auth/login')}>Login</a>
  {:else if data.user.type === 'email'}
    <form method="POST" action={path()}>
      <button>Logout</button>
    </form>
  {/if}
</header>
{base}
<slot />
