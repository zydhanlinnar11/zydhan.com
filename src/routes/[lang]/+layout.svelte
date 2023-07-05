<script>
  import Navigation from '$lib/components/navigation.svelte';
  import { onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  let darkMode = writable(false);

  const isSystemPreferDarkMode = () => {
    // Check if the system prefers a light theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches)
      return false;

    return true;
  };

  function setDarkModeFromStorage() {
    const persistedDarkMode = localStorage.getItem('darkMode');
    if (persistedDarkMode == 'true' || persistedDarkMode == 'false') {
      darkMode.set(persistedDarkMode == 'true');
      return;
    }

    darkMode.set(isSystemPreferDarkMode());
  }

  function subscribeForDarkModeChanges() {
    return darkMode.subscribe((value) => {
      localStorage.setItem('darkMode', JSON.stringify(value));
      const html = document.querySelector('html');
      if (!html) return;
      if (value && !html.classList.contains('dark')) {
        html.classList.add('dark');
        return;
      }
      if (!value && html.classList.contains('dark')) {
        html.classList.remove('dark');
        return;
      }
    });
  }

  function subscribeForClassChanges() {
    const html = document.querySelector('html');
    const observer = new MutationObserver(() => {
      darkMode.set(html?.classList.contains('dark') ?? false);
    });
    if (html) {
      observer.observe(html, { attributes: true });
    }

    return observer;
  }

  onMount(() => {
    setDarkModeFromStorage();
    const unsubscribe = subscribeForDarkModeChanges();
    const observer = subscribeForClassChanges();

    return () => {
      observer.disconnect();
      unsubscribe();
    };
  });

  setContext('darkMode', darkMode);
</script>

<Navigation />
<slot />

<style lang="scss" global>
  @use '$lib/styles/typography.scss' as typography;
  @use '$lib/styles/tokens/pallete.scss';
  @use '$lib/styles/tokens/typeface.scss';
  @use '$lib/styles/tokens/easing-duration.scss';
  @use '$lib/styles/tokens/window-class.scss' as window;
  @use 'sass:map';
  @import 'https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@100..1000&display=swap';
  @import url(https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200);

  :root {
    color-scheme: light;
    @include pallete.pallete;
    @include typeface.typeface;
    @include easing-duration.easing-duration;

    --md-ref-typeface-plain: 'Roboto Flex', sans-serif;
    --md-sys-color-on-background: var(--md-ref-palette-neutral6);
    --md-sys-color-background: var(--md-ref-palette-neutral98);

    --md-sys-color-primary: var(--md-ref-palette-primary40);
    --md-sys-color-on-primary: var(--md-ref-palette-primary100);
    --md-sys-color-primary-container: var(--md-ref-palette-primary90);
    --md-sys-color-on-primary-container: var(--md-ref-palette-primary10);

    --md-sys-color-outline-variant: var(--md-ref-palette-neutral-variant80);

    --md-sys-color-secondary-container: var(--md-ref-palette-secondary90);
    --md-sys-color-on-secondary-container: var(--md-ref-palette-secondary10);

    --md-sys-color-surface: var(--md-ref-palette-neutral98);
    --md-sys-color-surface-container: var(--md-ref-palette-neutral94);
    --md-sys-color-surface-container-low: var(--md-ref-palette-neutral96);
    --md-sys-color-surface-container-lowest: var(--md-ref-palette-neutral100);
    --md-sys-color-on-surface: var(--md-ref-palette-neutral10);
    --md-sys-color-on-surface-variant: var(--md-ref-palette-neutral-variant30);

    --md-sys-state-hover-state-layer-opacity: 0.08;
    --md-sys-state-focus-state-layer-opacity: 0.12;
    --md-sys-state-pressed-state-layer-opacity: 0.12;

    --md-sys-typescale-display-small-font: var(--md-ref-typeface-plain);
    --md-sys-typescale-display-small-line-height: 2.75rem;
    --md-sys-typescale-display-small-size: 2.25rem;
    --md-sys-typescale-display-small-tracking: 0;
    --md-sys-typescale-display-small-weight: var(--md-ref-typeface-weight-regular);

    --md-sys-typescale-body-large-font: var(--md-ref-typeface-plain);
    --md-sys-typescale-body-large-line-height: 1.5rem;
    --md-sys-typescale-body-large-size: 1rem;
    --md-sys-typescale-body-large-tracking: calc(0.5 / 1rem);
    --md-sys-typescale-body-large-weight: var(--md-ref-typeface-weight-regular);

    --md-sys-typescale-body-medium-font: var(--md-ref-typeface-plain);
    --md-sys-typescale-body-medium-line-height: 1.25rem;
    --md-sys-typescale-body-medium-size: 0.875rem;
    --md-sys-typescale-body-medium-tracking: calc(0.25 / 1rem);
    --md-sys-typescale-body-medium-weight: var(--md-ref-typeface-weight-regular);

    --md-sys-typescale-body-small-font: var(--md-ref-typeface-plain);
    --md-sys-typescale-body-small-line-height: 1rem;
    --md-sys-typescale-body-small-size: 0.75rem;
    --md-sys-typescale-body-small-tracking: calc(0.4 / 1rem);
    --md-sys-typescale-body-small-weight: var(--md-ref-typeface-weight-regular);

    --md-sys-typescale-headline-large-font: var(--md-ref-typeface-plain);
    --md-sys-typescale-headline-large-line-height: 2.5rem;
    --md-sys-typescale-headline-large-size: 2rem;
    --md-sys-typescale-headline-large-tracking: 0;
    --md-sys-typescale-headline-large-weight: var(--md-ref-typeface-weight-regular);

    --md-sys-typescale-headline-medium-font: var(--md-ref-typeface-plain);
    --md-sys-typescale-headline-medium-line-height: 2.25rem;
    --md-sys-typescale-headline-medium-size: 1.75rem;
    --md-sys-typescale-headline-medium-tracking: 0;
    --md-sys-typescale-headline-medium-weight: var(--md-ref-typeface-weight-regular);

    --md-sys-typescale-headline-small-font: var(--md-ref-typeface-plain);
    --md-sys-typescale-headline-small-line-height: 2rem;
    --md-sys-typescale-headline-small-size: 1.5rem;
    --md-sys-typescale-headline-small-tracking: 0;
    --md-sys-typescale-headline-small-weight: var(--md-ref-typeface-weight-regular);

    --md-sys-typescale-label-large-font: var(--md-ref-typeface-plain);
    --md-sys-typescale-label-large-line-height: 1.25rem;
    --md-sys-typescale-label-large-size: 0.875rem;
    --md-sys-typescale-label-large-tracking: calc(0.1 / 1rem);
    --md-sys-typescale-label-large-weight: var(--md-ref-typeface-weight-medium);

    --md-sys-typescale-label-medium-font: var(--md-ref-typeface-plain);
    --md-sys-typescale-label-medium-line-height: 1rem;
    --md-sys-typescale-label-medium-size: 0.75rem;
    --md-sys-typescale-label-medium-tracking: calc(0.5 / 1rem);
    --md-sys-typescale-label-medium-weight: var(--md-ref-typeface-weight-medium);

    --md-sys-typescale-title-medium-font: var(--md-ref-typeface-plain);
    --md-sys-typescale-title-medium-line-height: 1.5rem;
    --md-sys-typescale-title-medium-size: 1rem;
    --md-sys-typescale-title-medium-tracking: calc(0.15 / 1rem);
    --md-sys-typescale-title-medium-weight: var(--md-ref-typeface-weight-medium);

    --md-sys-typescale-title-small-font: var(--md-ref-typeface-plain);
    --md-sys-typescale-title-small-line-height: 1.25rem;
    --md-sys-typescale-title-small-size: 0.875rem;
    --md-sys-typescale-title-small-tracking: calc(0.1 / 1rem);
    --md-sys-typescale-title-small-weight: var(--md-ref-typeface-weight-medium);

    &.dark {
      color-scheme: dark;
      --md-sys-color-on-background: var(--md-ref-palette-neutral90);
      --md-sys-color-background: var(--md-ref-palette-neutral6);

      --md-sys-color-primary: var(--md-ref-palette-primary80);
      --md-sys-color-on-primary: var(--md-ref-palette-primary20);
      --md-sys-color-primary-container: var(--md-ref-palette-primary30);
      --md-sys-color-on-primary-container: var(--md-ref-palette-primary90);

      --md-sys-color-outline-variant: var(--md-ref-palette-neutral-variant30);

      --md-sys-color-surface: var(--md-ref-palette-neutral6);
      --md-sys-color-secondary-container: var(--md-ref-palette-secondary30);
      --md-sys-color-on-secondary-container: var(--md-ref-palette-secondary90);

      --md-sys-color-surface-container: var(--md-ref-palette-neutral12);
      --md-sys-color-surface-container-low: var(--md-ref-palette-neutral10);
      --md-sys-color-surface-container-lowest: var(--md-ref-palette-neutral4);
      --md-sys-color-on-surface: var(--md-ref-palette-neutral90);
      --md-sys-color-on-surface-variant: var(--md-ref-palette-neutral-variant80);
    }
  }

  :global(body) {
    @include typography.typography-builder('body', 'medium');
    background-color: rgb(var(--md-sys-color-background));
    color: rgb(var(--md-sys-color-on-background));
    font-family: var(--md-sys-typescale-body-medium-font);
    min-width: 100%;
    min-height: 100vh;
    margin: 0;

    transition-property: background-color, color;
    transition-duration: var(--md-sys-motion-duration-medium2);
    transition-timing-function: var(--md-sys-motion-easing-standard);
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre) {
    margin: 0;
  }

  :global(*, ::before, ::after) {
    border-width: 0;
    border-style: solid;
  }

  :global(button) {
    background: none;
    color: inherit;
    cursor: pointer;
  }

  :global(a) {
    text-decoration: none;
  }

  :global(ul, ol) {
    list-style-type: none;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0;
  }

  :global(.material-symbols-rounded) {
    font-family: 'Material Symbols Rounded';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
    font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24;
    transition-property: font-variation-settings;
  }

  :global(.material-symbols-rounded--filled) {
    font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
  }
</style>
