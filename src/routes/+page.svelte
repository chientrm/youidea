<script lang="ts">
  import { base } from '$app/paths';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<h2>Let somebody else make it happen!</h2>
<a
  href={data.user.type === 'anonymous'
    ? `${base}/login?redirectTo=/new`
    : `${base}/new`}
>
  New idea!
</a>
<h2>Newest ideas</h2>
<ul>
  {#each data.ideas as { id, uid, email, to, description, createdAt }}
    <li>
      <span class="italic">
        {email} • {to}
      </span>
      <span>
        {description}
      </span>
    </li>
  {/each}
</ul>
