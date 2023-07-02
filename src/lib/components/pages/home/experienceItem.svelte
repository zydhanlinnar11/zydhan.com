<script context="module">
  import newUniqueId from 'locally-unique-id-generator';
</script>

<script lang="ts">
  import { i } from '@inlang/sdk-js';

  export let website: string;
  export let company: string;
  export let startDate: string;
  export let endDate: string | null = null;
  const linkId = newUniqueId();
</script>

<a href={website} target="_blank" aria-labelledby={linkId}>
  <article>
    <h3>
      {i(`page.home.experiences_section.${company}.role`)} @<span id={linkId}>
        {i(`page.home.experiences_section.${company}.company`)}
      </span>
    </h3>
    <p class="description">
      {i(`page.home.experiences_section.${company}.description`)}
    </p>
    <p class="date">
      <time datetime={startDate}>
        {i(`page.home.experiences_section.${company}.start_date`)}
      </time>
      <span aria-label={i('page.home.experiences_section.until')}> - </span>
      <time datetime={endDate}>{i(`page.home.experiences_section.${company}.end_date`)}</time>
    </p>
  </article>
</a>

<style lang="scss">
  @use '$lib/styles/tokens/window-class.scss' as window;
  @use '$lib/components/pages/home/style.scss' as styles;
  @use 'sass:map';

  article {
    @include styles.list-section-item;
    display: grid;
    grid-template-columns: 1fr;

    @media (min-width: map.get(window.$screens, 'medium')) {
      grid-template-columns: auto auto;
      grid-template-rows: auto auto;
    }
  }

  h3 {
    @include styles.list-section-title;

    @media (min-width: map.get(window.$screens, 'medium')) {
      grid-row: 1 / 1;
    }
  }

  p.date {
    margin-top: 8px;
  }

  @media (min-width: map.get(window.$screens, 'medium')) {
    p.description {
      grid-row: 2 / -1;
    }

    p.date {
      grid-column: 2;
      grid-row: span 2;
      margin-top: 0;
    }
  }
</style>
