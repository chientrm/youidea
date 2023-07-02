<script lang="ts">
  import { base } from '$app/paths';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h2>Share your ideas and get like!</h2>
<a
  href={data.user.type === 'anonymous'
    ? `${base}/login?redirectTo=/new`
    : `${base}/new`}
>
  New idea!
</a>
<h2>Top ideas</h2>
<ul>
  {#each data.ideas as { id, uid, description, createdAt }}
    <li>
      {description}
    </li>
  {/each}
</ul>
