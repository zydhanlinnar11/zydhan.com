<script lang="ts">
    import { i, language } from '@inlang/sdk-js'
    import { page } from '$app/stores';

    export let href: string;
    export let icon: string;
    export let nameLangKey: string;
    export let exact: boolean;

    $: localizedHref = href === '/' ? `/${language}` : `/${language}${href}`
    $: active = exact ? $page.url.pathname === localizedHref : $page.url.pathname.startsWith(localizedHref);
</script>

<style lang="scss">
    @use '$lib/styles/typography.scss' as typography;
    @import '$lib/components/navigation/segment.scss';

    a {
        @include typography.typography-builder('label', 'medium')
    }
</style>

<a href={`/${language}${href}`} data-active={localizedHref}>
    <div aria-hidden={true}>
        <div data-active={active}>
            <span data-active={active}>{icon}</span>
        </div>
    </div>
    {i(`navigation.${nameLangKey}`)}
</a>