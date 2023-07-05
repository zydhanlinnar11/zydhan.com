<script lang="ts">
  import { language } from '@inlang/sdk-js';
  import type { Post } from '../../routes/[lang]/blog/+page.server';
  import { assets } from '$app/paths';

  export let post: Post;
  $: createdAt = new Date(post.createdAt);
</script>

<a href={`/${language}/blog/posts/${post.slug}`}>
  <article>
    <div class="state-layer" />
    <div class="content-container">
      <img src={`${assets}/posts/${post.image}`} alt={post.title} />
      <div class="text-content">
        <h2>{post.title}</h2>
        <time datetime={createdAt.toISOString()}>
          {createdAt.toLocaleString(language, {
            day: 'numeric',
            weekday: 'long',
            month: 'long',
            year: 'numeric',
          })}
        </time>
      </div>
    </div>
  </article>
</a>

<style lang="scss">
  @use '$lib/styles/typography.scss';

  $states: (
    'focus': 'focus',
    'hover': 'hover',
    'active': 'pressed',
  );

  article {
    border-radius: 12px;
    position: relative;
    background-color: rgb(var(--md-sys-color-surface-container));
    overflow: hidden;
    --image-height: 180px;

    & img {
      width: 100%;
      height: var(--image-height);
      object-fit: cover;
      object-position: bottom;
    }

    & .state-layer {
      height: calc(100% - var(--image-height));
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      transition-property: background-color;
      transition-duration: var(--md-sys-motion-duration-medium2);
      transition-timing-function: var(--md-sys-motion-easing-standard);
    }

    @each $state, $varName in $states {
      &:#{$state} .state-layer {
        background-color: rgba(
          var(--md-sys-color-on-surface),
          var(--md-sys-state- + $varName + -state-layer-opacity)
        );
      }
    }
  }

  .text-content {
    display: flex;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    align-self: stretch;
  }

  h2 {
    @include typography.typography-builder('body', 'large');
    color: rgb(var(--md-sys-color-on-surface));
  }

  time {
    color: rgb(var(--md-sys-color-on-surface-variant));
  }
</style>
