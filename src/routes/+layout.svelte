<script lang="ts">
  import { base } from '$app/paths';
  import '$lib/app.css';
  import MdLightbulbOutline from 'svelte-icons/md/MdLightbulbOutline.svelte';
  import type { LayoutData } from './$types';
  export let data: LayoutData;
</script>

<header>
  <div class="row">
    <h1><a href={`${base}/`}>YouIdea</a></h1>
    <a
      href={data.user.type === 'anonymous'
        ? `${base}/login?redirectTo=/new`
        : `${base}/new`}
      class="row-close"
    >
      <span>New idea!</span>
      <div class="icon">
        <MdLightbulbOutline />
      </div>
    </a>
  </div>
  {#if data.user.type === 'anonymous'}
    <a href={`${base}/login`}>Login</a>
  {:else if data.user.type === 'email'}
    <form method="POST" action={`${base}/`}>
      <button>Logout</button>
    </form>
  {/if}
</header>

<slot />
