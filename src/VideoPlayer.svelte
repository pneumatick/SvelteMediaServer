<script context='module'>
    export let videoPlayer;
    export let videoSource;
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video bind:this={videoPlayer} controls autoplay>
    <source bind:this={videoSource} src="" type="video/mp4" />
</video>