<script lang="ts">
  export let href: string;
</script> 

<a {href}>
  <div>
    <slot name="icon" />
  </div>
  <span>
    <slot />
  </span>
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
