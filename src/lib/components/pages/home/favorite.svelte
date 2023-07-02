<script lang="ts">
  import { i } from '@inlang/sdk-js';
  import docker from '$lib/assets/images/docker.png';
  import laravel from '$lib/assets/images/laravel.png';
  import nextjs from '$lib/assets/images/nextjs.png';
  import nextjsBlack from '$lib/assets/images/nextjs-black.png';
  import php from '$lib/assets/images/php.png';
  import typescript from '$lib/assets/images/typescript.png';

  const favourites = [
    { name: 'Laravel', icon: laravel },
    { name: 'Next.js', icon: { light: nextjsBlack, dark: nextjs } },
    { name: 'PHP', icon: php },
    { name: 'TypeScript', icon: typescript },
    { name: 'Docker', icon: docker },
  ];
</script>

<section>
  <h2>
    {i('page.home.fav_lang_section.title')}
  </h2>
  <ul>
    {#each favourites as { name, icon } (name)}
      <li>
        {#if typeof icon === 'string'}
          <img src={icon} alt={`${name} logo`} aria-hidden="true" />
        {:else}
          <img src={icon.light} class="light" alt={`${name} logo`} aria-hidden="true" />
          <img src={icon.dark} class="dark" alt={`${name} logo`} aria-hidden="true" />
        {/if}
        {name}
      </li>
    {/each}
  </ul>
</section>

<style lang="scss">
  @use '$lib/styles/typography.scss' as typography;
  @use '$lib/styles/tokens/window-class.scss' as window;
  @use '$lib/components/pages/home/style.scss' as styles;
  @use 'sass:map';

  section {
    @include styles.section;

    & > h2 {
      @include typography.typography-builder('headline', 'small');
    }

    & > ul {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 10px;
      width: 100%;
      flex-wrap: wrap;

      & > li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 16px;
        gap: 8px;
        width: 88px;
        height: fit-content;

        background-color: rgb(var(--md-sys-color-surface-container));
        border-radius: 8px;

        @media (min-width: map.get(window.$screens, 'expanded')) {
          padding: 32px;
          width: 140px;
          @include typography.typography-builder('body', 'large');
        }

        transition-property: scale;
        transition-duration: var(--md-sys-motion-duration-medium2);
        transition-timing-function: var(--md-sys-motion-easing-standard);
        &:hover {
          scale: 1.05;
        }

        & > img {
          width: 32px;
          height: 32px;
          position: relative;

          @media (min-width: map.get(window.$screens, 'expanded')) {
            width: 48px;
            height: 48px;
          }

          &.light {
            display: block;
            :global(.dark) & {
              display: none;
            }
          }

          &.dark {
            display: none;
            :global(.dark) & {
              display: block;
            }
          }
        }
      }
    }
  }
</style>
