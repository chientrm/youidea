<script lang="ts">
  import { enhance } from '$app/forms';
  import { base } from '$app/paths';
  import Icon from '$lib/components/Icon.svelte';
  import IconA from '$lib/components/IconA.svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import Title from '$lib/components/Title.svelte';
  import { empty } from '$lib/constants/empty';
  import { TITLE } from '$lib/constants/string';
  import MdArrowBack from 'svelte-icons/md/MdArrowBack.svelte';
  import MdComment from 'svelte-icons/md/MdComment.svelte';
  import MdFavorite from 'svelte-icons/md/MdFavorite.svelte';
  import MdFavoriteBorder from 'svelte-icons/md/MdFavoriteBorder.svelte';
  import type { ActionData, PageData } from './$types';
  export let data: PageData;
  export let form: ActionData;
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
<span>
  by
  <span style="font-style: italic">
    {data.idea.email}
  </span>
</span>
<span>{data.hour} • {data.date}</span>
<p>{data.idea.description}</p>
<div>
  {#if data.idea.loveCreatedAt}
    <form method="POST" action="?/unlove" use:enhance>
      <IconButton>
        <MdFavorite slot="icon" />
        {data.idea.loves}
      </IconButton>
    </form>
  {:else}
    <form method="POST" action="?/love" use:enhance>
      <IconButton>
        <MdFavoriteBorder slot="icon" />
        {data.idea.loves}
      </IconButton>
    </form>
  {/if}
  <Icon>
    <MdComment slot="icon" />
    {data.idea.comments}
  </Icon>
</div>
<ul>
  {#each data.comments as { email, content, to }}
    <li>
      <span>
        by
        <span style="font-style: italic">
          {email}
        </span>
        • {to}
      </span>
      <span>
        {content}
      </span>
    </li>
  {/each}
</ul>

<form method="POST" action="?/comment" use:enhance>
  <p class="error">
    {#if form?.message}
      {form.message}
    {:else}
      {empty}
    {/if}
  </p>
  <textarea name="content" />
  <div>
    <button>Comment</button>
  </div>
</form>

<style>
  div {
    display: flex;
    flex-direction: row;
    gap: 16pt;
    align-items: center;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 32pt;
    list-style-type: none;
  }
  li {
    display: flex;
    flex-direction: column;
    gap: 8pt;
  }
</style>
