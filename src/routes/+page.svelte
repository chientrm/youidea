<script lang="ts">
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import type { PageData } from './$types';

  export let data: PageData;
  const newIdea = () => {
    if (data.user.type === 'anonymous') {
      goto(`${base}/login?redirectTo=/new`);
    } else {
      goto(`${base}/new`);
    }
  };
</script>

<h2>Share your ideas and get like!</h2>
<button on:click={newIdea}> New idea! </button>
