<script lang="ts">
  export let message: string | null;
</script>

<span>
  {#if message}
    {message}
  {:else}
    ‎
  {/if}
</span>

<style>
  span {
    color: red;
  }
</style>
