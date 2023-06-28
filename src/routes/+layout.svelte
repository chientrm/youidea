<script lang="ts">
  import '../app.css';
  import type { LayoutData } from './$types';
  export let data: LayoutData;
</script>

<header>
  <h1><a href="./">YouIdea</a> Quickly note your ideas</h1>
  {#if data.user.type === 'anonymous'}
    <a href="login">Login</a>
  {:else if data.user.type === 'email'}
    <a href="logout">Logout</a>
  {/if}
</header>
<slot />
