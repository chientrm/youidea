<script lang="ts">
  import { base } from '$app/paths';
  import Icon from '$lib/components/Icon.svelte';
  import { DESCRIPTION } from '$lib/constants/string';
  import MdComment from 'svelte-icons/md/MdComment.svelte';
  import MdFavoriteBorder from 'svelte-icons/md/MdFavoriteBorder.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<h2>{DESCRIPTION}</h2>
<h2>Newest ideas</h2>
<ul>
  {#each data.ideas as { id, email, to, title, loves, comments }}
    <li>
      <span style="font-style: italic">
        by {email} • {to}
      </span>
      <a href={`${base}/idea/${id}`}>{title}</a>
      <div>
        <Icon>
          <MdFavoriteBorder slot="icon" />
          {loves}
        </Icon>
        <Icon>
          <MdComment slot="icon" />
          {comments}
        </Icon>
      </div>
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
