<script context='module'>
    export let videoPlayer;
    export let videoSource;
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<div id='video-player'>
    <video bind:this={videoPlayer} controls autoplay>
        <source bind:this={videoSource} src="" type="video/mp4" />
    </video>
</div>