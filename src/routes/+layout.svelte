<script lang="ts">
  import { base } from '$app/paths';
  import '$lib/app.css';
  import IconButton from '$lib/components/IconA.svelte';
  import { DESCRIPTION, TITLE } from '$lib/constants/string';
  import 'modern-normalize/modern-normalize.css';
  import MdAdd from 'svelte-icons/md/MdAdd.svelte';
  import type { LayoutData } from './$types';
  export let data: LayoutData;
</script>

<svelte:head>
  <title>{TITLE} - {DESCRIPTION}</title>
</svelte:head>

<header>
  <div>
    <h1><a href={`${base}/`}>{TITLE}</a></h1>
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

{#if !data.isMobile}
  <style>
    form {
      max-width: 250pt;
    }
  </style>
{/if}

<style>
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8pt;
  }
  div {
    display: flex;
    flex-direction: row;
    gap: 8pt;
    align-items: center;
  }
</style>
