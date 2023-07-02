<script lang="ts">
  import { enhance } from '$app/forms';
  import { base } from '$app/paths';
  import IconA from '$lib/components/IconA.svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import Title from '$lib/components/Title.svelte';
  import MdArrowBack from 'svelte-icons/md/MdArrowBack.svelte';
  import MdFavorite from 'svelte-icons/md/MdFavorite.svelte';
  import MdFavoriteBorder from 'svelte-icons/md/MdFavoriteBorder.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
  $: isMobile = data.isMobile;
</script>

<div>
  <IconA href={`${base}/`}>
    <MdArrowBack slot="icon" />
    {isMobile ? '' : 'Back'}
  </IconA>
  <Title>{data.description}</Title>
</div>
<span class="italic">by {data.email}</span>
<span>{data.hour} • {data.date}</span>
<p>{data.description}</p>
<div>
  {#if data.loveCreatedAt}
    <form method="POST" action="?/unlove" use:enhance>
      <IconButton>
        <MdFavorite slot="icon" />
      </IconButton>
    </form>
  {:else}
    <form method="POST" action="?/love" use:enhance>
      <IconButton>
        <MdFavoriteBorder slot="icon" />
      </IconButton>
    </form>
  {/if}
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    gap: 8pt;
    align-items: center;
  }
</style>
