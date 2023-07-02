<style lang="scss">
    @import '$lib/components/navigation/container.scss';
</style>

<script>
    import Segment from "./segment.svelte";

    const destinations = [
    {
        nameLangKey: 'home',
        href: '/',
        icon: 'home',
        exact: true,
    },
    {
        nameLangKey: 'blog',
        href: '/blog',
        icon: 'article',
        exact: false,
    },
    {
        nameLangKey: 'guestbook',
        href: '/guestbook',
        icon: 'book',
        exact: false,
    },
    ]
</script>

<div>
    <nav>
        {#each destinations as destination (destination.href)}
            <Segment {...destination} />
        {/each}
    </nav>

    <div>

    </div>
</div>