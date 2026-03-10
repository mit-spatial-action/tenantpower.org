<script>
    let { children } = $props();
</script>
<section class="overlay">
    <div class="columns mt-6">
        <div class="column is-one-third">
            {@render children?.()}
        </div>
    </div>
</section>
<style>
    .overlay {
        position: absolute;
        width: 100%;
        pointer-events: none; 
    }
    .columns > * {
        pointer-events: auto; /* Re-enables clicking for the actual menu content */
        height: 100%;
    }
</style>