<script lang="ts">
  import { base } from '$app/paths';
  import IconButton from '$lib/components/IconA.svelte';
  import MdAdd from 'svelte-icons/md/MdAdd.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<h2>Let somebody else make it happen!</h2>
<h2>Newest ideas</h2>
<ul>
  {#each data.ideas as { id, email, to, description }}
    <li>
      <span class="italic">
        by {email} • {to}
      </span>
      <span>
        <a href={`${base}/idea/${id}`}>{description}</a>
      </span>
    </li>
  {/each}
</ul>

<style>
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
