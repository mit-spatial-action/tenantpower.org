<script>
    let { children } = $props();
</script>
<section class="overlay">
    <div class="columns">
        <div class="column is-one-third">
            <div class="box m-2">
                {@render children?.()}
            </div>
        </div>
    </div>
</section>
<style>
    .overlay {
        position: absolute;
        padding: 0;
        margin: 0;
        width: 100%;
    }
</style>