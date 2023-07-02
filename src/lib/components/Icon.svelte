<div>
  <div>
    <slot name="icon" />
  </div>
  <slot />
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    gap: 4pt;
    align-items: center;
  }
  div div {
    width: 16pt;
    height: 16pt;
  }
</style>
