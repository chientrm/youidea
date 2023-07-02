<script lang="ts">
  import { base } from '$app/paths';
  import IconButton from '$lib/components/IconButton.svelte';
  import Title from '$lib/components/Title.svelte';
  import MdArrowBack from 'svelte-icons/md/MdArrowBack.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
  $: isMobile = data.isMobile;
</script>

<div class="row">
  <IconButton href={`${base}/`}>
    <MdArrowBack slot="icon" />
    {isMobile ? '' : 'Back'}
  </IconButton>
  <Title>{data.description}</Title>
</div>
<span class="italic">{data.email}</span>
<span>{data.hour} • {data.date}</span>
<p>{data.description}</p>
