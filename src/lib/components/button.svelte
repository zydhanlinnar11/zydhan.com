<script lang="ts">
  export let as: 'button' | 'a' = 'button';
  export let href: string = '';
  export let target: '_blank' | '_self' = '_self';
</script>

{#if as === 'a'}
  <a class="btn" {href} {target}>
    <div>
      <slot />
    </div>
  </a>
{:else}
  <button class="btn">
    <div>
      <slot />
    </div>
  </button>
{/if}

<style lang="scss">
  @use '$lib/styles/typography.scss' as typography;
  $states: (
    'focus': 'focus',
    'hover': 'hover',
    'active': 'pressed',
  );

  a.btn,
  button.btn {
    display: flex;
    width: 240px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;

    background-color: rgb(var(--md-sys-color-primary));
    color: rgb(var(--md-sys-color-on-primary));
    text-align: center;
    padding: 0;
    @include typography.typography-builder('label', 'large');
    &,
    & > div {
      border-radius: 100px;
    }

    @each $state, $varName in $states {
      &:#{$state} > div {
        background-color: rgba(
          var(--md-sys-color-on-primary),
          var(--md-sys-state- + $varName + -state-layer-opacity)
        );
      }
    }

    & > div {
      width: 100%;
      display: flex;
      padding: 10px 24px;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }
  }
</style>
