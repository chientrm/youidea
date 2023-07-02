<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<span>{data.description}</span>
<span>{data.createdAt}</span>
