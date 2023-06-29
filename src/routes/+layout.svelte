<script lang="ts">
  import '../app.css';
  import type { LayoutData } from './$types';
  export let data: LayoutData;
</script>

<header>
  <h1><a href="/">YouIdea</a></h1>
  {#if data.user.type === 'anonymous'}
    <a href="/auth/login">Login</a>
  {:else if data.user.type === 'email'}
    <form method="POST" action="/">
      <button>Logout</button>
    </form>
  {/if}
</header>
<slot />
