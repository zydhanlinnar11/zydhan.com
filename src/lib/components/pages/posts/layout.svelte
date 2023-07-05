<script>
  import { assets } from '$app/paths';
  import { i, language } from '@inlang/sdk-js';
  import { onMount } from 'svelte';

  export let author = '';
  export const description = '';
  export let createdAt = '';
  export let title = '';
  export let image = '';

  /**
   * @type {HTMLElement}
   */
  let content;
  /**
   * @type {{slug: string, text: string, active: boolean}[]}
   */
  let headings = [];

  onMount(() => {
    const headingElements = content.querySelectorAll('h2');
    /**
     * @type {{slug: string, text: string, active: boolean}[]}
     */
    const temp = [];
    headingElements.forEach((heading) => {
      const slug = heading.id;
      const text = heading.textContent;
      if (slug && text) {
        temp.push({ slug, text, active: false });
      }
    });
    headings = temp;
  });

  $: dateCreatedAt = new Date(createdAt);
</script>

<div class="container">
  <article class="body">
    <header>
      <img src={`${assets}/posts/${image}`} alt={title} />
      <div class="header-text">
        <h2>{title}</h2>
        <p>
          <time
            >{dateCreatedAt.toLocaleString(language, {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}</time
          >
          • <span>{i('page.post.posted_by', { author })}</span>
        </p>
      </div>
    </header>
    <main bind:this={content}>
      <slot />
    </main>
  </article>
  <nav>
    <div class="header">
      <div class="text">
        <h2>{i('page.post.on_this_page')}</h2>
      </div>
    </div>
    <ul class="content">
      <!-- TODO: make table of content active observer -->
      {#each headings as heading (heading.slug)}
        <li><a href={`#${heading.slug}`}>{heading.text}</a></li>
      {/each}
    </ul>
  </nav>
</div>

<svelte:head>
  <title>{title} | Blog - zydhan.com</title>
</svelte:head>

<style>
  @import '$lib/styles/syntax-highlighting/prisma-atom-dark.css';

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    object-position: bottom;
  }

  @media (min-width: 600px) {
    img {
      height: 240px;
    }
  }

  @media (min-width: 840px) {
    img {
      height: 360px;
    }
  }

  .container {
    --margin-top: 64px;
    margin-top: var(--margin-top);
    scroll-margin-top: calc(var(--margin-top) + 16px);
  }

  @media (min-width: 600px) {
    .container {
      --margin-top: 0;
      margin-left: 80px;
      padding: 16px;
      display: flex;
      justify-content: center;
    }

    .body {
      border-radius: 24px;
      overflow: hidden;
      max-width: 1024px;
    }
  }

  .body {
    background-color: rgb(var(--md-sys-color-surface-container-lowest));
    min-height: 100vh;

    padding-bottom: 80px;
  }

  @media (min-width: 600px) {
    .body {
      padding-bottom: 0;
    }
  }

  header {
    display: flex;
    flex-direction: column;
  }

  .header-text {
    padding: 16px 16px 10px 16px;
  }

  .header-text h2 {
    font-family: var(--md-sys-typescale-title-medium-font), sans-serif;
    font-size: var(--md-sys-typescale-title-medium-size);
    line-height: var(--md-sys-typescale-title-medium-line-height);
    font-weight: var(--md-sys-typescale-title-medium-weight);
    letter-spacing: var(--md-sys-typescale-title-medium-tracking);
    color: rgb(var(--md-sys-color-on-surface));
  }

  .header-text p {
    font-family: var(--md-sys-typescale-label-medium-font), sans-serif;
    font-size: var(--md-sys-typescale-label-medium-size);
    line-height: var(--md-sys-typescale-label-medium-line-height);
    font-weight: var(--md-sys-typescale-label-medium-weight);
    letter-spacing: var(--md-sys-typescale-label-medium-tracking);
    color: rgb(var(--md-sys-color-on-surface-variant));
  }

  nav {
    display: none;
    width: 360px;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
    flex-shrink: 0;
    position: sticky;
    top: 16px;
    height: fit-content;
    max-height: calc(100vh - 32px);
    overflow-y: auto;
  }

  @media (min-width: 840px) {
    nav {
      display: flex;
    }
  }

  nav .header {
    display: flex;
    padding: 16px;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    align-self: stretch;
  }

  nav .header .text {
    display: flex;
    padding: 0px 24px;
    gap: 10px;
    align-self: stretch;
  }

  nav .header h2 {
    font-family: var(--md-sys-typescale-title-medium-font), sans-serif;
    font-size: var(--md-sys-typescale-title-medium-size);
    line-height: var(--md-sys-typescale-title-medium-line-height);
    font-weight: var(--md-sys-typescale-title-medium-weight);
    letter-spacing: var(--md-sys-typescale-title-medium-tracking);
    color: rgb(var(--md-sys-color-on-surface-variant));
  }

  nav .content {
    padding: 0px 16px;
    width: 100%;
  }

  nav .content a {
    border-radius: 100px;
    display: flex;
    padding: 8px 24px;
    gap: 8px;
    align-self: stretch;
    text-align: left;
    color: rgb(var(--md-sys-color-on-surface-variant));

    font-family: var(--md-sys-typescale-label-large-font), sans-serif;
    font-size: var(--md-sys-typescale-label-large-size);
    line-height: var(--md-sys-typescale-label-large-line-height);
    font-weight: var(--md-sys-typescale-label-large-weight);
    letter-spacing: var(--md-sys-typescale-label-large-tracking);
  }

  nav .content a.active {
    border: 1px solid rgb(var(--md-sys-color-primary));
    background-color: rgba(
      var(--md-sys-color-primary),
      var(--md-sys-state-focus-state-layer-opacity)
    );
    color: rgb(var(--md-sys-color-primary));
  }

  main {
    padding: 16px;
    color: rgb(var(--md-sys-color-on-surface));
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: justify;
  }

  main :global(h2) {
    font-family: var(--md-sys-typescale-title-medium-font), sans-serif;
    font-size: var(--md-sys-typescale-title-medium-size);
    line-height: var(--md-sys-typescale-title-medium-line-height);
    font-weight: var(--md-sys-typescale-title-medium-weight);
    letter-spacing: var(--md-sys-typescale-title-medium-tracking);
  }

  main :global(h3),
  main :global(h4),
  main :global(h5),
  main :global(h6) {
    font-family: var(--md-sys-typescale-title-small-font), sans-serif;
    font-size: var(--md-sys-typescale-title-small-size);
    line-height: var(--md-sys-typescale-title-small-line-height);
    font-weight: var(--md-sys-typescale-title-small-weight);
    letter-spacing: var(--md-sys-typescale-title-small-tracking);
  }

  main :global(p) {
    font-family: var(--md-sys-typescale-body-medium-font), sans-serif;
    font-size: var(--md-sys-typescale-body-medium-size);
    line-height: var(--md-sys-typescale-body-medium-line-height);
    font-weight: var(--md-sys-typescale-body-medium-weight);
    letter-spacing: var(--md-sys-typescale-body-medium-tracking);
  }

  main :global(ul) {
    list-style-type: disc;
    padding-left: 24px;
  }

  main :global(pre) {
    max-width: 100%;
    overflow-x: auto;
  }
</style>
