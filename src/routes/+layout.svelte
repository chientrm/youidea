<script lang="ts">
  import { base } from '$app/paths';
  import '$lib/app.css';
  import IconButton from '$lib/components/IconA.svelte';
  import 'modern-normalize/modern-normalize.css';
  import MdAdd from 'svelte-icons/md/MdAdd.svelte';
  import type { LayoutData } from './$types';
  export let data: LayoutData;
  $: isMobile = data.isMobile;
</script>

<header>
  <div>
    <h1><a href={`${base}/`}>YouIdea</a></h1>
    <IconButton
      href={data.user.type === 'anonymous'
        ? `${base}/login?redirectTo=/new`
        : `${base}/new`}
    >
      <MdAdd slot="icon" />
      New idea
    </IconButton>
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

<style>
  div {
    display: flex;
    flex-direction: row;
    gap: 8pt;
    align-items: center;
  }
</style>
