<script context="module">
  import newUniqueId from 'locally-unique-id-generator';
</script>

<script lang="ts">
  import { destinations } from '$lib/utils/navigation';
  import { i } from '@inlang/sdk-js';
  import { getContext, onMount } from 'svelte';
  import NavigationDrawerItem from './navigationDrawerItem.svelte';
  import type { Writable } from 'svelte/store';
  import clsx from 'clsx';

  let dialog: HTMLDialogElement | null = null;
  export let open = false;

  function escHandler(e: Event) {
    e.preventDefault();
    open = false;
  }

  function closeDrawerWhenScreenGoesAtLeastMediumSize(e: MediaQueryListEvent) {
    if (e.matches) open = false;
  }

  function closeDrawerWhenOutsideClicked(e: MouseEvent) {
    const dialogDimensions = dialog?.getBoundingClientRect();
    if (!dialogDimensions) return;
    const { left, right, top, bottom } = dialogDimensions;
    const { clientX, clientY } = e;
    if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
      open = false;
    }
  }

  const mediumScreen = 600;
  onMount(() => {
    dialog?.addEventListener('click', closeDrawerWhenOutsideClicked);
    dialog?.addEventListener('cancel', escHandler);
    const mediaQuery = window.matchMedia(`(min-width: ${mediumScreen}px)`);
    mediaQuery.addEventListener('change', closeDrawerWhenScreenGoesAtLeastMediumSize);

    return () => {
      mediaQuery.removeEventListener('change', closeDrawerWhenScreenGoesAtLeastMediumSize);
      dialog?.removeEventListener('cancel', escHandler);
      dialog?.removeEventListener('click', closeDrawerWhenOutsideClicked);
    };
  });

  $: {
    if (open && !dialog?.open) dialog?.showModal();
    if (!open && dialog?.open) {
      setTimeout(() => {
        dialog?.close();
      }, 400);
    }
  }

  const darkMode = getContext<Writable<boolean>>('darkMode');
  const labelId = newUniqueId();
</script>

<dialog bind:this={dialog} class={clsx(open && 'open')} aria-labelledby={labelId}>
  <div class="title">
    <h1 id={labelId} class="title-text">zydhan.com</h1>
  </div>

  <div class="section-header">
    <h2 class="section-header-text">{i('navigation.navigation')}</h2>
  </div>

  <nav>
    <ul>
      {#each destinations as destination (destination.href)}
        <li>
          <NavigationDrawerItem
            href={destination.href}
            icon={destination.icon}
            nameLangKey={destination.nameLangKey}
            exact={destination.exact}
          />
        </li>
      {/each}
    </ul>
  </nav>

  <hr />

  <div class="section-header">
    <h2 class="section-header-text">{i('navigation.preferences')}</h2>
  </div>
  <ul>
    <li>
      <NavigationDrawerItem
        click={() => {
          darkMode.update((value) => !value);
        }}
        as="button"
        icon={$darkMode ? 'light_mode' : 'dark_mode'}
        nameLangKey={$darkMode ? 'switch_to_light_mode' : 'switch_to_dark_mode'}
      />
    </li>
  </ul>
</dialog>

<style lang="scss">
  @use '$lib/styles/typography.scss';

  dialog {
    width: 100%;
    max-width: 336px;
    height: 100vh;
    max-height: none;
    margin: 0;
    position: fixed;
    top: 0;
    left: -336px;
    z-index: 1;
    border-radius: 0 16px 16px 0;

    background-color: rgb(var(--md-sys-color-surface-container-low));
    transition-property: left, box-shadow;
    transition-duration: var(--md-sys-motion-duration-medium4);
    transition-timing-function: var(--md-sys-motion-easing-emphasized);
    color: rgb(var(--md-sys-color-on-surface-variant));
    box-shadow: 0 0 0 100vw transparent;
    &::backdrop {
      background-color: transparent;
    }

    &.open {
      left: 0;

      transition-duration: var(--md-sys-motion-duration-long2);
      transition-timing-function: var(--md-sys-motion-easing-emphasized-decelerate);
      box-shadow: 0 0 0 100vw rgba(0, 0, 0, 0.3);
    }

    & .title {
      display: flex;
      height: 56px;
      padding: 8px 8px 8px 16px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 10px;
      align-self: stretch;

      & .title-text {
        @include typography.typography-builder('title', 'small');
      }
    }

    & .section-header {
      display: flex;
      padding: 18px 16px;
      align-items: center;
      gap: 10px;
      align-self: stretch;

      & .section-header-text {
        @include typography.typography-builder('title', 'small');
      }
    }
  }

  hr {
    margin: 0 16px;
    border: none;
    border-bottom: 1px solid rgb(var(--md-sys-color-outline-variant));
  }
</style>
