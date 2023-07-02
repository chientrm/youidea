<script lang="ts">
  export let href: string;
  export let isMobile = false;
</script>

<a {href}>
  <div>
    <slot name="icon" />
  </div>
  {#if !isMobile}
    <span>
      <slot />
    </span>
  {/if}
</a>

<style>
  a {
    display: flex;
    flex-direction: row;
    gap: 4pt;
    align-items: center;
  }
  a div {
    width: 32px;
    height: 32px;
  }
</style>
