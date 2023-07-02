<script lang="ts">
  import { base } from '$app/paths';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<h2>Let somebody else make it happen!</h2>
<h2>Newest ideas</h2>
<ul>
  {#each data.ideas as { id, email, to, description }}
    <li>
      <span class="italic">
        {email} • {to}
      </span>
      <span>
        <a href={`${base}/idea/${id}`}>{description}</a>
      </span>
    </li>
  {/each}
</ul>
