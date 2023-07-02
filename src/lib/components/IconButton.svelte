<button>
  <div>
    <slot name="icon" />
  </div>
  <slot />
</button>

<style>
  button {
    display: flex;
    flex-direction: row;
    gap: 4pt;
    align-items: center;
  }
  button div {
    width: 16pt;
    height: 16pt;
  }
</style>
