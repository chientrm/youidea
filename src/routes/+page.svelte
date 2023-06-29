<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';

  export let data: PageData;
  const newIdea = () => {
    if (data.user.type === 'anonymous') {
      goto('/auth/login?redirectTo=/new');
    } else {
      goto('/new');
    }
  };
</script>

<h2>Quickly note and share your ideas</h2>
<button on:click={newIdea}> New idea! </button>
