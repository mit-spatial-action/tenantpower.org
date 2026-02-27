<script>
    import Map from "$lib/components/Map.svelte";
    import Modal from "$lib/components/Modal.svelte";
</script>

<Modal title="Tenant Power">
    <div class="block">
        <article class="message is-primary">
            <div class="message-header">
                <p>🚨 Warning! 🚨</p>
            </div>
            <div class="message-body">
                The Tenant Power database has not been updated since 2021. We are continuing to make the tool available for archival purposes, but information gleaned from this platform should be treated with <strong>extreme</strong> caution.
            </div>
        </article>
    </div>
    <div class="block">
        Tenant Power used city assessor's data from 
        <a href="https://www.cityofboston.gov/assessing/search/">Boston</a>, 
        <a href="https://www.cambridgema.gov/PropertyDatabase">Cambridge</a>, 
        <a href="http://gis.vgsi.com/SomervilleMA/Search.aspx">Somerville</a>, 
        <a href="http://gis.vgsi.com/medfordma/">Medford</a>, and
        <a href="http://apps.brooklinema.gov/assessors/propertylookup.asp">Brookline</a>, Massachusetts
        to identify additional properties that are likely owned by your landlord. We're able to make pretty 
        good guesses! But this data can only tell us so much---we encourage you to check 
        <a href="http://www.masslandrecords.com/">Massachusetts Land Records</a>
        and/or the assessors databases linked above to confirm ownership.
    </div>
    <div class="block">
        Tenant Power was a collaboration between the
        <a href="https://mutualaidmamas.com/">Mutual Aid Medford and Somerville (MAMAS)</a> 
        Housing Justice Working Group and <a href="">Eric Robsky Huntley</a> of the <a href="">MIT Spatial Action & Analysis Research Group</a>.
    </div>
</Modal>
<Map/>