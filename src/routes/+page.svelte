<script lang="ts">
  import { base } from '$app/paths';
  import { DESCRIPTION } from '$lib/constants/string';
  import type { PageData } from './$types';
  import MdFavoriteBorder from 'svelte-icons/md/MdFavoriteBorder.svelte';
  export let data: PageData;
</script>

<svelte:head>
  <description>{DESCRIPTION}</description>
</svelte:head>

<h2>{DESCRIPTION}</h2>
<h2>Newest ideas</h2>
<ul>
  {#each data.ideas as { id, email, to, title, loves }}
    <li>
      <span style="font-style: italic">
        by {email} • {to}
      </span>
      <a href={`${base}/idea/${id}`}>{title}</a>
      <span>
        {loves}
        <div>
          <MdFavoriteBorder />
        </div>
      </span>
    </li>
  {/each}
</ul>

<style>
  a {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  span {
    display: flex;
    flex-direction: row;
    gap: 4pt;
    align-items: center;
  }
  div {
    width: 16pt;
    height: 16pt;
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
