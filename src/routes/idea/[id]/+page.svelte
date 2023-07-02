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
  import { TITLE } from '$lib/constants/string';
  export let data: PageData;
</script>

<svelte:head>
  <title>{data.idea.title} on {TITLE}</title>
  <meta name="description" content={data.idea.description} />
  <meta name="author" content={data.idea.email} />
</svelte:head>

<div>
  <IconA href={`${base}/`}>
    <MdArrowBack slot="icon" />
    {data.isMobile ? '' : 'Back'}
  </IconA>
  <Title>{data.idea.title}</Title>
</div>
<span style="font-style: italic">by {data.idea.email}</span>
<span>{data.hour} • {data.date}</span>
<p>{data.idea.description}</p>
<div>
  {#if data.idea.loveCreatedAt}
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
  <span>{data.idea.loves}</span>
</div>

<ul>
  {#each data.comments as { content }}
    <li>
      <span>{content}</span>
    </li>
  {/each}
</ul>

<form method="POST" action="?/comment" use:enhance>
  <textarea name="comment" />
  <div>
    <button>Comment</button>
  </div>
</form>

<style>
  div {
    display: flex;
    flex-direction: row;
    gap: 8pt;
    align-items: center;
  }
</style>
