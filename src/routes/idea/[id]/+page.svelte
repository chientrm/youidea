<script lang="ts">
  import { base } from '$app/paths';
  import type { PageData } from './$types';
  export let data: PageData;
  import MdArrowBack from 'svelte-icons/md/MdArrowBack.svelte';
</script>

<div class="row">
  <a href={`${base}/`} class="row-close">
    <div class="icon">
      <MdArrowBack />
    </div>
    <span>Back</span>
  </a>
  <h1>{data.description}</h1>
</div>
<span>{data.email}</span>
<span>{data.hour} • {data.date}</span>
<p>{data.description}</p>
