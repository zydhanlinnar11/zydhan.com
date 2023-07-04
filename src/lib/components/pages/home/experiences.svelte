<script lang="ts">
  import { i } from '@inlang/sdk-js';
  import ExperienceItem from './experienceItem.svelte';

  const companies = [
    {
      key: 'dptsi_its',
      website: 'https://www.its.ac.id/dptsi',
      startDate: '2021-08',
      endDate: '2023-06',
    },
  ];
</script>

<section>
  <h2>
    {i('page.home.experiences_section.title')}
  </h2>
  <ul>
    {#each companies as { key, website, startDate, endDate } (key)}
      <li><ExperienceItem {website} company={key} {endDate} {startDate} /></li>
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
  }
</style>
